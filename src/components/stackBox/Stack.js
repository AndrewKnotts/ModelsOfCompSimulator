import React, { Component } from 'react'
import './Stack.css'

const Stack = (props) => {
    return <div className={props.page}>
        <div className={props.stext}>{props.symbol}</div>
    </div>
}

export default Stack;
