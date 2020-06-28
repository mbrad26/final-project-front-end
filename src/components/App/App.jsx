import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import TikTokViewer from '../TikTokViewer/TikTokViewer.jsx';
import Navbar from '../Navbar/Navbar.jsx';
import SignUp from '../SignUp/SignUp.jsx';
import SignIn from '../SignIn/SignIn.jsx';

class App extends Component {

  state = {
    userLogInStatus: false,
    user: {},
  }

  render = () => {
    return (
      <div className="app-container">
        <Router>
          <Navbar />
          <Switch>
            <Route path='/' exact component={SignIn} />
            <Route path='/signup' exact component={SignUp} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
