import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ItemsList from './ItemsList';
import SeguidoresBagy from './SeguidoresBagy';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Items List</Link></li>
            <li><Link to="/seguidores_bagy">Seguidores Bagy</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<ItemsList />} />
          <Route path="/seguidores_bagy" element={<SeguidoresBagy />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
