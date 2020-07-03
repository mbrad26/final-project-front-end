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
          <NavLink to="/account" className="patsbutton nav-button">
            Home
          </NavLink>
          <NavLink
            to="/"
            id="sign-out"
            className="patsbutton nav-button"
            onClick={() => {
              this.props.handleUserLogInStatus(false);
            }}
          >
            Sign Out
          </NavLink>
          <p className="chronomy">
            <strong>Chronomy</strong>
          </p>
        </nav>
      );
    } else {
      return (
        <div>
          <nav className="nav">
            <NavLink to="/" className="patsbutton nav-button">
              Home
            </NavLink>
            <NavLink
              to="/signup"
              id="register-account"
              className="patsbutton nav-button"
            >
              Sign Up
            </NavLink>
            <p className="chronomy">
              <strong>Chronomy</strong>
            </p>
          </nav>
          <hr></hr>
        </div>
      );
    }
  }
}

export default Navbar;
