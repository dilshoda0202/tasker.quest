import React from 'react';

export default function TaskCard({ task }) {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">{task.description}</p>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Due Date: {task.dueDate}</li>
                    <li className="list-group-item">Priority: {task.priority}</li>
                    <li className="list-group-item">Category: {task.category}</li>
                    <li className="list-group-item">User: {task.user}</li>
                </ul>
            </div>
        </div>
    );
}
