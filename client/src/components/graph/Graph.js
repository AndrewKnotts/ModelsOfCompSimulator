import React, { Component } from 'react'
import State from '../state/State'
import { alphabet, states, startingState, acceptingStates, transitions, input, getInput } from '../input/InputArea';

export default class Graph extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numStates: input.length
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        this.props.handleSubmit(this.state);
        this.state.numStates = input.length + 1
    }

    render() {
        return (
            <div>
                {Array(1).fill(<State />)}
            </div>
        )
    }
}

//{Array(getInput(input)).fill(<State />)}
