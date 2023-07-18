
export default function Event({ event }) {

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

            <td>{event.user}</td>


        </tr>
    )
}