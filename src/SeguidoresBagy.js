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
            <th>Link da Bio</th>
            <th>Bio</th>
            <th>Seguindo</th>
            <th>Seguidores</th>
            <th>Stories Públicos</th>
            <th>Conta Comercial</th>
            <th>Privado</th>
            <th>Verificado</th>
            <th>Contagem de Mídias</th>
            <th>Data de Registro</th>
            <th>Seguidor Novo</th>
          </tr>
        </thead>
        <tbody>
          {followers.map((follower) => (
            <tr key={follower.username}>
              <td>{follower.username}</td>
              <td><a href={follower.user_url} target="_blank" rel="noopener noreferrer">{follower.user_url}</a></td>
              <td><a href={follower.bio_link} target="_blank" rel="noopener noreferrer">{follower.bio_link}</a></td>
              <td>{follower.bio}</td>
              <td>{follower.followees}</td>
              <td>{follower.followers}</td>
              <td>{follower.has_public_story ? 'Sim' : 'Não'}</td>
              <td>{follower.is_business_account ? 'Sim' : 'Não'}</td>
              <td>{follower.is_private ? 'Sim' : 'Não'}</td>
              <td>{follower.is_verified ? 'Sim' : 'Não'}</td>
              <td>{follower.media_count}</td>
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
