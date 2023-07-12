'use client'

// Home Page

import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

// ReactDOM.render(<AppRouter />, document.getElementById('root'));


function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/todo-list">Todo List</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
