import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import TikTokViewer from "../TikTokViewer/TikTokViewer.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import SignUp from "../SignUp/SignUp.jsx";
import SignIn from "../SignIn/SignIn.jsx";
import Error from "../Error/Error.jsx";
import Account from "../Account/Account.jsx";
import EditPlaylist from "../EditPlaylist/EditPlaylist.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLogInStatus: false,
      user: {},
    };
  }

  render = () => {
    return (
      <div className="app-container">
        <Router>
          <Navbar
            userLogInStatus={this.state.userLogInStatus}
            user={this.state.user}
          />
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/account" exact component={Account} />
            <Route path="/tiktok/:uuid" exact component={TikTokViewer} />
            <Route path="/editPlaylist/:uuid" exact component={EditPlaylist} />
            <Route component={Error} />
          </Switch>
        </Router>
      </div>
    );
  };
}

export default App;
