'use client'

import React from 'react';
import { useParams } from 'react-router-dom';
import { useRouter } from 'next/navigation';


function SingleToDo() {
  const { id } = useParams();
  const router = useRouter();

  const handleBackClick = () => {
    router.push('/tasks')
  };

  return (
    <div>
      <h1>Single ToDo Page</h1>
      {todo ? (
        <div>
          <h2>{todo.text}</h2>
          <p>{todo.description}</p>
          <p>Priority: {todo.priority}</p>
          <button onClick={handleBackClick}>Back</button>
        </div>
      ) : (
        <p>ToDo not found.</p>
      )}
    </div>
  );
}

export default SingleToDo;
