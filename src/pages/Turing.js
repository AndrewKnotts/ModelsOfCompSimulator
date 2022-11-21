import React, { Component } from 'react'
import './styles.css';
import { TuringMachine } from '../components/input/TuringMachine';
import State from '../components/state/State';
import Popup from '../components/popup/Popup';

export default class Turing extends Component {
    outputTape = [];

    constructor(props) {
        super(props);
        // set the states to their current values in local storage
        this.state = {
            alphabetTM: localStorage.getItem('alphabetTM'),
            blankSymbolTM: localStorage.getItem('blankSymbolTM'),
            statesTM: localStorage.getItem('statesTM'),
            startingStateTM: localStorage.getItem('startingStateTM'),
            haltingStatesTM: localStorage.getItem('haltingStatesTM'),
            acceptingStatesTM: localStorage.getItem('acceptingStatesTM'),
            transitionsTM: localStorage.getItem('transitionsTM'),
            inputTM: localStorage.getItem('inputTM'),
            modelStates: [],
            modelTransitions: [],
            outputTape: [],
            result: 0,
            isOpen: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Update the states as keys are pressed
    handleChange(evt, field) {
        this.setState({ [field]: evt.target.value });
        localStorage.setItem([field], evt.target.value);
    }

    handleSubmit(event) {
        console.log("Turing Test");
        console.log(this.state.inputTM);
        let newModel = new TuringMachine(this.state.statesTM, this.state.alphabetTM, this.state.transitionsTM, this.state.startingStateTM,
            this.state.haltingStatesTM, this.state.acceptingStatesTM, this.state.blankSymbolTM);

        this.acceptance = newModel.simulateTape(this.state.inputTM);
        this.tapes = newModel.tapeHistory;
        this.trans = newModel.tsHistory;
        this.readIndex = newModel.startIndex;
        this.currentState = newModel.initial.name;
        this.tapeIndex = 1;

        this.setState({
            modelStates: 0,
            modelTransitions: 0,
            result: 0,
            outputTape: [...this.tapes[0]]
        });
    }

    nextTape() {
        console.log(this.currentState);
        if (this.tapeIndex >= this.tapes.length) {
            // if at the end of the tape history, indicate whether accepted/rejected
            if (this.acceptance === true) {
                this.setState({
                    result: 1
                });
            } else {
                this.setState({
                    result: 2
                });
            }
        } else {
            // else update state to next tape, and state/readIndex by checking corresponding transition
            this.setState({
                outputTape: [...this.tapes[this.tapeIndex]]
            });
            let currentTrans = this.trans[this.tapeIndex];
            this.currentState = currentTrans.nextState.name;
            if (currentTrans.move === ">") {
                this.readIndex += 1;
            } else if (currentTrans.move === "<") {
                if (this.readIndex !== 0) {
                    this.readIndex -= 1;
                }
            }
            this.tapeIndex += 1;
        }
    }

    delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    handleSaveToPC = (jsonData) => {
        var fileName = prompt('Enter a name for the file.');
        if (fileName === null) {
            return;
        }
        const fileData = JSON.stringify(jsonData);
        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${fileName}.json`;
        link.href = url;
        link.click();
    }

    clearInputs = () => {
        this.setState({
            alphabetTM: "",
            blankSymbolTM: "",
            statesTM: "",
            startingStateTM: "",
            haltingStatesTM: "",
            acceptingStatesTM: "",
            transitionsTM: "",
            inputTM: "",
        });
        localStorage.setItem('alphabetTM', "");
        localStorage.setItem('blankSymbolTM', "");
        localStorage.setItem('statesTM', "");
        localStorage.setItem('startingStateTM', "");
        localStorage.setItem('haltingStatesTM', "");
        localStorage.setItem('acceptingStatesTM', "");
        localStorage.setItem('transitionsTM', "");
        localStorage.setItem('inputTM', "");
        window.location.reload(true);
    }

    Upload = (evt) => {
        const fileReader = new FileReader();
        fileReader.readAsText(evt.target.files[0], "UTF-8");
        fileReader.onload = (event) => {
            let myObj = JSON.parse(event.target.result);
            console.log(myObj);
            this.setState({
                alphabetTM: myObj.alphabetTM,
                blankSymbolTM: myObj.blankSymbolTM,
                statesTM: myObj.statesTM,
                startingStateTM: myObj.startingStateTM,
                haltingStatesTM: myObj.haltingStatesTM,
                acceptingStatesTM: myObj.acceptingStatesTM,
                transitionsTM: myObj.transitionsTM,
                inputTM: myObj.inputTM,
            });
            localStorage.setItem('alphabetTM', myObj.alphabetTM);
            localStorage.setItem('blankSymbolTM', myObj.blankSymbolTM);
            localStorage.setItem('statesTM', myObj.statesTM,);
            localStorage.setItem('startingStateTM', myObj.startingStateTM);
            localStorage.setItem('haltingStatesTM', myObj.haltingStatesTM);
            localStorage.setItem('acceptingStatesTM', myObj.acceptingStatesTM);
            localStorage.setItem('transitionsTM', myObj.transitionsTM);
            localStorage.setItem('inputTM', myObj.inputTM);
        }
    }

    togglePopup = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return (
            <>
                <div className='contain'>
                    <div className='banner'>
                        <h1>Turing Machine</h1>
                        <input
                            className='help'
                            type="button"
                            value="Help"
                            onClick={this.togglePopup}
                        />
                        {this.state.isOpen && <Popup
                            content={<>
                                <b>Turing Machine Instructions</b>
                                <ol>
                                    <li>Input the necessary information into the text boxes.</li>
                                    <li>Press "Run" to compile the inputs.</li>
                                    <li>Continue to press "Step" to walk through the tape until the simulation completes.</li>
                                    <li>Press "Clear" to clear your inputs.</li>
                                    <li>Press "Download Inputs" to save your custom inputs to your device.</li>
                                    <li>Press "Choose File" to upload previously saved input files.</li>
                                </ol>
                            </>}
                            handleClose={this.togglePopup}
                        />}
                    </div>
                    <div className='inputArea'>
                        <form onSubmit={this.handleSubmit} className="input" id="form" >
                            <div className='formGroup'>
                                <label>Alphabet:</label>
                                <input type="text" value={this.state.alphabetTM} onChange={(event) => this.handleChange(event, "alphabetTM")} name="alphabet" placeholder='ex: a,b,c,d,e' />
                            </div>
                            <div className='formGroup'>
                                <label>Blank Symbol</label>
                                <input type="text" value={this.state.blankSymbolTM} onChange={(event) => this.handleChange(event, "blankSymbolTM")} name="blankSymbol" placeholder='ex: _' />
                            </div>
                            <div className='formGroup'>
                                <label>States:</label>
                                <input type="text" value={this.state.statesTM} onChange={(event) => this.handleChange(event, "statesTM")} name="states" placeholder='ex: q0, q1' />
                            </div>
                            <div className='formGroup'>
                                <label>Starting State:</label>
                                <input type="text" value={this.state.startingStateTM} onChange={(event) => this.handleChange(event, "startingStateTM")} name="startingState" placeholder='ex: q0' />
                            </div>
                            <div className='formGroup'>
                                <label>Halting States:</label>
                                <input type="text" value={this.state.haltingStatesTM} onChange={(event) => this.handleChange(event, "haltingStatesTM")} name="haltingStates" placeholder="ex: q1" />
                            </div>
                            <div className='formGroup'>
                                <label>Accepting States:</label>
                                <input type="text" value={this.state.acceptingStatesTM} onChange={(event) => this.handleChange(event, "acceptingStatesTM")} name="acceptingStates" placeholder="ex: q1" />
                            </div>
                            <div className='formGroup'>
                                <label>Transitions:</label>
                                <textarea type="text" value={this.state.transitionsTM} onChange={(event) => this.handleChange(event, "transitionsTM")} name="transitions" placeholder="ex: (q0, a) -> (q1, b, <); (q1, b) -> (q0, _ ,>)" />
                            </div>
                            <div className='formGroup'>
                                <label>Input:</label>
                                <input type="text" value={this.state.inputTM} onChange={(event) => this.handleChange(event, "inputTM")} name="input" placeholder="ex: abcde" />
                            </div>
                        </form>
                    </div>
                </div>
                <div className='btnGroup'>
                    <input className='b' onClick={(event) => this.handleSubmit(event)} type="button" value="Run" />
                    <input className='b' onClick={(event) => this.nextTape()} type="button" value="Step" />
                    <input className='b' onClick={this.clearInputs} type="button" value="Clear" />
                    <input className='b' onClick={(event) => this.handleSaveToPC(this.state)} type="button" value="Download Inputs" />
                    <input onChange={this.Upload} type="file" />
                </div>
                <div className='visualArea'>
                    <div>
                        {this.state.outputTape.map((txt, index) => {
                            if (this.state.result === 1) {
                                return <State page='activeTapeCell' stext='tapeText' symbol={txt}></State>
                            }
                            if (this.state.result === 2) {
                                return <State page='failedTapeCell' stext='tapeText' symbol={txt}></State>
                            }
                            if (index === this.readIndex) {
                                return <State page='activeTapeCell' stext='tapeText' symbol={txt}></State>
                            }
                            return <State page='tapeCell' stext='tapeText' symbol={txt}></State>
                        })}
                    </div>
                    <div>
                        {this.currentState !== undefined &&
                            <h2>
                                {"Current State: " + this.currentState}
                            </h2>
                        }
                    </div>
                </div>
            </>
        )
    }
}