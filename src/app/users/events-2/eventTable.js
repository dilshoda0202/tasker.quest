import Event from './Event';

export default function EventTable({ events }) {
    const rows = [];

    events.forEach((event) => {
        // each user and push them inside the array with the User component (have not made)
        rows.push(
            <Event
                event={event}
                key={event._id} />
        )
    })

    return (
        <table>
            <thead>
                <tr>
                    <th>Event ID</th>
                    <th>Title</th>
                    <th>Description</th>

                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Priority</th>
                    <th>location</th>
                    <th>Category</th>

                    <th>User</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    )
}