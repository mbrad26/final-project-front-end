import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './SignIn.css';
import axios from 'axios';

class SignIn extends Component {
  state = {
    username: '',
    password: '',
    redirect: null,
  }

  handleChange = (event) => {
    this.setState({
      // [event.target.name]: event.target.value,
      username: event.target.value,
      password: event.target.value,
    })
  }

  handleSubmit = (event) => {
    const url = 'https://postman-echo.com/post';
    axios.post(url, {
      user: {
        username: this.state.username,
        password: this.state.password,
      }
    }
  )
  // .then(response => {
  //   if (response.data.status === 'SUCCESS') {
  //     this.setState({ redirect: '/account' })
  //   }
  // })
  event.preventDefault();
  }

  render () {
    if(this.state.redirect) {
      <Redirect to={this.state.redirect} />
    } else {
      return (
        <div className='form-container'>
          Log In
          <form onSubmit={this.handleSubmit}>
            <input type='text' value={this.state.username} onChange={this.handleChange} name='username' placeholder='Username' required />
            <input type='password' value={this.state.password} onChange={this.handleChange} name='password' placeholder='Password' minLength='6' required />
            <button type="submit" className='signup'>Log In</button>
          </form>
        </div>
      );
    }
  }
}

export default SignIn;
