import React, { Component } from 'react'
import './State.css'

import { model } from '../input/InputArea'


/*export default class State extends Component {

    constructor(props) {
        super(props)
        this.state = {
            symbol: "",
        }
    }



    render() {
        return (
            <div class="circle-res">
                <div className='circle-txt'>{this.props.symbol}</div>
            </div>
        )
    }
}*/

const State = (props) => {
    return <div className='circle-res'>
        <div className='circle-txt'>{props.symbol}</div>
    </div>
}

export default State;
