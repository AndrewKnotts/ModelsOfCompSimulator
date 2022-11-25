import React, { Component } from 'react'
import './styles.css';
import { DFAModel } from '../components/input/DFAModel';
import Arrow from '../components/arrow/arrow';
import Popup from '../components/popup/Popup';
import State from '../components/state/State';

export default class DFA extends Component {
    outputDest = [];

    constructor(props) {
        super(props);
        // set the states to their current values in local storage
        this.state = {
            alphabetDFA: localStorage.getItem('alphabetDFA'),
            statesDFA: localStorage.getItem('statesDFA'),
            startingStateDFA: localStorage.getItem('startingStateDFA'),
            acceptingStatesDFA: localStorage.getItem('acceptingStatesDFA'),
            transitionsDFA: localStorage.getItem('transitionsDFA'),
            inputDFA: localStorage.getItem('inputDFA'),
            modelStates: [],
            modelTransitions: [],
            isOpen: false,
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
        console.log("Test1");
        let newModel = new DFAModel(this.state.startingStateDFA, this.state.acceptingStatesDFA, this.state.statesDFA, this.state.alphabetDFA, this.state.transitionsDFA);
        let output = newModel.checkInputString(this.state.inputDFA);
        this.setState({
            modelStates: output[0].dest.name,
            modelTransitions: output[0].symbol
        });
        this.outputDest = [];
        this.outputDest.push(output[0].source.name)
        for (let i = 0; i < output.length; i++) {
            this.outputDest.push(output[i].symbol);
            this.outputDest.push(output[i].dest.name);
        }
        console.log(this.outputDest);
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
            alphabetDFA: "",
            statesDFA: "",
            startingStateDFA: "",
            acceptingStatesDFA: "",
            transitionsDFA: "",
            inputDFA: ""
        });
        localStorage.setItem("alphabetDFA", "");
        localStorage.setItem("statesDFA", "");
        localStorage.setItem("startingStateDFA", "");
        localStorage.setItem("acceptingStatesDFA", "");
        localStorage.setItem("transitionsDFA", "");
        localStorage.setItem("inputDFA", "");
        window.location.reload(true);
    }

    Upload = (evt) => {
        const fileReader = new FileReader();
        fileReader.readAsText(evt.target.files[0], "UTF-8");
        fileReader.onload = (event) => {
            let myObj = JSON.parse(event.target.result);
            console.log(myObj);
            this.setState({
                alphabetDFA: myObj.alphabetDFA,
                statesDFA: myObj.statesDFA,
                startingStateDFA: myObj.startingStateDFA,
                acceptingStatesDFA: myObj.acceptingStatesDFA,
                transitionsDFA: myObj.transitionsDFA,
                inputDFA: myObj.inputDFA,
            });
            localStorage.setItem("alphabetDFA", myObj.alphabetDFA);
            localStorage.setItem("statesDFA", myObj.statesDFA);
            localStorage.setItem("startingStateDFA", myObj.startingStateDFA);
            localStorage.setItem("acceptingStatesDFA", myObj.acceptingStatesDFA);
            localStorage.setItem("transitionsDFA", myObj.transitionsDFA);
            localStorage.setItem("inputDFA", myObj.inputDFA);
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
                        <h1>DFA</h1>
                        <input
                            className='help'
                            type="button"
                            value="Help"
                            onClick={this.togglePopup}
                        />
                        {this.state.isOpen && <Popup
                            content={<>
                                <b>DFA Instructions</b>
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
                                <label>Alphabet:</label>
                                <input type="text" value={this.state.alphabetDFA} onChange={(event) => this.handleChange(event, "alphabetDFA")} name="alphabet" placeholder='ex: 0, 1' />
                            </div>
                            <div className='formGroup'>
                                <label>States:</label>
                                <input type="text" value={this.state.statesDFA} onChange={(event) => this.handleChange(event, "statesDFA")} name="states" placeholder='ex: A, B' />
                            </div>
                            <div className='formGroup'>
                                <label>Starting State:</label>
                                <input type="text" value={this.state.startingStateDFA} onChange={(event) => this.handleChange(event, "startingStateDFA")} name="startingState" placeholder='ex: A' />
                            </div>
                            <div className='formGroup'>
                                <label>Accepting States:</label>
                                <input type="text" value={this.state.acceptingStatesDFA} onChange={(event) => this.handleChange(event, "acceptingStatesDFA")} name="acceptingStates" placeholder="ex: B" />
                            </div>
                            <div className='formGroup'>
                                <label>Transitions:</label>
                                <textarea type="text" value={this.state.transitionsDFA} onChange={(event) => this.handleChange(event, "transitionsDFA")} name="transitions" placeholder="ex: (0, A, A); (1, A, B); (1, B, A); (0, B, B)" />
                            </div>
                            <div className='formGroup' name="input">
                                <label>Input:</label>
                                <input type="text" value={this.state.inputDFA} onChange={(event) => this.handleChange(event, "inputDFA")} name="input" placeholder="ex: 10101" />
                            </div>
                        </form>
                    </div>
                </div>
                <div className='btnGroup'>
                    <input className='b' onClick={(event) => this.handleSubmit(event)} type="button" value="Run" />
                    <input className='b' onClick={this.clearInputs} type="button" value="Clear" />
                    <input className='b' onClick={() => this.handleSaveToPC(this.state)} type="button" value="Download Inputs" />
                    <input onChange={this.Upload} type="file" />
                </div>
                <div className='visualArea'>
                    {this.outputDest.map((txt, index) => {
                        if (index % 2 === 0)
                            return (
                                <State page='circle-res' stext='circle-txt' symbol={txt}></State>
                            )
                        return (
                            <Arrow symbol={txt} />
                        )
                    })}
                </div>
            </>
        )
    }

}