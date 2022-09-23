import React, { Component, useState } from 'react';
import './Navbar.css';
import { useMatch, Link, useResolvedPath } from 'react-router-dom';

var page = "DFA";

function Navbar() {

    function handleClick(currPage) {
        page = currPage;
    }

    return (
        <nav className='nav'>
            <Link to="/" className='site-title'>Simulator for Models of Computation </Link>
            <ul>
                <CustomLink to="/DFA" onClick={() => { handleClick("DFA") }}>DFA</CustomLink>
                <CustomLink to="/NFA" onClick={() => { handleClick("NFA") }}>NFA</CustomLink>
                <CustomLink to="/PDA" onClick={() => { handleClick("PDA") }}>PDA</CustomLink>
                <CustomLink to="/TuringMachine" onClick={() => { handleClick("TuringMachine") }}>Turing Machine</CustomLink>
            </ul>
        </nav>
    );
}

//Function designed to keep track of the current computing style being used - updates in the navbar
function CustomLink({ to, onClick, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props} onClick={onClick} >{children}</Link>
        </li>
    )
};

export default Navbar;

export { page };
