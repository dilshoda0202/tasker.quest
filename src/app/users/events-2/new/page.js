'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import handleLogout from '@/app/utils/handleLogout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'src/app/NewEvent.css';
import WeatherWidget from 'src/app/WeatherWidget.js';

const NewEvent = () => {
    const [user, setUser] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [priority, setPriority] = useState('Medium');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('Personal');
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
            fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/email/${localStorage.getItem('email')}`)
                .then((res) => res.json())
                .then((data) => {
                    const userData = jwtDecode(localStorage.getItem('jwtToken'));
                    if (userData.email === localStorage.getItem('email')) {
                        setCurrentUser(data.user[0]);
                        setUser(data.user[0]._id);
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

    const handleDescription = (e) => {
        setDescription(e.target.value);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handlePriority = (e) => {
        setPriority(e.target.value);
    };

    const handleLocation = (e) => {
        setLocation(e.target.value);
    };

    const handleCategory = (e) => {
        setCategory(e.target.value);
    };

    const handleCustomCategory = (e) => {
        setCategory(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newEvent = {
            user,
            title,
            description,
            startDate,
            endDate,
            priority,
            location,
            category,
        };

        axios
            .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/events`, newEvent)
            .then((response) => {
                console.log('===> Yay, new event');
                console.log(response);
                router.push('/users/events-2');
            })
            .catch((error) => console.log('===> Error in Task', error));
    };

    const categoryOptions = ['Personal', 'School', 'Work', 'Other'];

    return (
        <div className="row mt-4">
            <div className="col-md-6">

                {/* Form Section */}
                <div className="card card-body custom-card">
                    <nav aria-label="breadcrumb" className="main-breadcrumb">
                        <ol className="breadcrumb" style={{ display: "flex" }}>
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item"><a href="/users/profile">Profile</a></li>
                            <li className="breadcrumb-item"><a href="/users/edit">Edit Profile</a></li>
                            <li className="breadcrumb-item"><a href="/users/events-2">Event List</a></li>
                            <li className="breadcrumb-item"><a href="/users/events-2/new">Create Event</a></li>
                        </ol>
                    </nav>
                    <h2 className="py-2 text-center custom-heading">
                        New Event
                    </h2>
                    {currentUser && (
                        <div className="user-name">
                            <h1 className="text-center user-name-text flash">
                                {currentUser.firstName}
                            </h1>
                        </div>
                    )}
                    <div className="col-md-6">
                        <div className="weather-widget-container">
                            <WeatherWidget />
                        </div>
                    </div>
                    <div>

                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input required
                                type="text"
                                name="title"
                                value={title}
                                onChange={handleTitle}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input required
                                type="text"
                                name="description"
                                value={description}
                                onChange={handleDescription}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="startDate">Start Date</label>
                            <DatePicker required
                                selected={startDate}
                                onChange={handleStartDateChange}
                                dateFormat="yyyy-MM-dd"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="endDate">End Date</label>
                            <DatePicker required
                                selected={endDate}
                                onChange={handleEndDateChange}
                                dateFormat="yyyy-MM-dd"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="priority">Priority</label>
                            <select required
                                name="priority"
                                value={priority}
                                onChange={handlePriority}
                                className="form-control"
                            >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Location</label>
                            <input required
                                type="text"
                                name="location"
                                value={location}
                                onChange={handleLocation}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <select required
                                name="category"
                                value={category}
                                onChange={handleCategory}
                                className="form-control"
                            >
                                {categoryOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            {category === "Other" && (
                                <input
                                    type="text"
                                    name="otherCategory"
                                    placeholder="Enter your custom category"
                                    className="form-control mt-2"
                                    value={category}
                                    onChange={handleCustomCategory}
                                />
                            )}
                        </div>
                        <button type="submit" className="btn btn-primary float-right custom-button">
                            Submit
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default NewEvent;
