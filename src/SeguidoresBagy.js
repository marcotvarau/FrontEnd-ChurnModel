import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SeguidoresBagy = () => {
  const [followers, setFollowers] = useState([]);

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

  return (
    <div className="SeguidoresBagy">
      <h1>Lista de Seguidores</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>URL</th>
            <th>Data de Registro</th>
            <th>Usuário Novo</th>
          </tr>
        </thead>
        <tbody>
          {followers.map((follower) => (
            <tr key={follower.username}>
              <td>{follower.username}</td>
              <td><a href={follower.user_url} target="_blank" rel="noopener noreferrer">{follower.user_url}</a></td>
              <td>{follower.register_date}</td>
              <td>{follower.is_new_user ? 'Sim' : 'Não'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SeguidoresBagy;
