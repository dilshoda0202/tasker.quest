import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Task({ tasks }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user information based on event.user ObjectId
        axios.get(`/users/${ tasks.user }`)
            .then(response => {
                setUser(response.data.user);
            })
            .catch(error => {
                console.log('Error fetching user:', error);
            });
    }, [tasks.user]);

    return (
        <tr>
            <td>{tasks._id}</td>
            <td>{tasks.title}</td>
            <td>{tasks.description}</td>
            <td>{tasks.startDate}</td>
            <td>{tasks.endDate}</td>
            <td>{tasks.priority}</td>
            <td>{tasks.location}</td>
            <td>{tasks.category}</td>
            <td>{user ? `${ user.firstName } ${ user.lastName }` : 'Loading...'}</td>
        </tr>
    );
}
