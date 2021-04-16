import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
const Navbar = (props) => {
    const {isLoggedIn} =  props;

    return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                <NavLink className="navbar-brand" to="/">React Auth</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <NavLink exact activeClassName="active" className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
                        {  isLoggedIn ? <NavLink className="nav-link" activeClassName="active"  to="/dashboard">Dashboard</NavLink> : '' }
                    </ul>
                    <span className="navbar-text">
                    <ul className="navbar-nav mr-auto">
                    { !isLoggedIn ? <NavLink  className="nav-link" activeClassName="active"  to="/login">Login </NavLink> : <NavLink className="nav-link" activeClassName="" to="/logout">Logout</NavLink> }
                    </ul>
                    </span>
                </div>
            </nav>
    );
}

export default Navbar;