import React, { Component } from 'react'
import Navbar from '../components/navbar/Navbar';
import './styles.css';

export default class NFA extends Component {
    render() {
        return (
            <div className='bg'>
                <Navbar />
                <h1>NFA</h1>
            </div>
        )
    }
}
