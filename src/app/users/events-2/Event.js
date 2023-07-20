import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Event({ event }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user information based on event.user ObjectId
        axios.get(`/users/${event.user}`)
            .then(response => {
                setUser(response.data.user);
            })
            .catch(error => {
                console.log('Error fetching user:', error);
            });
    }, [event.user]);

    return (
        <tr>
            <td>{event._id}</td>
            <td>{event.title}</td>
            <td>{event.description}</td>
            <td>{event.startDate}</td>
            <td>{event.endDate}</td>
            <td>{event.priority}</td>
            <td>{event.location}</td>
            <td>{event.category}</td>
            <td>{user ? `${user.firstName} ${user.lastName}` : 'Loading...'}</td>
        </tr>
    );
}
