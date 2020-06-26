import React, { Component } from 'react';
import './SignUp.css';
import axios from 'axios';

class SignUp extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  handleChange = (event) => {
    this.setState({
      // [event.target.name]: event.target.value,
      username: event.target.value,
      email: event.target.value,
      password: event.target.value,
      password_confirmation: event.target.value,
    })
  }

  handleSubmit = (event) => {
    const url = 'https://localhost:3001';
    axios.post(url, {
      user: {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation
      }
    }, { withCredentials: true}
  );
  event.preventDefault();

  }

  render () {
    return (
      <div className='form-container'>
        Sign Up
        <form onSubmit={this.handleSubmit}>
          <input type='text' value={this.state.username} onChange={this.handleChange} name='username' placeholder='Username' required />
          <input type='email' value={this.state.email} onChange={this.handleChange} name='email' placeholder='Email' required />
          <input type='password' value={this.state.password} onChange={this.handleChange} name='password' placeholder='Password' minLength='6' required />
          <input type='password' value={this.state.password_confirmation} onChange={this.handleChange} name='password_confirmation' placeholder='Password Confirmation' minLength='6' required />
          <button type="submit" className='signup'>Sign Up</button>
        </form>
      </div>
    )
  }
}

export default SignUp;
