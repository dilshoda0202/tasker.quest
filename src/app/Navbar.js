import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users/signup">Signup</Link>
        </li>
        <li>
          <Link to="/users/login">Login</Link>
        </li>
        <li>
          <Link to="/users/profile">Profile</Link>
        </li>
        <li>
          <Link to="/tasks">Tasks</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
