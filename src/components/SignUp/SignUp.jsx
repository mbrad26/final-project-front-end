import React, { Component } from 'react';
import './SignUp.css';

class SignUp extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  render () {
    return (
      <div className='form-container'>
        Sign Up
        <form>
          <input type='text' value={this.state.username} name='username' placeholder='Username' required/>
          <input type='email' value={this.state.email} name='email' placeholder='Email' required/>
          <input type='password' value={this.state.password} name='password' placeholder='Password' minLength='6' required/>
          <input type='password' value={this.state.password_confirmation} name='confirm-password' placeholder='Password Confirmation' minLength='6' required/>
          <button type='submit' className='signup'>Sign Up</button>
        </form>
      </div>
    )
  }
}

export default SignUp;
