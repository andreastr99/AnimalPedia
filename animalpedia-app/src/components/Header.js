import React from 'react'
import { BiSearch, BiLogOut, BiUser } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import koala from '../assets/koala.png'

const Header = () => {
    return (
        <header className="p-3" style={{ background: "#C1E1C1" }}>
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

                    <Link to='/' className="d-flex align-items-center mb-2 mb-lg-0 text-decoration-none">
                        <h1 style={{ fontFamily: "Papyrus", color: "green" }}>AnimalPedia</h1>
                        <img src={koala} alt='koala'/>
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
                    <button className="btn btn-danger" style={{ background: "#516360", border: "none" }}>
                        {/* <BiLogOut /> Logout */}
                        <BiUser /> Sign Up
                    </button>
                </div>
            </div>
        </header>

    )
}

export default Header