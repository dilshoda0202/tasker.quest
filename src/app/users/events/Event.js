import React from 'react';

const Event = ({ event }) => {
    return (
        <div>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>Start Date: {event.startDate}</p>
            <p>End Date: {event.endDate}</p>
            <p>Priority: {event.priority}</p>
            <p>Location: {event.location}</p>
            <p>User ID: {event.user}</p>
            {/* Render other event details based on your model */}
        </div>
    );
};

export default Event;
