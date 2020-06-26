import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import TikTokViewer from '../TikTokViewer/TikTokViewer.jsx';
import Navbar from '../Navbar/Navbar.jsx';
import SignUp from '../SignUp/SignUp.jsx';
import Account from "../Account/Account.jsx";


function App() {
  return (
    <div className="app-container">
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={TikTokViewer} />
          <Route path='/signup' exact component={SignUp} />
          <Route path="/account" exact component={Account} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
