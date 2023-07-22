// EventTable.js
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import 'src/app/EventDisplay.css';
import WeatherWidget from 'src/app/WeatherWidget.js';
import handleLogout from '@/app/utils/handleLogout';



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

  // State variable to store tasks
  const [tasks, setTasks] = useState(userEvents);

  const markCompleted = (taskId) => {
    axios
      .put(`${process.env.NEXT_PUBLIC_SERVER_URL}/events/${taskId}`, {
        title: 'Event Completed',
        completed: true, // Add completed property
      })
      .then((response) => {
        // Update the tasks state to reflect the changes
        setTasks((prevTasks) =>
          prevTasks.map((event) =>
            event._id === taskId ? { ...event, title: 'Event Completed', completed: true } : event
          )
        );
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  const handleEdit = (taskId, updatedTask) => {
    axios
      .put(`${process.env.NEXT_PUBLIC_SERVER_URL}/events/${taskId}`, updatedTask)
      .then((response) => {
        // Update the tasks state to reflect the changes
        setTasks((prevTasks) =>
          prevTasks.map((event) => (event._id === taskId ? { ...event, ...updatedTask } : event))
        );
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/events/${taskId}`)
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

  // State variable to store the task being edited
  const [editedTask, setEditedTask] = useState(null);

  // Handle form input change for the edited task
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedTask((prevEditedTask) => ({
      ...prevEditedTask,
      [name]: value,
    }));
  };

  // Handle form submission for updating the task
  const handleFormSubmit = (event, taskId) => {
    event.preventDefault();
    handleEdit(taskId, editedTask);
    setEditedTask(null); // Clear the edited task state after updating
  };

  // Separate upcoming and past events based on the title
  const upcomingEvents = tasks.filter((task) => task.title !== 'Event Completed');
  const pastEvents = tasks.filter((task) => task.title === 'Event Completed');

  return (
    <div className="event-table-container">
      <div className="page-title-container">
        <h1 className="events-title">EVENTS</h1>
      </div>
      <div className="breadcrumb-container">
        <nav aria-label="breadcrumb" className="main-breadcrumb">
          <ol className="breadcrumb" style={{ display: 'flex' }}>
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="/users/profile">Profile</a>
            </li>
            <li className="breadcrumb-item">
              <a href="/users/edit">Edit Profile</a>
            </li>
            <li className="breadcrumb-item">
              <a href="/users/events-2">Event List</a>
            </li>
            <li className="breadcrumb-item">
              <a href="/users/events-2/new">Create Event</a>
            </li>
            <li className="breadcrumb-item">
              <a href="/users/tasks-2/new">Create Task</a>
            </li>  <li className="breadcrumb-item">
              <a href="/users/tasks-2/new">Create Task</a>
            </li>  <li className="breadcrumb-item">
              <li className="breadcrumb-item" onClick={handleLogout}><a href="">Logout</a></li>
            </li>
          </ol>
        </nav>
      </div>

      <div className="separator-line"></div> {/* separation line */}
      <h2 className="section-title">Upcoming Events</h2> {/*section title */}

      {/* Upcoming tasks */}
      <div className="col-md-6">
        <div className="weather-widget-container">
          <WeatherWidget />
        </div>
      </div>
      <div className="card-container">
        {upcomingEvents.map((task) => (
          <div
            key={task._id}
            className="card"
            style={{
              textDecoration: task.completed ? 'line-through' : 'none',
            }}
          >
            {editedTask && editedTask._id === task._id ? (
              <form onSubmit={(e) => handleFormSubmit(e, task._id)}>
                <input
                  type="text"
                  name="title"
                  value={editedTask.title}
                  onChange={handleInputChange}
                  required
                />
                <textarea
                  name="description"
                  value={editedTask.description}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="startDate"
                  value={editedTask.startDate}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="endDate"
                  value={editedTask.endDate}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="priority"
                  value={editedTask.priority}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="location"
                  value={editedTask.location}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="category"
                  value={editedTask.category}
                  onChange={handleInputChange}
                  required
                />
                <button type="submit">Update</button>
                <button type="button" onClick={() => setEditedTask(null)}>
                  Cancel
                </button>
              </form>

            ) : (
              <>

                <h2 className="card-title">{task.title}</h2>
                <p>{task.description}</p>
                <p>Start Date: {formatDate(task.startDate)}</p>
                <p>End Date: {formatDate(task.endDate)}</p>
                <p>Priority: {task.priority}</p>
                <p>Location: {task.location}</p>
                <p>Category: {task.category}</p>
                {timers[task._id] !== null && timers[task._id] > 0 && (
                  <p>Time Remaining: {formatTime(timers[task._id])}</p>
                )}
                {!task.completed && (
                  <>
                    <button onClick={() => markCompleted(task._id)}>Completed</button>
                    <button onClick={() => deleteTask(task._id)}>Delete</button>
                    <button onClick={() => setEditedTask(task)}>Edit</button>
                  </>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      <div className="separator-line"></div> {/* separation line */}
      <h2 className="section-title">Past Events</h2> {/* section title */}

      {/* Past tasks */}
      <div className="card-container">
        {pastEvents.map((completedTask) => (
          <div
            key={completedTask._id}
            className="card"
            style={{
              textDecoration: 'line-through',
            }}
          >
            <h2 className="card-title">{completedTask.title}</h2>
            <p>{completedTask.description}</p>
            <p>Start Date: {formatDate(completedTask.startDate)}</p>
            <p>End Date: {formatDate(completedTask.endDate)}</p>
            <p>Priority: {completedTask.priority}</p>
            <p>Location: {completedTask.location}</p>
            <p>Category: {completedTask.category}</p>
            <p>User: {completedTask.user}</p>
            {/* delete button for completed tasks */}
            <button onClick={() => deleteTask(completedTask._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
