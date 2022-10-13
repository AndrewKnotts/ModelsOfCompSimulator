import React, { Component } from 'react'
import './InputArea.css'
import { page } from '../navbar/Navbar.js';
import Picker from 'emoji-picker-react';
import State from '../state/State';
import { renderGraph } from '../../App';

var alphabet = ""
var states = ""
var startingState = ""
var acceptingStates = ""
var transitions = ""
var input = ""
var inputObj = ""


export default class InputArea extends Component {

    constructor(props) {
        super(props);
        // set the states to their current values in local storage
        this.state = {
            alphabet: localStorage.getItem('alphabet'),
            states: localStorage.getItem('states'),
            startingState: localStorage.getItem('startingState'),
            acceptingStates: localStorage.getItem('acceptingStates'),
            transitions: localStorage.getItem('transitions'),
            input: localStorage.getItem('input'),
            //graph: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.hideComponent = this.hideComponent.bind(this);
    }

    // Update the states as keys are pressed
    handleChange(evt, field) {
        this.setState({ [field]: evt.target.value });
        localStorage.setItem([field], evt.target.value);
        alphabet = this.state.alphabet;
        states = this.state.states;
        startingState = this.state.startingState;
        acceptingStates = this.state.acceptingStates;
        transitions = this.state.transitions;
        input = this.state.input;
    }

    /*hideComponent(name) {
        console.log(name);
        switch (name) {
            case "graph":
                this.setState({ graph: !this.state.graph });
                break;
        }
    }*/

    // On submit, run the correct model simulation
    handleSubmit(event) {

        if (page === "DFA") {
            console.log("Test1");
        }
        else if (page === "NFA") {
            console.log("Test2");
        }
        else if (page === "PDA") {
            console.log("Test3");
        }
        else if (page === "TuringMachine") {
            console.log("Test4");
        }
        inputObj = JSON.stringify(this.state);
        localStorage.setItem('inputState', inputObj);
        event.preventDefault()
        console.log(inputObj);
        //console.log(this.state);

        //renderGraph(true);
    }

    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit} className="input" id="form" >
                    <div className='formGroup'>
                        <label>Alphabet:</label>
                        <input type="text" value={this.state.alphabet} onChange={(event) => this.handleChange(event, "alphabet")} name="alphabet" placeholder='ex: a,b,c,d,e' />

                    </div>
                    <div className='formGroup'>
                        <label>States:</label>
                        <input type="text" value={this.state.states} onChange={(event) => this.handleChange(event, "states")} name="states" placeholder='ex: A, B, C' />
                    </div>
                    <div className='formGroup'>
                        <label>Starting State:</label>
                        <input type="text" value={this.state.startingState} onChange={(event) => this.handleChange(event, "startingState")} name="startingState" placeholder='ex: A' />
                    </div>
                    <div className='formGroup'>
                        <label>Accepting States:</label>
                        <input type="text" value={this.state.acceptingStates} onChange={(event) => this.handleChange(event, "acceptingStates")} name="acceptingStates" placeholder="ex: C, B" />
                    </div>
                    <div className='formGroup'>
                        <label>Transitions:</label>
                        <input type="text" value={this.state.transitions} onChange={(event) => this.handleChange(event, "transitions")} name="transitions" placeholder="ex: {(a, A, B); (b, B, C)}" />
                    </div>
                    <div className='formGroup'>
                        <label>Input:</label>
                        <input type="text" value={this.state.input} onChange={(event) => this.handleChange(event, "input")} name="input" placeholder="ex: abcde" />
                    </div>
                    <div className='btnGroup'>
                        <input onClick={(event) => this.handleSubmit(event)} type="submit" value="Run" />
                    </div>
                </form>
            </div>
        )
    }
}

export { alphabet, states, startingState, acceptingStates, transitions, input }
export function getInput(a) {
    return a.length;
}