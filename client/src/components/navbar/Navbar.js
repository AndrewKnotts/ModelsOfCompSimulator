import React, { Component } from 'react';
import './Navbar.css';
import { useMatch, Link, useResolvedPath } from 'react-router-dom';




export default class Navbar extends Component {
    render() {
        const path = window.location.pathname
        return (
            <nav className='nav'>
                <Link to="/" className='site-title'>Simulator for Models of Computation </Link>
                <ul>
                    <CustomLink to="/DFA">DFA</CustomLink>
                    <CustomLink to="/NFA">NFA</CustomLink>
                    <CustomLink to="/PDA">PDA</CustomLink>
                    <CustomLink to="/Turing">Turing Machine</CustomLink>
                </ul>
            </nav>
        );
    }
};

//Function designed to keep track of the current computing style being used - updates in the navbar
function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}
