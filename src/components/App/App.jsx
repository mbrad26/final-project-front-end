import "bootstrap/dist/css/bootstrap.css";
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

  handleUserLogInStatus = (bool) => {
    this.setState({
      userLogInStatus: bool,
    });
  };

  render = () => {
    return (
      <div className="app-container">
        <Router>
          <Switch>
            <Route
              path="/view/:uuid"
              render={(props) => <TikTokViewer {...props} />}
            />
            <Route>
              <Navbar
                userLogInStatus={this.state.userLogInStatus}
                user={this.state.user}
                handleUserLogInStatus={this.handleUserLogInStatus}
              />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <SignIn
                      {...props}
                      handleUserLogInStatus={this.handleUserLogInStatus}
                    />
                  )}
                />
                <Route
                  path="/signup"
                  render={(props) => (
                    <SignUp
                      {...props}
                      handleUserLogInStatus={this.handleUserLogInStatus}
                    />
                  )}
                />
                <Route
                  path="/account"
                  render={(props) => <Account {...props} />}
                />
                <Route
                  path="/editPlaylist/:uuid"
                  exact
                  render={(props) => <EditPlaylist {...props} />}
                />
                <Route component={Error} />
              </Switch>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  };
}

export default App;
