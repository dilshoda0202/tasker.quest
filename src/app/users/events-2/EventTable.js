import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import 'src/app/EventDisplay.css'; // Import the CSS file

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

  const markCompleted = (eventId) => {
    axios
      .put(`/events/${eventId}`, { status: 'completed' })
      .then(response => {
        console.log('Event updated:', response.data.event);
        // Update the events state by removing the completed event
        setEventList(prevEvents =>
          prevEvents.filter(event => event._id !== eventId)
        );
      })
      .catch(error => {
        console.log('Error updating event:', error);
      });
  };




  // State variable to store the timers for each card
  const [timers, setTimers] = useState({});

  // State variable to store events and completed events
  const [eventList, setEventList] = useState(userEvents);

  // Filter completed events
  const completedEvents = eventList.filter(event => event.status === 'completed');

  // Filter active events
  const activeEvents = eventList.filter(event => event.status !== 'completed');

  useEffect(() => {
    // Start the timer for each card with an end date
    events.forEach((event) => {
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
  }, [events, timers]);


  return (
    <div style={{ background: 'linear-gradient(to bottom right, #FFB6C1, #ADD8E6)', padding: '20px' }}>
      <h1>Active Events</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
        {activeEvents.map((event) => (
          <div key={event._id} className="card card-body custom-card">
            <h2 className="card-title">{event.title}</h2>
            <div className="card-attribute">
              <div className="attribute-card">
                <strong>Description:</strong> {event.description}
              </div>
            </div>
            <div className="card-attribute">
              <div className="attribute-card">
                <strong>Start Date:</strong> {formatDate(event.startDate)}
              </div>
            </div>
            <div className="card-attribute">
              <div className="attribute-card">
                <strong>End Date:</strong> {formatDate(event.endDate)}
              </div>
            </div>
            <div className="card-attribute">
              <div className="attribute-card">
                <strong>Priority:</strong> {event.priority}
              </div>
            </div>
            <div className="card-attribute">
              <div className="attribute-card">
                <strong>Location:</strong> {event.location}
              </div>
            </div>
            <div className="card-attribute">
              <div className="attribute-card">
                <strong>Category:</strong> {event.category}
              </div>
            </div>
            {timers[event._id] !== null && timers[event._id] > 0 && (
              <div className="card-attribute">
                <div className="attribute-card">
                  <strong>Time Remaining:</strong> {formatTime(timers[event._id])}
                </div>
              </div>
            )}
            <button onClick={() => markCompleted(event._id)}>Completed</button>
          </div>
        ))}
      </div>

      <h1>Completed Events</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
        {completedEvents.map((completedEvent) => (
          <div key={completedEvent._id} className="card card-body custom-card">
            <h2 className="card-title">{completedEvent.title}</h2>
            <div className="card-attribute">
              <div className="attribute-card">
                <strong>Description:</strong> {completedEvent.description}
              </div>
            </div>
            <div className="card-attribute">
              <div className="attribute-card">
                <strong>Start Date:</strong> {formatDate(completedEvent.startDate)}
              </div>
            </div>
            <div className="card-attribute">
              <div className="attribute-card">
                <strong>End Date:</strong> {formatDate(completedEvent.endDate)}
              </div>
            </div>
            <div className="card-attribute">
              <div className="attribute-card">
                <strong>Priority:</strong> {completedEvent.priority}
              </div>
            </div>
            <div className="card-attribute">
              <div className="attribute-card">
                <strong>Location:</strong> {completedEvent.location}
              </div>
            </div>
            <div className="card-attribute">
              <div className="attribute-card">
                <strong>Category:</strong> {completedEvent.category}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
