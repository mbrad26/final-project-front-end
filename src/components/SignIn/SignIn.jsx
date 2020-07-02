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
        <p>Sign In</p>
        <form className="signin-form" onSubmit={this.handleSubmit}>
          <br></br>
          <input
            type="text"
            value={this.state.username}
            onChange={this.handleChange}
            name="username"
            placeholder="Username"
            required
          />
          <br></br>
          <br></br>
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            name="password"
            placeholder="Password"
            minLength="6"
            required
          />
          <br></br>
          <br></br>
          <button type="submit" id="signin" className="patsbutton">
            Sign In
          </button>
        </form>
      </div>
    );
  };
}

export default SignIn;
