import React from 'react'
import './State.css'
import Delayed from '../Delayed';
const State = (props) => {
    return (
        <Delayed>
            <div className={props.page}>
                <div className={props.stext}>{props.symbol}</div>
            </div>
        </Delayed>
    );
}

export default State;
