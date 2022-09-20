import React, { Component } from 'react'
import Navbar from '../components/navbar/Navbar';
import './styles.css';

export default class PDA extends Component {
    render() {
        return (
            <div className='bg'>
                <Navbar />
                <h1>PDA</h1>
            </div>

        )
    }
}
