import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = (props) => {

  if(props.userLogInStatus) {
    return (
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/'>Sign Out</Link>
      </nav>
    );
  } else {
    return (
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/signup' id='register-account'>Sign Up</Link>
      </nav>
    );
  }
}

export default Navbar;
