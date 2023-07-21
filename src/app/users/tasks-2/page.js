'use client'
import { useEffect, useState } from 'react';
import TaskTable from './taskTable';

export default function FilterableTaskTable() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tasks`)
      .then((res) => res.json())
      .then((newData) => {
        setData(newData);
        setLoading(false);
      });

  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data shown...</p>;

  return (
    <main>
      <TaskTable tasks={data.tasks} />
    </main>
  );
}
