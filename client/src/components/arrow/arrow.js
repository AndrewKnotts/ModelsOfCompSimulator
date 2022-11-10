import React from 'react';
import './arrow.css';

const Arrow = (props) => {
    return (
        <div className='arr'>
            <h1 className='h1tag'>{props.symbol}
            </h1>
        </div>
    )
}

export default Arrow;
