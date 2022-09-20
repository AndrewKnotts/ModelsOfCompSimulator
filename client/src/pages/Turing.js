import React, { Component } from 'react'
import Navbar from '../components/navbar/Navbar';
import './styles.css';

export default class Turing extends Component {
    render() {
        return (
            <div className='bg'>
                <Navbar />
                <h1>Turing Machine</h1>
            </div>
        )
    }
}
