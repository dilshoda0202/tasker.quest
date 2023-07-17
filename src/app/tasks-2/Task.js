
export default function Task({ task }) {

    return (
        <tr>
            <td>{task._id}</td>
            <td>{task.title}</td>
            <td>{task.description}</td>

            <td>{task.startDate}</td>
            <td>{task.endDate}</td>
            <td>{task.priority}</td>
            <td>{task.priority}</td>

            <td>{task.user}</td>


        </tr>
    )
}