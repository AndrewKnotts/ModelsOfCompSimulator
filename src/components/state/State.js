import React from 'react'
import './State.css'

const State = (props) => {
    return (<><div className={props.page}>
        <div className={props.stext}>{props.symbol}</div>
    </div>
    </>
    )
}

export default State;
