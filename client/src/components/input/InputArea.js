import React, { Component } from 'react'
import './InputArea.css'


export default class InputArea extends Component {
    render() {
        return (
            <div>
                <form className="input" id="form" >
                    <div className='formGroup'>
                        <label>Alphabet:</label>
                        <input type="text" name="name" placeholder='ex: a,b,c,d,e' />

                    </div>
                    <div className='formGroup'>
                        <label>States:</label>
                        <input type="text" name="name" placeholder='ex: A, B, C' />
                    </div>
                    <div className='formGroup'>
                        <label>Starting State:</label>
                        <input type="text" name="name" placeholder='ex: A' />
                    </div>
                    <div className='formGroup'>
                        <label>Accepting States:</label>
                        <input type="text" name="name" placeholder="ex: C, B" />
                    </div>
                    <div className='formGroup'>
                        <label>Transitions:</label>
                        <input type="text" name="name" placeholder="ex: {(a, A, B); (b, B, C)}" />
                    </div>
                    <div className='formGroup'>
                        <label>Input:</label>
                        <input type="text" name="name" placeholder="ex: abcde" />
                    </div>
                    <div className="formGroup">
                        <input type="submit" value="Run"></input>
                    </div>
                </form>
            </div>
        )
    }
}
