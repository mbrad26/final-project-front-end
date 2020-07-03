import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./SignUp.css";
import axios from "axios";

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const url = "http://chronomy.herokuapp.com/registrations";
    await axios
      .post(
        url,
        {
          user: {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status == 200) {
          this.props.handleUserLogInStatus(true);
          this.props.history.push("/account");
        } else {
          alert("There was a problem signing up.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render = () => {
    return (
      <div className="form-container">
        <p>Sign Up</p>
        <form onSubmit={this.handleSubmit}>
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
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
            name="email"
            placeholder="Email"
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
          <input
            type="password"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            name="password_confirmation"
            placeholder="Password Confirmation"
            minLength="6"
            required
          />
          <br></br>
          <br></br>
          <button type="submit" id="signup" className="patsbutton">
            Sign Up
          </button>
        </form>
      </div>
    );
  };
}

export default SignUp;
