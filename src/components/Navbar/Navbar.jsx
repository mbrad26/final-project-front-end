import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

class Navbar extends Component {
  state = {};

  render() {
    console.log(this.props.userLogInStatus);
    if (this.props.userLogInStatus) {
      return (
        <nav>
          <NavLink to="/account">Home</NavLink>
          <NavLink
            to="/"
            id="sign-out"
            onClick={() => {
              this.props.handleUserLogInStatus(false);
            }}
          >
            Sign Out
          </NavLink>
        </nav>
      );
    } else {
      return (
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/signup" id="register-account">
            Sign Up
          </NavLink>
        </nav>
      );
    }
  }
}

export default Navbar;
