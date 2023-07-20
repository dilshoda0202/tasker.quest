"use client";
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/navigation';
import handleLogout from '@/app/utils/handleLogout';

export default function Dashboard() {
  // state is what the data is representing in realtime
  const router = useRouter();
  const [data, setData] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [todoTasks, setTodoTasks] = useState(null);

  const [isLoading, setLoading] = useState(true);

  if (typeof window !== 'undefined') {
    const expirationTime = new Date(parseInt(localStorage.getItem('expiration')) * 1000);
    let currentTime = Date.now();

    // make a condition that compares exp and current time
    if (currentTime >= expirationTime) {
      handleLogout();
      alert('Session has ended. Please login to continue.');
      router.push('/users/login');
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('jwtToken')) {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/email/${localStorage.getItem('email')}`)
          .then((res) => res.json())
          .then((data) => {
            // data is an object
            let userData = jwtDecode(localStorage.getItem('jwtToken'));
            if (userData.email === localStorage.getItem('email')) {
              setData(data.user[0]);
              setLoading(false);
            } else {
              router.push('/users/login');
            }

          })
          .catch((error) => {
            console.log(error);
            router.push('/users/login');
          });
      } else {
        router.push('/users/login');
      }

    }
  }, []);

  useEffect(() => {
    console.log(data)
    fetch('http://localhost:8000/tasks/')
      .then((res) => res.json())
      .then((tasks) => {
        console.log('Can you see data?', tasks)
        // data is an object
        setTasks(tasks);
        setTodoTasks(tasks);

        setLoading(false);
      })
  }, []);



  console.log('tasks', todoTasks)

  //   return (
  //     <main>
  //       <TaskTable tasks={data.tasks} />
  //     </main>
  //   )
  // }

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data shown...</p>;
  return (
    <div className="container">
      <div className="main-body">

        <nav aria-label="breadcrumb" className="main-breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item"><a href="/users/profile">Profile</a></li>
            <li className="breadcrumb-item"><a href="/users/edit">Edit Profile</a></li>
            <li className="breadcrumb-item"><a href="/users/tasks">Task List</a></li>
            <li className="breadcrumb-item" onClick={handleLogout}><a href="">Logout</a></li>
          </ol>
        </nav>

        <div className="col-md-8">
          <div className="card mb-3">
            <div className="card-body">

              <div className="col-sm-9 text-secondary">

                <br />
                {tasks ? <p>Tasks Todo: {tasks.tasks.filter(task => task.status === 'Todo').length}</p> : null}
                {tasks ? <p>Tasks In Progress: {tasks.tasks.filter(task => task.status === 'In Progress').length}</p> : null}

                {tasks ? <p>Tasks Completed: {tasks.tasks.filter(task => task.status === 'Completed').length}</p> : null}


              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-12">
                <a className="btn btn-info " target="__blank" href="/users/tasks/new">Create A Task</a>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <a className="btn btn-info " target="__blank" href="/users/events/new">Create A Event</a>
              </div>
            </div>
          </div>
        </div>


        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h1>My Tasks</h1>
                <ul>
                  {todoTasks ? <li>Tasks Todo: {todoTasks.tasks.map(todoTasks => todoTasks.status === 'Todo')}</li> : null}

                </ul>
              </div>
            </div>
          </div>


          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <h1>Task Deadline</h1>
                  <div className="mt-3">


                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <h1>Upcoming Events</h1>

                  <div className="mt-3">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <h1>Weather Component</h1>

              </div>
              <hr />
            </div>
          </div>

          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <h1>Timer</h1>

              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}