import Task from './Task';

export default function TaskTable({ tasks }) {
  const rows = tasks.map((task) => (
    <Task key={task._id} task={task} />
  ));

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
  );
}