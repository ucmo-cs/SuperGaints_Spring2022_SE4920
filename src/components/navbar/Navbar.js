import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import "../css/nav.css";

import {useAuth} from "../../context/AuthContext";

export default function NavBar() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const {currentUser} = useAuth()
    console.log(currentUser)
    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <NavLink exact to="/" className="nav-logo">
                        Journey
                        <i className="fas fa-code"/>
                    </NavLink>
                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Home
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/destinations"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Destinations
                            </NavLink>
                        </li>
                        {currentUser ? <li className="nav-item">
                            <NavLink
                                exact
                                to="/dashboard"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Dashboard
                            </NavLink>
                        </li> : <li className="nav-item">
                            <NavLink
                                exact
                                to="/login"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Login
                            </NavLink>
                        </li>
                        }

                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/about"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                About
                            </NavLink>
                        </li>

                    </ul>
                    <div className="nav-icon" onClick={handleClick}>
                        <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
                    </div>
                </div>
            </nav>
        </>
    );
}
