import React from 'react';
import './Page.css';

const Page = () => {
  return (
    <div className="container">
      <div className='landing-section'>
        <img
          src="/logo.png"
          alt="Logo"
          className="logo-image"
        />

        <h1 className="landing-title">Welcome to Tasker Quest</h1>

        <div className="buttons-container">
          <button><a href="/users/tasks-2/new">Create Task</a></button>
          <button><a href="/users/events-2/new">Create Event</a></button>
        </div>
      </div>
    </div>
  );
};

export default Page;
