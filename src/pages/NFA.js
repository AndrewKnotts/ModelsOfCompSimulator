import React, { Component } from 'react'
import './styles.css';
import { NFAModel } from '../components/input/NFAModel';
import State from '../components/state/State';
import Arrow from '../components/arrow/arrow';

export default class NFA extends Component {
    outputDest = [];
    outputSymbols = [];

    constructor(props) {
        super(props);
        // set the states to their current values in local storage
        this.state = {
            alphabetNFA: localStorage.getItem('alphabetNFA'),
            statesNFA: localStorage.getItem('statesNFA'),
            startingStateNFA: localStorage.getItem('startingStateNFA'),
            acceptingStatesNFA: localStorage.getItem('acceptingStatesNFA'),
            transitionsNFA: localStorage.getItem('transitionsNFA'),
            inputNFA: localStorage.getItem('inputNFA'),
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

    handleSubmit(event) {;
        let newModel = new NFAModel(this.state.startingStateNFA, this.state.acceptingStatesNFA, this.state.statesNFA, this.state.alphabetNFA, this.state.transitionsNFA);
        let output = newModel.checkInputString(this.state.inputNFA);
        console.log(output);
        this.setState({
            modelStates: output[0].left.name,
            modelTransitions: output[0].right
        });
        this.outputDest = [];
        this.outputSymbols = [];
        this.outputDest.push(output[0].left.name)
        for (let i = 1; i < output.length; i++) {
            this.outputDest.push(output[i].right);
            this.outputDest.push(output[i].left.name);
        }
        console.log(this.outputDest, this.outputSymbols);
    }

    /* 
    STATE-SET VERSION
    
    // On submit, run the correct model simulation
    handleSubmit(event) {
        let nfaModel = new NFAModel(this.state.startingStateNFA, this.state.acceptingStatesNFA, this.state.statesNFA,
            this.state.alphabetNFA, this.state.transitionsNFA);
        let output = nfaModel.checkInputString(this.state.inputNFA);
        let sets = nfaModel.setPath;

        this.setState({
            modelStates: sets[0].name,
            modelTransitions: ""
        });

        this.outputDest = [];
        this.outputSymbols = [];
        console.log(sets);
        for (let i = 0; i < sets.length; i++) {
            let temp = Array.from(sets[i])
            console.log(temp);
            let set = [];
            temp.forEach((state, index) => {
                set.push(state.name)
                if (index !== temp.length - 1) {
                    set.push("|")
                }
            })

            this.outputDest.push(set);
            this.outputDest.push("");
            console.log(set);
        }
        this.outputDest.push(output[0].right.name)

    } */

    handleSaveToPC = (jsonData) => {
        const fileName = prompt('Enter a name for the file.');
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
            alphabetNFA: "",
            statesNFA: "",
            startingStateNFA: "",
            acceptingStatesNFA: "",
            transitionsNFA: "",
            inputNFA: ""
        });
        localStorage.setItem("alphabetNFA", "");
        localStorage.setItem("statesNFA", "");
        localStorage.setItem("startingStateNFA", "");
        localStorage.setItem("acceptingStatesNFA", "");
        localStorage.setItem("transitionsNFA", "");
        localStorage.setItem("inputNFA", "");
        window.location.reload(true);
    }

    Upload = (evt) => {
        const fileReader = new FileReader();
        fileReader.readAsText(evt.target.files[0], "UTF-8");
        fileReader.onload = (event) => {
            let myObj = JSON.parse(event.target.result);
            console.log(myObj);
            this.setState({
                alphabetNFA: myObj.alphabetNFA,
                statesNFA: myObj.statesNFA,
                startingStateNFA: myObj.startingStateNFA,
                acceptingStatesNFA: myObj.acceptingStatesNFA,
                transitionsNFA: myObj.transitionsNFA,
                inputNFA: myObj.inputNFA,
            });
            localStorage.setItem("alphabetNFA", myObj.alphabetNFA);
            localStorage.setItem("statesNFA", myObj.statesNFA);
            localStorage.setItem("startingStateNFA", myObj.startingStateNFA);
            localStorage.setItem("acceptingStatesNFA", myObj.acceptingStatesNFA);
            localStorage.setItem("transitionsNFA", myObj.transitionsNFA);
            localStorage.setItem("inputNFA", myObj.inputNFA);
        }
    }

    render() {

        return (
            <>
                <div className='contain'>
                    <h1>NFA</h1>
                    <div className='inputArea'>
                        <form onSubmit={this.handleSubmit} className="input" id="form" >
                            <div className='formGroup'>
                                <label>Alphabet:</label>
                                <input type="text" value={this.state.alphabetNFA} onChange={(event) => this.handleChange(event, "alphabetNFA")} name="alphabet_nfa" placeholder='ex: a,b,c,d,e' />

                            </div>
                            <div className='formGroup'>
                                <label>States:</label>
                                <input type="text" value={this.state.statesNFA} onChange={(event) => this.handleChange(event, "statesNFA")} name="states_nfa" placeholder='ex: A, B, C' />
                            </div>
                            <div className='formGroup'>
                                <label>Starting State:</label>
                                <input type="text" value={this.state.startingStateNFA} onChange={(event) => this.handleChange(event, "startingStateNFA")} name="startingState_nfa" placeholder='ex: A' />
                            </div>
                            <div className='formGroup'>
                                <label>Accepting States:</label>
                                <input type="text" value={this.state.acceptingStatesNFA} onChange={(event) => this.handleChange(event, "acceptingStatesNFA")} name="acceptingStates_nfa" placeholder="ex: C, B" />
                            </div>
                            <div className='formGroup'>
                                <label>Transitions:</label>
                                <textarea type="text" value={this.state.transitionsNFA} onChange={(event) => this.handleChange(event, "transitionsNFA")} name="transitions_nfa" placeholder="ex: (0, A, A); (1, A, B); (1, B, A); (0, B, B)" />
                            </div>
                            <div className='formGroup'>
                                <label>Input:</label>
                                <input type="text" value={this.state.inputNFA} onChange={(event) => this.handleChange(event, "inputNFA")} name="input_nfa" placeholder="ex: abcde" />
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
                <div className='visualArea'>
                    {this.outputDest.map((txt, index) => {
                        if (index % 2 === 0)
                            //return <State page="nfa" stext='nfaTxt' symbol={txt}></State>
                            return <State page="circle-res" stext="circle-txt" symbol={txt}></State>
                        return <Arrow symbol={txt} />
                    })}
                </div>
            </>
        )
    }
}