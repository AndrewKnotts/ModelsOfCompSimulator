import React, { Component } from 'react'
import './styles.css';
import { TuringMachine } from '../components/input/TuringMachine';

export default class Turing extends Component {
    outputDest = [];
    outputInputSymbols = [];

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
            modelTransitions: []
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
        let new_model = new TuringMachine(this.state.statesTM, this.state.alphabetTM, this.state.transitionsTM, this.state.startingStateTM, 
            this.state.haltingStatesTM, this.state.acceptingStatesTM, this.state.blankSymbolTM);
        let output = new_model.simulateTape(this.state.inputTM);
        let tapes = new_model.tape_history;
        /*this.setState({
            modelStates: 
            modelTransitions:
        }) */
        console.log(output);
        console.log(tapes);
    }

    handleSaveToPC = (jsonData) => {
        const fileName = prompt('Enter a name for the file.');
        const fileData = JSON.stringify(jsonData);
        const blob = new Blob([fileData], { type: "text/plain"});
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



    render() {
        return (
            <>
                <div className='contain'>
                    <h1>Turing Machine</h1>
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
                    <input onClick={(event) => this.handleSubmit(event)} type="button" value="Run" />
                    <input onClick={this.clearInputs} type="button" value="Clear" />
                    <input onClick={(event) => this.handleSaveToPC(this.state)} type="button" value="Save Inputs" />
                    <input onChange={this.Upload} type="file" />
                </div>
            </>
        )
    }
}
