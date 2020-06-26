import React, { Component } from 'react';
import './SignUp.css';

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
