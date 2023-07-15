'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

function NewTodoPage() {
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
      <h1>Create New Todo</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={handleNewTaskChange}
          placeholder="Enter a task"
        />
      </div>
      <div>
        <strong>Priority:</strong>
        <select>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>
      </div>
      <div>
        <strong>Description:</strong>
        <input
            type="description"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="Enter a task description"
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
      <button onClick={handleCreateTodo}>Create Todo</button>
    </div>
  );
}

export default NewTodoPage;
