import React, { Component } from 'react'
import State from '../state/State'
import { alphabet, states, startingState, acceptingStates, transitions, input, model } from '../input/InputArea';

export default class Graph extends Component {

    render() {
        return (
            <div>
                {Array().fill(<State />)}
            </div>
        )
    }
}
//{Array(this.state.numStates).fill(<State />)}
