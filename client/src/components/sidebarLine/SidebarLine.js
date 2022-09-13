import React, { Component } from 'react'
import './SidebarLine.css'

export default class SidebarLine extends Component {
    render() {
        return (
            <form>
                <label>
                    States:
                    <input className="line" type="text" name="states" />
                </label>
                <label>
                    Alphabet:
                    <input className="line" type="text" name="alphabet" />
                </label>
                <label name="initEndState">
                    Initial State:
                    <input className="line" type="text" name="initState" />
                </label>
                <label name="initEndState">
                    Ending State:
                    <input className="line" type="text" name="endState" />
                </label>
                <label>
                    Transitions:
                    <input className="line" type="text" name="transitions" />
                </label>
            </form>
        )
    }
}
