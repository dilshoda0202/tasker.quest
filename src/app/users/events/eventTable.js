import React from 'react';
import Event from './Event';

const EventTable = ({ events }) => {
    const rows = events.map((event) => (
        <Event key={event._id} event={event} />
    ));

    const headerCellStyle = {
        fontWeight: 'bold',
        color: 'white',
    };

    return (
        <table>
            <thead>
                <tr>
                    <th style={headerCellStyle}>Title</th>
                    <th style={headerCellStyle}>Description</th>
                    <th style={headerCellStyle}>Start Date</th>
                    <th style={headerCellStyle}>End Date</th>
                    <th style={headerCellStyle}>Priority</th>
                    <th style={headerCellStyle}>Location</th>
                    <th style={headerCellStyle}>User ID</th>
                    {/* Add more table headers for additional event details */}
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
};

export default EventTable;
