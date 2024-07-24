import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useTable, useFilters, useSortBy, usePagination } from 'react-table';
import { CSVLink } from 'react-csv';

const SeguidoresBagy = () => {
  const [followers, setFollowers] = useState([]);
  const [columnsToShow, setColumnsToShow] = useState({
    username: true,
    user_url: true,
    bio_link: true,
    bio: true,
    followees: true,
    followers: true,
    has_public_story: true,
    is_business_account: true,
    is_private: true,
    is_verified: true,
    media_count: true,
    register_date: true,
    is_new_user: true,
  });

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get('https://api-churn.onrender.com/api/seguidores');
        setFollowers(response.data);
      } catch (error) {
        console.error('Error fetching followers:', error);
      }
    };

    fetchFollowers();
  }, []);

  const columns = useMemo(() => [
    {
      Header: 'Username',
      accessor: 'username',
    },
    {
      Header: 'URL',
      accessor: 'user_url',
      Cell: ({ cell: { value } }) => <a href={value} target="_blank" rel="noopener noreferrer">{value}</a>,
    },
    {
      Header: 'Link da Bio',
      accessor: 'bio_link',
      Cell: ({ cell: { value } }) => <a href={value} target="_blank" rel="noopener noreferrer">{value}</a>,
      width: 150,
    },
    {
      Header: 'Bio',
      accessor: 'bio',
    },
    {
      Header: 'Seguindo',
      accessor: 'followees',
    },
    {
      Header: 'Seguidores',
      accessor: 'followers',
    },
    {
      Header: 'Stories Públicos',
      accessor: 'has_public_story',
      Cell: ({ cell: { value } }) => (value ? 'Sim' : 'Não'),
    },
    {
      Header: 'Conta Comercial',
      accessor: 'is_business_account',
      Cell: ({ cell: { value } }) => (value ? 'Sim' : 'Não'),
    },
    {
      Header: 'Privado',
      accessor: 'is_private',
      Cell: ({ cell: { value } }) => (value ? 'Sim' : 'Não'),
    },
    {
      Header: 'Verificado',
      accessor: 'is_verified',
      Cell: ({ cell: { value } }) => (value ? 'Sim' : 'Não'),
    },
    {
      Header: 'Contagem de Mídias',
      accessor: 'media_count',
    },
    {
      Header: 'Data de Registro',
      accessor: 'register_date',
    },
    {
      Header: 'Seguidor Novo',
      accessor: 'is_new_user',
      Cell: ({ cell: { value } }) => (value ? 'Sim' : 'Não'),
    },
  ], []);

  const visibleColumns = useMemo(
    () => columns.filter(column => columnsToShow[column.accessor]),
    [columnsToShow, columns]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: visibleColumns,
      data: followers,
      initialState: { pageIndex: 0, pageSize: 50 },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <div className="SeguidoresBagy">
      <h1>Lista de Seguidores</h1>
      <div>
        {columns.map(column => (
          <label key={column.accessor}>
            <input
              type="checkbox"
              checked={columnsToShow[column.accessor]}
              onChange={() =>
                setColumnsToShow(prev => ({
                  ...prev,
                  [column.accessor]: !prev[column.accessor],
                }))
              }
            />
            {column.Header}
          </label>
        ))}
      </div>
      <CSVLink data={followers} filename="seguidores.csv">
        Exportar CSV
      </CSVLink>
      <table {...getTableProps()} style={{ marginLeft: '0' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
        <span>
          Página{' '}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Ir para a página:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Mostrar {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SeguidoresBagy;
