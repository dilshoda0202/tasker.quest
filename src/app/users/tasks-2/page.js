'use client';
import { useEffect, useState } from 'react';
import TaskTable from './TaskTable';

export default function FilterableTaskTable() {
  // state is what the data is representing in realtime
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${ process.env.NEXT_PUBLIC_SERVER_URL }/tasks`)
      .then((res) => res.json())
      .then((newData) => {
        // console.log('Can you see newData?', newData)
        setData(newData);
        // console.log(data)
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