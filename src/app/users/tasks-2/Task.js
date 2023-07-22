import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Task({ task }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user information based on task.user ObjectId
        axios.get(`/users/${task.user}`)
            .then(response => {
                setUser(response.data.user);
            })
            .catch(error => {
                console.log('Error fetching user:', error);
            });
    }, [task.user]);

    return (
        <tr>
            <td>{task._id}</td>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.startDate}</td>
            <td>{task.endDate}</td>
            <td>{task.priority}</td>
            <td>{task.location}</td>
            <td>{task.category}</td>
            <td>{user ? `${user.firstName} ${user.lastName}` : 'Loading...'}</td>
        </tr>
    );
}
