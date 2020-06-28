import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = (props) => {

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
  //       <Link to='/'>Home</Link>
  //       <Link to='/signup' id='register-account'>Sign Up</Link>
  //     </nav>
  //   );
}

export default Navbar;
