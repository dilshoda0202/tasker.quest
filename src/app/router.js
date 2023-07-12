'use client'

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import TodoList from './tasks';
import SingleToDo from './tasks/SingleToDo';
import Navbar from './Navbar';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todolist" element={<TodoList />} />
        <Route path="/SingleToDo/:id" component={<SingleToDo />} />
        <Route path="/" element={<Navbar />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
