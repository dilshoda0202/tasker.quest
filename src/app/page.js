import React from 'react';

const Page = () => {
  return (
    <div className="container" style={{ background: "linear-gradient(to bottom, #98FB98, #FFC0CB)", height: '100vh', width: '100%', margin: 'fill' }}>
      <div className='landing-section'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <img
          src="/logo.png" // Replace this with the path to your logo image
          alt="Logo"
          style={{
            width: '300px', // Adjust the width as needed
            height: '300px', // Adjust the height as needed
          }}
        />

        <p>Welcome to Tasker Quest</p>

        <div style={{ marginTop: '20px' }}>
          <button style={{ marginRight: '10px', backgroundColor: 'white' }}><a href="/users/tasks-2/new">Create Task</a></button>
          <button style={{ marginRight: '10px', backgroundColor: 'white' }}><a href="/users/events-2/new">Create Event</a></button>
        </div>
      </div>
    </div>
  );
};

export default Page;