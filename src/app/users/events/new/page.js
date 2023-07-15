'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

function NewEventPage() {
  const [newTask, setNewTask] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');

  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleStartDateTimeChange = (e) => {
    setStartDateTime(e.target.value);
  };

  const handleEndDateTimeChange = (e) => {
    setEndDateTime(e.target.value);
  };

  const handleCreateTodo = () => {
    if (newTask.trim() === '' || !startDateTime || !endDateTime) {
      return;
    }

    const newTaskItem = {
      text: newTask,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
    };

    axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/tasks`, newTaskItem)
      .then((response) => {
        console.log('New todo created:', response.data);
        setNewTask('');
        setStartDateTime('');
        setEndDateTime('');
      })
      .catch((error) => {
        console.error('Error creating new todo:', error);
      });
  };

  return (
    <div>
      <h1>Create New Event</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={handleNewTaskChange}
          placeholder="Enter an event"
        />
      </div>
      <div>
        <strong>Priority:</strong>
        <select type="priority" value={newTaskPriority} onChange={(e) => setNewTaskPriority(e.target.value)}>
          <option value="low">I might not go</option>
          <option value="medium">Dont want to forget</option>
          <option value="high">WOOT WOOT</option>
        </select>
      </div>
      <div>
        <strong>Description:</strong>
        <input
            type="description"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="Enter event description"
        />
      </div>
      <div>
        <strong>Start Date:</strong>
        <input
          type="datetime-local"
          value={startDateTime}
          onChange={handleStartDateTimeChange}
          placeholder="Select start date/time"
        />
      </div>
      <div>
        <strong>End Date:</strong>
        <input
          type="datetime-local"
          value={endDateTime}
          onChange={handleEndDateTimeChange}
          placeholder="Select end date/time"
        />
      </div>
      <button onClick={handleCreateTodo}>Create Event</button>
    </div>
  );
}

export default NewEventPage;
