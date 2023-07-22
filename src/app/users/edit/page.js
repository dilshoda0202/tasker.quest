"use client";
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import handleLogout from '@/app/utils/handleLogout';


export default function EditUser() {
	const router = useRouter();
	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(true);
	const [redirect, setRedirect] = useState(false);

	// TODO - Add state for email, number, streetAddress, city
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [jobTitle, setJobTitle] = useState('');
	const [number, setNumber] = useState('');
	const [streetAddress, setStreetAddress] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [zipCode, setZipCode] = useState('');

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

	// create the 
	const handleFirstName = (e) => {
		// fill in code
		setFirstName(e.target.value);
	};

	const handleLastName = (e) => {
		// fill in code
		setLastName(e.target.value);
	};

	const handleEmail = (e) => {
		// fill in code
		setEmail(e.target.value);
	};

	const handleJobTitle = (e) => {
		// fill in code
		setJobTitle(e.target.value);
	};

	const handleNumber = (e) => {
		// fill in code
		setNumber(e.target.value);
	};

	const handleStreetAddress = (e) => {
		// fill in code
		setStreetAddress(e.target.value);
	};

	const handleCity = (e) => {
		// fill in code
		setCity(e.target.value);
	};

	const handleState = (e) => {
		// fill in code
		setState(e.target.value);
	};

	const handleZipCode = (e) => {
		// fill in code
		setZipCode(e.target.value);
	};

	const handleSubmit = (e) => {
		// fill in code
		e.preventDefault();
		// if the email is different, update that in localStorage
		// use axios to put to the route
		// create an object that stores that updated changes
		const updateUserObject = {
			firstName,
			lastName,
			email,
			number,
			jobTitle,
			streetAddress,
			city,
			state,
			zipCode
		};
		axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${data._id}`, updateUserObject)
			.then(response => {
				// update email in localStorage
				localStorage.setItem('email', email);
				setRedirect(true);
			})
			.catch(error => {
				console.log(error);
				router.push('/users/profile');
			});

	};

	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (localStorage.getItem('jwtToken')) {
				fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/email/${localStorage.getItem('email')}`)
					.then((res) => res.json())
					.then((data) => {
						// data is an object
						let userData = jwtDecode(localStorage.getItem('jwtToken'));

						if (data.user[0].email === userData.email) {
							setData(data.user[0]);
							setFirstName(data.user[0].firstName);
							setLastName(data.user[0].lastName);
							setEmail(data.user[0].email);
							setJobTitle(data.user[0].jobTitle);
							setNumber(data.user[0].number);
							setStreetAddress(data.user[0].address.streetAddress);
							setCity(data.user[0].address.city);
							setState(data.user[0].address.state);
							setZipCode(data.user[0].address.zipCode);
							setLoading(false);
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
	if (redirect) { router.push('/users/profile'); }


	return (
		<div className="container">
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
				<div className="row">
					<div className="col-lg-4">
						<div className="card">
							<div className="card-body">
								<div className="d-flex flex-column align-items-center text-center">
									<img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Admin" className="rounded-circle p-1 bg-primary" width="110" />
									<div className="mt-3">
										{/* TODO - Update with state name, job title, city, state */}
										<h4>{data.firstName} {data.lastName}</h4>
										<p className="text-secondary mb-1">{data.jobTitle}</p>
										<p className="text-muted font-size-sm">{data.address.city}, {data.address.state}</p>
										<button className="btn btn-primary">Follow</button>
										<button className="btn btn-outline-primary">Message</button>
									</div>
								</div>

							</div>
						</div>
					</div>
					<div className="col-lg-8">
						<div className="card">
							{/* TODO - Update value for all user values */}
							<form className="card-body" onSubmit={handleSubmit}>
								<div className="row mb-3">
									<div className="col-sm-3">
										<h6 className="mb-0">First Name</h6>
									</div>
									<div className="col-sm-9 text-secondary">
										<input type="text" className="form-control" value={firstName} onChange={handleFirstName} />
									</div>
								</div>
								<div className="row mb-3">
									<div className="col-sm-3">
										<h6 className="mb-0">Last Name</h6>
									</div>
									<div className="col-sm-9 text-secondary">
										<input type="text" className="form-control" value={lastName} onChange={handleLastName} />
									</div>
								</div>
								<div className="row mb-3">
									<div className="col-sm-3">
										<h6 className="mb-0">Email</h6>
									</div>
									<div className="col-sm-9 text-secondary">
										<input type="text" className="form-control" value={email} onChange={handleEmail} required />
									</div>
								</div>
								<div className="row mb-3">
									<div className="col-sm-3">
										<h6 className="mb-0">Job Title</h6>
									</div>
									<div className="col-sm-9 text-secondary">
										<input type="text" className="form-control" value={jobTitle} onChange={handleJobTitle} />
									</div>
								</div>
								<div className="row mb-3">
									<div className="col-sm-3">
										<h6 className="mb-0">Phone</h6>
									</div>
									<div className="col-sm-9 text-secondary">
										<input type="text" className="form-control" value={number} onChange={handleNumber} />
									</div>
								</div>
								<div className="row mb-3">
									<div className="col-sm-3">
										<h6 className="mb-0">Mobile</h6>
									</div>
									<div className="col-sm-9 text-secondary">
										<input type="text" className="form-control" value={number} onChange={handleNumber} />
									</div>
								</div>
								<div className="row mb-3">
									<div className="col-sm-3">
										<h6 className="mb-0">Street Address</h6>
									</div>
									<div className="col-sm-9 text-secondary">
										<input type="text" className="form-control" value={streetAddress} onChange={handleStreetAddress} />
									</div>
								</div>
								<div className="row mb-3">
									<div className="col-sm-3">
										<h6 className="mb-0">City</h6>
									</div>
									<div className="col-sm-9 text-secondary">
										<input type="text" className="form-control" value={city} onChange={handleCity} />
									</div>
								</div>
								<div className="row mb-3">
									<div className="col-sm-3">
										<h6 className="mb-0">State</h6>
									</div>
									<div className="col-sm-9 text-secondary">
										<input type="text" className="form-control" value={state} onChange={handleState} />
									</div>
								</div>
								<div className="row mb-3">
									<div className="col-sm-3">
										<h6 className="mb-0">ZipCode</h6>
									</div>
									<div className="col-sm-9 text-secondary">
										<input type="text" className="form-control" value={zipCode} onChange={handleZipCode} />
									</div>
								</div>
								<div className="row">
									<div className="col-sm-3"></div>
									<div className="col-sm-9 text-secondary">
										<button className="btn btn-primary px-4" type='Submit'>Save Changes</button>
									</div>
								</div>
							</form>
						</div>

					</div>
				</div>
			</div>
		</div>
	);
}