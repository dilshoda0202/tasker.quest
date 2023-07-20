'use client'
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const router = useRouter();

  const [redirect, setRedirect] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      email,
      password,
    };
    axios.post(`${ process.env.NEXT_PUBLIC_SERVER_URL }/users/signup`, newUser)
      .then(response => {
        setRedirect(true);
      })
      .catch(error => {
        if (error.response.data.message === 'Email already exists') {
          console.log('===> Error in Signup', error.response.data.message);
          setError(true);
        }
      });
  };

  if (redirect) { router.push('/users/login'); }
  if (error) {
    return (
      <div>
        <div className="card text-white bg-primary py-5 d-md-down-none" style={{ width: "44%" }}>
          <div className="card-body text-center">
            <div>
              <p>Email already exists</p>
              <br />
              <h2>Login</h2>
              <p>Sign In to your account</p>
              <a href="/users/login" type="button" className="btn btn-primary active mt-3">Login</a>
              <span>  </span>
              <a href="/users/signup" type="button" className="btn btn-secondary active mt-3">Signup</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ background: "linear-gradient(to bottom, #98FB98, #FFC0CB)" }}>
      <br />
      <br />
      <br />
      <br />
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card-group mb-0">
            <div className="card p-4" style={{ backgroundColor: "lightgreen" }}>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <img
                    src="/logo.png"
                    alt=""
                    style={{ width: '220px', height: '220px' }}
                  />
                  <h1>Sign Up</h1>
                  <p className="text-muted">Create an account below to get started</p>
                  <div className="input-group mb-3">
                    <span className="input-group-addon"><i className="fa fa-mail-forward" aria-hidden="true"></i></span>
                    <input type="email" className="form-control" placeholder="Email" value={email} onChange={handleEmail} required />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={handlePassword} required />
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <button type="submit" className="btn btn-primary px-4">Sign Up</button>
                    </div>
                    <div className="col-6 text-right">
                      <button type="button" className="btn btn-link px-0">Forgot password?</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="card text-white bg-primary py-5 d-md-down-none" style={{ width: "44%" }}>
              <div className="card-body text-center">
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div>
                  <h2>Login</h2>
                  <p>Sign In to your account</p>
                  <a href="/users/login" type="button" className="btn btn-primary active mt-3">Login</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
