import React, { Component } from 'react';
import './LogIn.css';

class LogIn extends Component {
  state = {
    username: '',
    password: '',
  }

  handleChange = (event) => {
    this.setState({
      // [event.target.name]: event.target.value,
      username: event.target.value,
      password: event.target.value,
    })
  }

  handleSubmit = (event) => {
  }

  render () {
    return (
      <div className='form-container'>
        Log In
        <form onSubmit={this.handleSubmit}>
          <input type='text' value={this.state.username} onChange={this.handleChange} name='username' placeholder='Username' required />
          <input type='password' value={this.state.password} onChange={this.handleChange} name='password' placeholder='Password' minLength='6' required />
          <button type="submit" className='signup'>Log In</button>
        </form>
      </div>
    )
  }
}

export default SignUp;

