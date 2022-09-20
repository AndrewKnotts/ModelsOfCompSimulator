import React, { Component } from 'react'
import './styles.css';
import Navbar from '../components/navbar/Navbar';

export default class DFA extends Component {
    render() {
        return (
            <div className="bg">
                <Navbar />
                <h1>DFA</h1>
            </div>
        )
    }
}
