import React, { Component } from 'react'
import './InputArea.css'
import { page } from '../navbar/Navbar.js';
import { DFAModel } from './DFAModel.js';
import { NFAModel } from './NFAModel.js';
import NFA from '../../pages/NFA';

var alphabet = ""
var states = ""
var startingState = ""
var acceptingStates = ""
var transitions = ""
var input = ""
var model = null;

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
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    // On submit, run the correct model simulation
    handleSubmit(event) {

        if (page === "DFA") {
            console.log("Test1");
            let new_model = new DFAModel(this.state.startingState, this.state.acceptingStates, this.state.states, 
                this.state.alphabet, this.state.transitions);
            //console.log(new_model.checkInputString(this.state.input));
            new_model.checkInputString(this.state.input);
            //console.log(model);

        }
        else if (page === "NFA") {
            console.log("Test2");
            let nfa_model = new NFAModel(this.state.startingState, this.state.acceptingStates, this.state.states, 
                this.states.alphabet, this.state.transitions);
            nfa_model.checkInputString(this.state.input);
        }
        else if (page === "PDA") {
            console.log("Test3");
        }
        else if (page === "TuringMachine") {
            console.log("Test4");
        }

        //event.preventDefault()

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
                        <input type="text" value={this.state.transitions} onChange={(event) => this.handleChange(event, "transitions")} name="transitions" placeholder="ex: (a, A, B); (b, B, C)" />
                    </div>
                    <div className='formGroup'>
                        <label>Input:</label>
                        <input type="text" value={this.state.input} onChange={(event) => this.handleChange(event, "input")} name="input" placeholder="ex: abcde" />
                    </div>
                    <div className='btnGroup'>
                        <input onClick={(event) => this.handleSubmit(event)} type="button" value="Run" />
                    </div>
                </form>
            </div>
        )
    }
}

export { alphabet, states, startingState, acceptingStates, transitions, input, model }

export class Graph extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numStates: model
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /*handleSubmit() {
        this.props.handleSubmit(this.state);
    }*/

    render() {
        return (
            <div>
                hello
            </div>
        )
    }
}