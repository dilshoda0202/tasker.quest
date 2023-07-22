'use client'
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/navigation';
import handleLogout from '@/app/utils/handleLogout';

export default function Profile() {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    if (typeof window !== 'undefined') {
        const expirationTime = new Date(parseInt(localStorage.getItem('expiration')) * 1000);
        let currentTime = Date.now();

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

    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No data shown...</p>;

    return (
        <div className="container" style={{ background: "linear-gradient(to bottom, gold, silver)", height: '100vh' }}>
            <div className="main-body">
                <nav aria-label="breadcrumb" className="main-breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item"><a href="/users/profile">Profile</a></li>
                        <li className="breadcrumb-item"><a href="/users/edit">Edit Profile</a></li>
                        <li className="breadcrumb-item"><a href="/users/events-2">Event List</a></li>
                        <li className="breadcrumb-item"><a href="/users/events-2/new">Create Event</a></li>
                        <li className="breadcrumb-item" onClick={handleLogout}><a href="">Logout</a></li>
                    </ol>
                </nav>

                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                                    <div className="mt-3">
                                        {/* <h4>{data.firstName} {data.lastName}</h4> */}
                                        <p className="text-secondary mb-1">{data.jobTitle}</p>
                                        {/* <p className="text-muted font-size-sm">{data.address.city}, {data.address.state}</p> */}
                                        <button className="btn btn-primary">Follow</button>
                                        <button className="btn btn-outline-primary">Message</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        {/* <h6 className="mb-0">Full Name</h6> */}
                                    </div>
                                    {/* <div className="col-sm-9 text-secondary">
                    {data.firstName} {data.lastName} */}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Email</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {data.email}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-12">
                                    <a className="btn btn-info " target="__blank" href="/users/edit">Edit</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // </div>
    );
}
