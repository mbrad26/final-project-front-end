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
        </form>
      </div>
    )
  }
}

export default SignUp;
