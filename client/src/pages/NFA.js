import React, { Component } from 'react'
import Navbar from '../components/navbar/Navbar';
import './styles.css';
import { NFAModel } from '../components/input/NFAModel';
import State from '../components/state/State';
import Arrow from '../components/arrow/arrow';

export default class NFA extends Component {
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
    }

    // On submit, run the correct model simulation
    handleSubmit(event) {
        let nfa_model = new NFAModel(this.state.startingState, this.state.acceptingStates, this.state.states,
            this.state.alphabet, this.state.transitions);
        let output = nfa_model.checkInputString(this.state.input);
        //console.log(output);

        this.setState({
            modelStates: output[0].right.name,
            modelTransitions: output[0].left
        });

        this.outputDest = [];
        this.outputSymbols = [];
        this.outputDest.push(output[0].right.name)
        for (let i = 1; i < output.length; i++) {
            this.outputDest.push(output[i].left);
            this.outputDest.push(output[i].right.name);
        }

    }

    render() {

        return (
            <>
                <div className='contain'>
                    <h1>NFA</h1>
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
