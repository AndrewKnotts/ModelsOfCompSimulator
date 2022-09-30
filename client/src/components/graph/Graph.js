import React, { Component } from 'react'
import State from '../state/State'
import { alphabet, states, startingState, acceptingStates, transitions, input } from '../input/InputArea';

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
    }

    render() {
        return (
            <div>
                {Array(this.state.numStates).fill(<State />)}
            </div>
        )
    }
}
