import React, { Component } from 'react'
import './InputArea.css'

export default class InputArea extends Component {


    constructor() {
        super();
        this.state = {
            alphabet: '',
            states: '',
            startingState: '',
            acceptingStates: '',
            transitions: '',
            input: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt, field) {
        this.setState({ [field]: evt.target.value });
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
                    <div className='formGroup'>
                        <input type="submit" value="Run" />
                    </div>
                </form>
                <h1>{this.state.alphabet}</h1>
                <h1>{this.state.states}</h1>
                <h1>{this.state.startingState}</h1>
                <h1>{this.state.acceptingStates}</h1>
                <h1>{this.state.transitions}</h1>
                <h1>{this.state.input}</h1>
            </div>
        )
    }
}

