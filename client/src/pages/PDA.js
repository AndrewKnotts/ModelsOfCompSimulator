import React, { Component } from 'react'
import Navbar from '../components/navbar/Navbar';
import './styles.css';
import { PDAModel } from '../components/input/PDAModel';
import State from '../components/state/State';
import Arrow from '../components/arrow/arrow';

export default class PDA extends Component {
    outputDest = [];
    outputSymbols = [];

    constructor(props) {
        super(props);
        // set the states to their current values in local storage
        this.state = {
            alphabet: localStorage.getItem('alphabet'),
            states: localStorage.getItem('states'),
            startingState: localStorage.getItem('startingState'),
            acceptingStates: localStorage.getItem('acceptingStates'),
            stack: localStorage.getItem('stack'),
            pushdownAlphabet: localStorage.getItem('pushdownAlphabet'),
            transitions: localStorage.getItem('transitions'),
            input: localStorage.getItem('input'),
            modelStates: [],
            modelTransitions: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    _showMessage = (bool) => {
        this.setState({
            showMessage: bool
        })
    }

    // Update the states as keys are pressed
    handleChange(evt, field) {
        this.setState({ [field]: evt.target.value });
        localStorage.setItem([field], evt.target.value);
        /*alphabet = this.state.alphabet;
        states = this.state.states;
        startingState = this.state.startingState;
        acceptingStates = this.state.acceptingStates;
        transitions = this.state.transitions;
        input = this.state.input;*/
    }

    // On submit, run the correct model simulation
    handleSubmit(event) {


        let new_model = new PDAModel(this.state.states, this.state.startingState, this.state.alphabet, this.state.pushdownAlphabet, this.state.transitions, this.state.stack, this.state.acceptingStates);
        //console.log(new_model.checkInputString(this.state.input));
        let output = new_model.checkInputString(this.state.input);
        this.setState({
            modelStates: output[0].dest.name,
            modelTransitions: output[0].symbol
        });
        this.outputDest = [];
        this.outputSymbols = [];
        this.outputDest.push(output[0].source.name)
        for (let i = 0; i < output.length; i++) {
            this.outputDest.push(output[i].symbol);
            this.outputDest.push(output[i].dest.name);
        }
        console.log(this.outputDest, this.outputSymbols);
        //this._showMessage.bind(null, true)

        // }

        //else if (page === "PDA") {
        //console.log("Test3");

        // }
        //else if (page === "TuringMachine") {
        //    console.log("Test4");
        //}*/

        //event.preventDefault()

    }

    render() {

        return (
            <>
                <div className='contain'>
                    <h1>PDA</h1>
                    <div className='inputArea'>
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
                                <label>Stack Alphabet:</label>
                                <input type="text" value={this.state.pushdownAlphabet} onChange={(event) => this.handleChange(event, "pushdownAlphabet")} name="pushdownAlphabet" placeholder="ex: 1,2,3" />
                            </div>
                            <div className='formGroup'>
                                <label>Stack:</label>
                                <input type="text" value={this.state.stack} onChange={(event) => this.handleChange(event, "stack")} name="stack" placeholder="ex: []" />
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

                </div>
                <div className='visualArea'>
                    {this.outputDest.map((txt, index) => {
                        if (index % 2 == 0)
                            return <State symbol={txt}></State>
                        return <Arrow symbol={txt} />
                    })}
                </div>

            </>

        )

    }
}
