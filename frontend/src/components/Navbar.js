import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/auth.context'

export const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push('/');
  }

  return (
    <nav>
      <div class="nav-wrapper blue darken-1">
        <sapan class="brand-logo"><NavLink to="/home">Home</NavLink></sapan>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><NavLink to="/create"> Create</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Logout</a></li>
        </ul>
      </div>
    </nav>
  );
}