"use client";
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/navigation';
import handleLogout from '@/app/utils/handleLogout';

export default function Profile() {
  // state is what the data is representing in realtime
  const router = useRouter();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const expirationTime = new Date(parseInt(localStorage.getItem('expiration')) * 1000);
  let currentTime = Date.now();

  // make a condition that compares exp and current time
  if (currentTime >= expirationTime) {
    handleLogout();
    alert('Session has ended. Please login to continue.');
    router.push('/users/login');
  }

  useEffect(() => {
    if (localStorage.getItem('jwtToken')) {
      fetch(`${ process.env.NEXT_PUBLIC_SERVER_URL }/users/email/${ localStorage.getItem('email') }`)
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


  }, []);

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

        <div>
          <h1>Hello {data.firstName} </h1>
        </div>

        <div>
          <h1>My tasks/todo</h1>
          <ul>
            <li></li>
          </ul>
          <button>Create New Task</button>
        </div>

        <div>
          <h1>Upcoming Due dates</h1>
          <ul>
            <li></li>
          </ul>
        </div>

        <div>
          <h1>Upcoming events</h1>
          <ul>
            <li></li>
          </ul>
        </div>

        <div>
          <h1>Timer</h1>
          <button>Start Timer</button>
        </div>

      </div>
    </div>
  );
}