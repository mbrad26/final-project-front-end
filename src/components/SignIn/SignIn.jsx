import React, { Component } from "react";
import { Redirect, BrowserRouter as Router } from "react-router-dom";
import "./SignIn.css";
import axios from "axios";

class SignIn extends Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const url = "http://chronomy.herokuapp.com/sessions";
    await axios
      .post(
        url,
        {
          user: {
            username: this.state.username,
            password: this.state.password,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        this.props.handleUserLogInStatus(true);
        this.props.history.push("/account");
      })
      .catch((error) => console.log(error));
  };

  render = () => {
    return (
      <div className="form-container">
        Sign In
        <form className="signin-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.username}
            onChange={this.handleChange}
            name="username"
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            name="password"
            placeholder="Password"
            minLength="6"
            required
          />
          <button type="submit" id="signin">
            Sign In
          </button>
        </form>
      </div>
    );
  };
}

export default SignIn;
