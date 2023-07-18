'use client';
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import handleLogout from '@/app/utils/handleLogout';

const NewEvent = () => {
    const [user, setUser] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [status, setStatus] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');


    const [currentUser, setCurrentUser] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const expirationTime = new Date(parseInt(localStorage.getItem('expiration')) * 1000);
        const currentTime = Date.now();
        if (currentTime >= expirationTime) {
            handleLogout();
            alert('Session has ended. Please login to continue.');
            router.push('/users/login');
        }
        if (localStorage.getItem('jwtToken')) {
            fetch(`${ process.env.NEXT_PUBLIC_SERVER_URL }/users/email/${ localStorage.getItem('email') }`)
                .then((res) => res.json())
                .then((data) => {
                    // data is an array of users
                    const userData = jwtDecode(localStorage.getItem('jwtToken'));
                    if (userData.email === localStorage.getItem('email')) {
                        setCurrentUser(data.user[0]);
                        setUser(data.user[0]._id); // Set the user ID to first index 0
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

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleUser = (e) => {
        setUser(e.target.value);
    };

    const handleDescription = (e) => {
        setDescription(e.target.value);
    };

    const handleStartDate = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDate = (e) => {
        setEndDate(e.target.value);
    };

    const handleStatus = (e) => {
        setStatus(e.target.value);
    };

    const handlePriority = (e) => {
        setPriority(e.target.value);
    };
    const handleCategory = (e) => {
        setCategory(e.target.value);
    };

    const handleLocation = (e) => {
        setLocation(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTask = {
            user,
            description,
            startDate,
            endDate,
            status,
            priority,
            title,
            category,
            location
        };

        axios.post(`${ process.env.NEXT_PUBLIC_SERVER_URL }/events`, newTask)
            .then(response => {
                console.log('===> Yay, new event');
                console.log(response);
                setRedirect(true);
            })
            .catch(error => console.log('===> Error in Task', error));
    };

    const [redirect, setRedirect] = useState(false);

    if (redirect) {
        router.push('/users/events-2');
    }

    return (
        <div className="row mt-4">
            <div className="col-md-7 offset-md-3">
                <div className="card card-body">
                    <h2 className="py-2">Set New Event</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="user">User</label>
                            <input type="text" name="user" value={currentUser ? currentUser._id : ''} onChange={handleUser} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input type="text" name="description" value={description} onChange={handleDescription} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="startDate">Start Date</label>
                            <input type="startDate" name="startDate" value={startDate} onChange={handleStartDate} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="endDate">End Date</label>
                            <input type="text" name="endDate" value={endDate} onChange={handleEndDate} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <input type="text" name="status" value={status} onChange={handleStatus} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" value={title} onChange={handleTitle} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Category</label>
                            <input type="text" name="category" value={category} onChange={handleCategory} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Location</label>
                            <input type="text" name="location" value={location} onChange={handleLocation} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="priority">Priority</label>
                            <input type="text" name="priority" value={priority} onChange={handlePriority} className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewEvent;
