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
          <input type='text' name='username' placeholder='Username' required/>
          <input type='email' name='email' placeholder='Email' required/>
          <input type='password' name='password' placeholder='Password' minlength='6' required/>
          <input type='password' name='confirm-password' placeholder='Password Confirmation' minlength='6' required/>
          <button type='submit' className='signup'>Sign Up</button>
        </form>
      </div>
    )
  }
}

export default SignUp;
