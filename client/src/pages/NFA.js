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
            alphabetNFA: localStorage.getItem('alphabetNFA'),
            statesNFA: localStorage.getItem('statesNFA'),
            startingStateNFA: localStorage.getItem('startingStateNFA'),
            acceptingStatesNFA: localStorage.getItem('acceptingStatesNFA'),
            transitionsNFA: localStorage.getItem('transitionsNFA'),
            inputNFA: localStorage.getItem('inputNFA'),
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
        let nfa_model = new NFAModel(this.state.startingStateNFA, this.state.acceptingStatesNFA, this.state.statesNFA,
            this.state.alphabetNFA, this.state.transitionsNFA);
        let output = nfa_model.checkInputString(this.state.inputNFA);
        let sets = nfa_model.setPath;

        this.setState({
            modelStates: sets[0].name,
            modelTransitions: ""
        });

        this.outputDest = [];
        this.outputSymbols = [];
        for (let i = 0; i < sets.length; i++) {
            let set = [];
            sets[i].forEach(state => set.push(state.name))
            this.outputDest.push(set);
            this.outputDest.push("");
        }
        this.outputDest.push(output[0].right.name)

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
                                <input type="text" value={this.state.alphabetNFA} onChange={(event) => this.handleChange(event, "alphabetNFA")} name="alphabet_nfa" placeholder='ex: a,b,c,d,e' />

                            </div>
                            <div className='formGroup'>
                                <label>States:</label>
                                <input type="text" value={this.state.statesNFA} onChange={(event) => this.handleChange(event, "statesNFA")} name="states_nfa" placeholder='ex: A, B, C' />
                            </div>
                            <div className='formGroup'>
                                <label>Starting State:</label>
                                <input type="text" value={this.state.startingStateNFA} onChange={(event) => this.handleChange(event, "startingStateNFA")} name="startingState_nfa" placeholder='ex: A' />
                            </div>
                            <div className='formGroup'>
                                <label>Accepting States:</label>
                                <input type="text" value={this.state.acceptingStatesNFA} onChange={(event) => this.handleChange(event, "acceptingStatesNFA")} name="acceptingStates_nfa" placeholder="ex: C, B" />
                            </div>
                            <div className='formGroup'>
                                <label>Transitions:</label>
                                <textarea type="text" value={this.state.transitionsNFA} onChange={(event) => this.handleChange(event, "transitionsNFA")} name="transitions_nfa" placeholder="ex: (0, A, A); (1, A, B); (1, B, A); (0, B, B)" />
                            </div>
                            <div className='formGroup'>
                                <label>Input:</label>
                                <input type="text" value={this.state.inputNFA} onChange={(event) => this.handleChange(event, "inputNFA")} name="input_nfa" placeholder="ex: abcde" />
                            </div>
                        </form>
                    </div>

                </div>

                <div className='btnGroup'>
                    <input onClick={(event) => this.handleSubmit(event)} type="button" value="Run" />
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