'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export default function TaskTable({ tasks }) {
  const user = jwt_decode(localStorage.getItem('jwtToken'));

  // Filter tasks for the current user
  const userTasks = tasks.filter((task) => task.user === user.id);

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
    const completedTask = userTasks.find((task) => task._id === taskId);
    if (completedTask) {
      axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/tasks/${taskId}`, { title: 'Completed Task' })
        .then((response) => {
          setTasks((prevTasks) => {
            return prevTasks.map((task) => {
              if (task._id === taskId) {
                return { ...task, title: 'Completed Task' };
              } else {
                return task;
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
    axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/tasks/${taskId}`)
      .then((response) => {
        setTasks(userTasks.filter((task) => task._id !== taskId));
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  useEffect(() => {
    // Start the timer for each card with an end date
    userTasks.forEach((task) => {
      if (!timers[task._id] && task.endDate) {
        const interval = setInterval(() => {
          const remaining = calculateTimeRemaining(task.endDate);
          if (remaining <= 0) {
            clearInterval(interval);
            setTimers((prevTimers) => ({ ...prevTimers, [task._id]: null }));
          } else {
            setTimers((prevTimers) => ({ ...prevTimers, [task._id]: remaining }));
          }
        }, 1000);
        setTimers((prevTimers) => ({ ...prevTimers, [task._id]: interval }));
      }
    });

    return () => {
      // Clear all intervals when the component is unmounted
      Object.values(timers).forEach((interval) => clearInterval(interval));
    };
  }, [timers, userTasks]);

  // State variables to store tasks and completed tasks
//   const [tasks, setTasks] = useState(userTasks);
  const [completedTasks, setCompletedTasks] = useState([]);

  return (
    <div style={{ background: 'linear-gradient(to bottom right, #FFB6C1, #ADD8E6)', display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px', height: '100vh' }}>
      <div className="custom-card-container"> {/* Add a container class */}
        <nav aria-label="breadcrumb" className="main-breadcrumb">
          <ol className="breadcrumb" style={{ display: "flex" }}>
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item"><a href="/users/profile">Profile</a></li>
            <li className="breadcrumb-item"><a href="/users/edit">Edit Profile</a></li>
            <li className="breadcrumb-item"><a href="/users/tasks-2">Task List</a></li>
            <li className="breadcrumb-item"><a href="/users/tasks-2/new">Create Task</a></li>
          </ol>
        </nav>
        {tasks.map((event) => (
          <div
            key={event._id}
            className="custom-card" // Apply the custom-card class
            style={{
              height: '300px',
              width: '300px',
              backgroundColor: '#90EE90', // Light green background color for the card
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              textDecoration: event.completed ? 'line-through' : 'none', // Apply strikethrough style if the task is completed
            }}
          >
            <h2 className="custom-heading">{event.title}</h2> {/* Apply the custom-heading class */}
            <p>{event.description}</p>
            <p>Start Date: {formatDate(event.startDate)}</p>
            <p>End Date: {formatDate(event.endDate)}</p>
            <p>Priority: {event.priority}</p>
            <p>Location: {event.location}</p>
            <p>Category: {event.category}</p>
            {timers[event._id] !== null && timers[event._id] > 0 && (
              <p>Time Remaining: {formatTime(timers[event._id])}</p>
            )}
            <button onClick={() => markCompleted(event._id)}>Completed</button>
            <button onClick={() => deleteTask(event._id)}>Delete</button>
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
    </div>
  );
}
