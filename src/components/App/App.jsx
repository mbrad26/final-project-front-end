import React from 'react';
import './App.css';
import TikTokViewer from '../TikTokViewer/TikTokViewer.jsx';
import Navbar from '../Navbar/Navbar.jsx';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <TikTokViewer />
    </div>
  );
}

export default App;
