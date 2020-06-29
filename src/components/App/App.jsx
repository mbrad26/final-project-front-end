import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import TikTokViewer from '../TikTokViewer/TikTokViewer.jsx';
import Navbar from '../Navbar/Navbar.jsx';
import SignUp from '../SignUp/SignUp.jsx';
import SignIn from '../SignIn/SignIn.jsx';
import Error from '../Error/Error.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLogInStatus: false,
      user: {},
    }
  }

  render = () => {
    return (
      <div className="app-container">
        <Router>
          <Navbar userLogInStatus={this.state.userLogInStatus} user={this.state.user}/>
          <Switch>
            <Route exact path='/' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route component={Error} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
