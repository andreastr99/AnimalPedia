import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import axiosRequests from '../api/apiCalls';

import koala from '../assets/icons/koala.png';
import login_koala from '../assets/icons/koala_login.png';
import { BiSearch, BiLogOut, BiUser } from 'react-icons/bi';

import { useAuth } from '../auth/AuthContext';

const Header = () => {

    const navigate = useNavigate();
    const { isLoggedIn, login, logout, username } = useAuth();
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [credentials])

    const handleInputChange = (e) => {
        setCredentials(prevData => ({ ...prevData, [e.target.name]: [e.target.value] }))
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formattedValues = {
            email: `${credentials.username}`,
            password: `${credentials.password}`
        };

        try {
            await axiosRequests.login(formattedValues)
                .then(res => {
                    if (res.data.accessToken) {
                        localStorage.setItem("accessToken", res?.data?.accessToken);
                        login();
                        navigate('/')
                    }

                });
        } catch (error) {
            if (!error?.response) {
                setErrMsg('No Server Response')
            } else if (error.response?.status === 400) {
                setErrMsg('Missing Username or Password')
            } else if (error.response?.status === 401) {
                setErrMsg('Wrong email or password')
            } else {
                setErrMsg('Login Failed')
                console.error('An unexpected error occurred.', error.message);
            }
            errRef.current.focus();
        }
    };


    const handleLogout = async () => {
        logout();
        navigate('/')
    };

    return (
        <header className="p-3" style={{ background: "#C1E1C1" }}>
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

                    <Link to='/' className="d-flex align-items-center mb-2 mb-lg-0 text-decoration-none">
                        <h1 style={{ fontFamily: "Papyrus", color: "green" }}>AnimalPedia</h1>
                        <img src={koala} alt='koala' />
                    </Link>

                    <ul className="nav nav-pills col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><Link to="/" className="nav-link px-2 text-black">Home</Link></li>
                        <li><Link to="/favorites" className="nav-link px-2 text-black">Favorites</Link></li>
                        <li><Link to="/map" className="nav-link px-2 text-black">Map</Link></li>
                        <li><Link to="/about" className="nav-link px-2 text-black">About</Link></li>
                    </ul>

                    <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                        <div className="input-group">
                            <input type="search" className="form-control form-control-dark text-bg-light" placeholder="Search an animal..." aria-label="Search" />
                            <button className="input-group-text" id="search-icon" aria-label="Search">
                                <BiSearch />
                            </button>
                        </div>
                    </form>

                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="btn text-light" style={{ background: "#516360", border: "none" }}>
                            Welcome back {username}  <BiLogOut />
                        </button>
                    ) : (
                        <button className="btn text-light" data-toggle="modal" data-target="#loginModal" style={{ background: "#516360", border: "none" }}>
                            Login <BiUser />
                        </button>
                    )}

                    <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Login</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="text-center">
                                        <img src={login_koala} alt="login koala" className="mb-3" />
                                    </div>
                                    <form action="/" onSubmit={handleFormSubmit}>

                                        <div className="form-outline mb-4">
                                            <input onChange={handleInputChange} type="text" id="username" name="username" value={credentials.username} className="form-control form-control-lg" required />
                                            <label className="form-label" htmlFor="email">Your Email</label>
                                        </div>

                                        <div className="form-outline ">
                                            <input onChange={handleInputChange} type="password" id="password" name="password" value={credentials.password} className="form-control form-control-lg" required />
                                            <label className="form-label" htmlFor="password">Password</label>
                                        </div>

                                        <div className="text-center">
                                            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live='assertive' style={{ "color": "red" }}>{errMsg}</p>
                                        </div>

                                        <div className="d-grid gap-2 mb-4">
                                            <button type="submit" className="btn btn-success">Login</button>
                                        </div>

                                        <div className="mb-2 text-center text-muted">
                                            <p className="mb-0">Don't have an account? <Link to="/">Create an account</Link>.</p>
                                            <p className="mb-0"><Link to="/">Forgot password?</Link></p>
                                        </div>

                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </header >

    )
}

export default Header