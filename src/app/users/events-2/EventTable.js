import React, { useState, useEffect } from 'react';
import Event from './Event';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import 'src/app/NewEvent.css'; // Import custom CSS for styling


export default function EventTable({ events }) {
  const user = jwt_decode(localStorage.getItem('jwtToken'));

  // Filter events for the current user
  const userEvents = events.filter((event) => event.user === user.id);

  // Function to format date as "YYYY-MM-DD"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const calculateTimeRemaining = (end) => {
    const endTime = new Date(end).getTime();
    const now = Date.now();

    if (now > endTime) {
      return 0; // Timer has ended
    } else {
      return endTime - now; // Remaining time is the difference between end time and current time
    }
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  };

  // State variable to store the timers for each card
  const [timers, setTimers] = useState({});

  // Function to mark a task as completed
  const markCompleted = (taskId) => {
    const completedTask = userEvents.find((event) => event._id === taskId);
    if (completedTask) {
      axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/events/${taskId}`, { title: 'Completed Task' })
        .then((response) => {
          setTasks((prevTasks) => {
            return prevTasks.map((event) => {
              if (event._id === taskId) {
                return { ...event, title: 'Completed Task' };
              } else {
                return event;
              }
            });
          });
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    }
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/events/${taskId}`)
      .then((response) => {
        setTasks(userEvents.filter((event) => event._id !== taskId));
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  useEffect(() => {
    // Start the timer for each card with an end date
    userEvents.forEach((event) => {
      if (!timers[event._id] && event.endDate) {
        const interval = setInterval(() => {
          const remaining = calculateTimeRemaining(event.endDate);
          if (remaining <= 0) {
            clearInterval(interval);
            setTimers((prevTimers) => ({ ...prevTimers, [event._id]: null }));
          } else {
            setTimers((prevTimers) => ({ ...prevTimers, [event._id]: remaining }));
          }
        }, 1000);
        setTimers((prevTimers) => ({ ...prevTimers, [event._id]: interval }));
      }
    });

    return () => {
      // Clear all intervals when the component is unmounted
      Object.values(timers).forEach((interval) => clearInterval(interval));
    };
  }, [timers, userEvents]);

  // State variables to store tasks and completed tasks
  const [tasks, setTasks] = useState(userEvents);
  const [completedTasks, setCompletedTasks] = useState([]);

  return (

    <div style={{ background: 'linear-gradient(to bottom right, #FFB6C1, #ADD8E6)', display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px', height: '100vh' }}>
    <div className="custom-card-container"> {/* Add a container class */}
      <nav aria-label="breadcrumb" className="main-breadcrumb">
        <ol className="breadcrumb" style={{ display: "flex" }}>
          <li className="breadcrumb-item"><a href="/">Home</a></li>
          <li className="breadcrumb-item"><a href="/users/profile">Profile</a></li>
          <li className="breadcrumb-item"><a href="/users/edit">Edit Profile</a></li>
          <li className="breadcrumb-item"><a href="/users/events-2">Event List</a></li>
          <li className="breadcrumb-item"><a href="/users/events-2/new">Create Event</a></li>
        </ol>
      </nav>
      {tasks.map((task) => (
        <div
          key={task._id}
          className="custom-card" // Apply the custom-card class
          style={{
            height: '300px',
            width: '300px',
            backgroundColor: '#90EE90', // Light green background color for the card
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            textDecoration: task.completed ? 'line-through' : 'none', // Apply strikethrough style if the task is completed
          }}
        >
          <h2 className="custom-heading">{task.title}</h2> {/* Apply the custom-heading class */}
          <p>{task.description}</p>
          <p>Start Date: {formatDate(task.startDate)}</p>
          <p>End Date: {formatDate(task.endDate)}</p>
          <p>Priority: {task.priority}</p>
          <p>Location: {task.location}</p>
          <p>Category: {task.category}</p>
          {timers[task._id] !== null && timers[task._id] > 0 && (
            <p>Time Remaining: {formatTime(timers[task._id])}</p>
          )}
          <button onClick={() => markCompleted(task._id)}>Completed</button>
          <button onClick={() => deleteTask(task._id)}>Delete</button>
        </div>
      ))}
      {completedTasks.map((completedTask) => (
        <div
          key={completedTask._id}
          className="custom-card" // Apply the custom-card class
          style={{
            textDecoration: 'line-through', // Apply strikethrough style for completed tasks
          }}
        >
          <h2 className="custom-heading">{completedTask.title}</h2> {/* Apply the custom-heading class */}
          <p>{completedTask.description}</p>
          <p>Start Date: {formatDate(completedTask.startDate)}</p>
          <p>End Date: {formatDate(completedTask.endDate)}</p>
          <p>Priority: {completedTask.priority}</p>
          <p>Location: {completedTask.location}</p>
          <p>Category: {completedTask.category}</p>
          <p>User: {completedTask.user}</p>
        </div>
      ))}
    </div>
  );
}