import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
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
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const url = 'http://localhost:3001/sessions';
    await axios.post(url, {
      user: {
        username: this.state.username,
        password: this.state.password,
      }
    }, { withCredentials: true }
  )
  .then(response => {
    if (response.data.status === 200) {
      this.props.handleUserLogInStatus(true);
      this.props.history.push("/account");
    }
  })
  .catch(() => console.log('ERROR'))
  }

  render = () => {
    return (
      <div className='form-container'>
        Sign In
        <form className='signin-form' onSubmit={this.handleSubmit}>
          <input type='text' value={this.state.username} onChange={this.handleChange} name='username' placeholder='Username' required />
          <input type='password' value={this.state.password} onChange={this.handleChange} name='password' placeholder='Password' minLength='6' required />
          <button type="submit" id='signin'>Sign In</button>
        </form>
      </div>
    );
  }
}

export default SignIn;
