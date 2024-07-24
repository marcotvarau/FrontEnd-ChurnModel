import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ItemsList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api-churn.onrender.com/api/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="ItemsList">
      <h1>Items List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Shop ID</th>
            <th>Probabilidade de Cancelamento</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.shop_id}</td>
              <td>{item['Probabilidade de Cancelamento']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemsList;
