import React, { Component } from 'react'
import './styles.css';
import { PDAModel } from '../components/input/PDAModel';
import State from '../components/state/State';
import Arrow from '../components/arrow/arrow';
import Popup from '../components/popup/Popup';

export default class PDA extends Component {
    outputDest = [];
    outputInputSymbols = [];
    stackOutput = [];

    constructor(props) {
        super(props);
        // set the states to their current values in local storage
        this.state = {
            inputAlphabetPDA: localStorage.getItem('inputAlphabetPDA'),
            pushdownAlphabetPDA: localStorage.getItem('pushdownAlphabetPDA'),
            statesPDA: localStorage.getItem('statesPDA'),
            startingStatePDA: localStorage.getItem('startingStatePDA'),
            startingStackPDA: localStorage.getItem('startingStackPDA'),
            acceptingStatesPDA: localStorage.getItem('acceptingStatesPDA'),
            transitionsPDA: localStorage.getItem('transitionsPDA'),
            inputPDA: localStorage.getItem('inputPDA'),
            modelStates: [],
            modelTransitions: [],
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

    // On submit, run the correct model simulation
    handleSubmit(event) {
        console.log("PDA Test");
        let new_model = new PDAModel(this.state.statesPDA, this.state.startingStatePDA, this.state.inputAlphabetPDA, this.state.pushdownAlphabetPDA, this.state.transitionsPDA, this.state.startingStackPDA, this.state.acceptingStatesPDA)
        let output = new_model.checkInputString(this.state.inputPDA);
        let outputStack = new_model.stackTrace;
        this.setState({
            modelStates: output[0].dest.name,
            modelTransitions: output[0].input
        });
        this.outputDest = [];
        this.outputInputSymbols = [];
        this.outputStack = []
        this.outputDest.push(output[0].source.name);
        for (let i = 0; i < output.length; i++) {
            this.outputDest.push(outputStack[i]);
            let inputSym = (output[i].input === "eps" ? "ε" : output[i].input);
            let stack0Sym = (output[i].stack0 === "eps" ? "ε" : output[i].stack0);
            let stack1Sym = (output[i].stack1 === "eps" ? "ε" : output[i].stack1);
            this.outputDest.push(inputSym + ", " + stack0Sym + " | " + stack1Sym);
            this.outputDest.push(output[i].dest.name);
            //this.stackOutput.push(stack0Sym + " | " + stack1Sym);
        }
        this.outputDest.push(new_model.currentStack);
        console.log(this.stackOutput);

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
            inputAlphabetPDA: "",
            pushdownAlphabetPDA: "",
            statesPDA: "",
            startingStatePDA: "",
            startingStackPDA: "",
            acceptingStatesPDA: "",
            transitionsPDA: "",
            inputPDA: ""
        });
        localStorage.setItem("inputAlphabetPDA", "");
        localStorage.setItem("pushdownAlphabetPDA", "");
        localStorage.setItem("statesPDA", "");
        localStorage.setItem("startingStatePDA", "");
        localStorage.setItem("startingStackPDA", "");
        localStorage.setItem("acceptingStatesPDA", "");
        localStorage.setItem("transitionsPDA", "");
        localStorage.setItem("inputPDA", "");
        window.location.reload(true);
    }

    Upload = (evt) => {

        const fileReader = new FileReader();
        fileReader.readAsText(evt.target.files[0], "UTF-8");
        fileReader.onload = (event) => {
            let myObj = JSON.parse(event.target.result);
            console.log(myObj);
            this.setState({
                inputAlphabetPDA: myObj.inputAlphabetPDA,
                pushdownAlphabetPDA: myObj.pushdownAlphabetPDA,
                statesPDA: myObj.statesPDA,
                startingStatePDA: myObj.startingStatePDA,
                startingStackPDA: myObj.startingStackPDA,
                acceptingStatesPDA: myObj.acceptingStatesPDA,
                transitionsPDA: myObj.transitionsPDA,
                inputPDA: myObj.inputPDA,
            });
            localStorage.setItem("inputAlphabetPDA", myObj.inputAlphabetPDA);
            localStorage.setItem("pushdownAlphabetPDA", myObj.pushdownAlphabetPDA);
            localStorage.setItem("statesPDA", myObj.statesPDA);
            localStorage.setItem("startingStatePDA", myObj.startingStatePDA);
            localStorage.setItem("startingStackPDA", myObj.startingStackPDA);
            localStorage.setItem("acceptingStatesPDA", myObj.acceptingStatesPDA);
            localStorage.setItem("transitionsPDA", myObj.transitionsPDA);
            localStorage.setItem("inputPDA", myObj.inputPDA);
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
                        <h1>PDA</h1>
                        <input
                            className='help'
                            type="button"
                            value="Help"
                            onClick={this.togglePopup}
                        />
                        {this.state.isOpen && <Popup
                            content={<>
                                <b>PDA Instructions</b>
                                <ol>
                                    <li>Input the necessary information into the text boxes.</li>
                                    <li>Press "Run" to compile the information.</li>
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
                                <label>Input Alphabet:</label>
                                <input type="text" value={this.state.inputAlphabetPDA} onChange={(event) => this.handleChange(event, "inputAlphabetPDA")} name="inputAlphabet" placeholder='ex: a,b,c,d,e' />
                            </div>
                            <div className='formGroup'>
                                <label>Pushdown Alphabet:</label>
                                <input type="text" value={this.state.pushdownAlphabetPDA} onChange={(event) => this.handleChange(event, "pushdownAlphabetPDA")} name="pushdownAlphabet" placeholder='ex: A,Z,F,N' />
                            </div>
                            <div className='formGroup'>
                                <label>States:</label>
                                <input type="text" value={this.state.statesPDA} onChange={(event) => this.handleChange(event, "statesPDA")} name="states" placeholder='ex: q0, q1' />
                            </div>
                            <div className='formGroup'>
                                <label>Starting State:</label>
                                <input type="text" value={this.state.startingStatePDA} onChange={(event) => this.handleChange(event, "startingStatePDA")} name="startingState" placeholder='ex: q0' />
                            </div>
                            <div className='formGroup'>
                                <label>Accepting States:</label>
                                <input type="text" value={this.state.acceptingStatesPDA} onChange={(event) => this.handleChange(event, "acceptingStatesPDA")} name="acceptingStates" placeholder="ex: q1" />
                            </div>
                            <div className='formGroup'>
                                <label>Initial Stack:</label>
                                <input type="text" value={this.state.startingStackPDA} onChange={(event) => this.handleChange(event, "startingStackPDA")} name="startingStack" placeholder="ex: ZZAZ" />
                            </div>
                            <div className='formGroup'>
                                <label>Transitions:</label>
                                <textarea type="text" value={this.state.transitionsPDA} onChange={(event) => this.handleChange(event, "transitionsPDA")} name="transitions" placeholder="ex: (0, A, A); (1, A, B); (1, B, A); (0, B, B)" />
                            </div>
                            <div className='formGroup'>
                                <label>Input:</label>
                                <input type="text" value={this.state.inputPDA} onChange={(event) => this.handleChange(event, "inputPDA")} name="input" placeholder="ex: abcde" />
                            </div>
                        </form>
                    </div>
                </div>
                <div className='btnGroup'>
                    <input className='b' onClick={(event) => this.handleSubmit(event)} type="button" value="Run" />
                    <input className='b' onClick={this.clearInputs} type="button" value="Clear" />
                    <input className='b' onClick={(event) => this.handleSaveToPC(this.state)} type="button" value="Download Inputs" />
                    <input onChange={this.Upload} type="file" />
                </div>
                <div className='visualArea'>
                    {this.outputDest.map((txt, index) => {
                        if (index % 3 === 0)
                            return (
                                <>
                                    <State page='circle-res' stext='circle-txt' symbol={txt} />
                                </>
                            )
                        else if ((index - 1) % 3 === 0)
                            return <State page="stack-res" stext='circle-txt' symbol={txt}></State>
                        return <Arrow symbol={txt} />
                    })}
                </div>
            </>
        )
    }
}