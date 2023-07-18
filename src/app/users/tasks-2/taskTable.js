import Task from './Task';

export default function TaskTable({ tasks }) {
    const rows = [];

    tasks.forEach((task) => {
        // each user and push them inside the array with the User component (have not made)
        rows.push(
            <Task
                task={task}
                key={task._id} />
        )
    })

    return (
        <table>
            <thead>
                <tr>
                    <th>Task ID</th>
                    <th>Title</th>
                    <th>Description</th>

                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Priority</th>

                    <th>User</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    )
}