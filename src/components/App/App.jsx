import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import TikTokViewer from '../TikTokViewer/TikTokViewer.jsx';
import Navbar from '../Navbar/Navbar.jsx';

function App() {
  return (
    <div className="app-container">
      <Router>
        <Navbar />
        <Route path='/' component={TikTokViewer} />
      </Router>
    </div>
  );
}

export default App;
