import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = (props) => {

  console.log('User userLogInStatus: ' + props.userLogInStatus);
  if(props.userLogInStatus) {
    return (
      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/' id='sign-out'>Sign Out</NavLink>
      </nav>
    );
  } else {
    return (
      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/signup' id='register-account'>Sign Up</NavLink>
      </nav>
    );
  }

  // return (
  //     <nav>
  //       <NavLink to='/'>Home</NavLink>
  //       <NavLink to='/signup' id='register-account'>Sign Up</NavLink>
  //     </nav>
  //   );
}

export default Navbar;
