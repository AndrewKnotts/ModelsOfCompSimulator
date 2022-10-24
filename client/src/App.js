import './App.css';
import { Routes, Route } from "react-router-dom";
import Turing from './pages/Turing';
import DFA from './pages/DFA';
import NFA from './pages/NFA';
import PDA from './pages/PDA';
import InputArea from './components/input/InputArea';
//import Graph from './components/graph/Graph';
import { Component } from 'react';
import { page } from './components/navbar/Navbar';
import { DFAModel, Transition } from './components/input/DFAModel.js';
import { NFAModel } from './components/input/NFAModel.js';
import State from './components/state/State';
import Arrow from './components/arrow/arrow';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class App extends Component {

  outputDest = [];
  outputSymbols = [];

  constructor(props) {
    super(props);
    // set the states to their current values in local storage
    this.state = {
      alphabet: localStorage.getItem('alphabet'),
      states: localStorage.getItem('states'),
      startingState: localStorage.getItem('startingState'),
      acceptingStates: localStorage.getItem('acceptingStates'),
      transitions: localStorage.getItem('transitions'),
      input: localStorage.getItem('input'),
      modelStates: [],
      modelTransitions: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  _showMessage = (bool) => {
    this.setState({
      showMessage: bool
    })
  }

  // Update the states as keys are pressed
  handleChange(evt, field) {
    this.setState({ [field]: evt.target.value });
    localStorage.setItem([field], evt.target.value);
    /*alphabet = this.state.alphabet;
    states = this.state.states;
    startingState = this.state.startingState;
    acceptingStates = this.state.acceptingStates;
    transitions = this.state.transitions;
    input = this.state.input;*/
  }

  // On submit, run the correct model simulation
  handleSubmit(event) {

    if (page === "DFA") {
      console.log("Test1");
      let new_model = new DFAModel(this.state.startingState, this.state.acceptingStates, this.state.states, this.state.alphabet, this.state.transitions);
      console.log(new_model.checkInputString(this.state.input));
      let output = new_model.checkInputString(this.state.input);
      this.setState({
        modelStates: output[0].dest.name,
        modelTransitions: output[0].symbol
      });
      this.outputDest = [];
      this.outputSymbols = [];
      this.outputDest.push(output[0].source.name)
      for (let i = 0; i < output.length; i++) {
        this.outputDest.push(output[i].symbol);
        this.outputDest.push(output[i].dest.name);
      }
      console.log(this.outputDest, this.outputSymbols);
      //this._showMessage.bind(null, true)

    }
    else if (page === "NFA") {
      console.log("Test2");
      console.log(this.state.alphabet);
      let nfa_model = new NFAModel(this.state.startingState, this.state.acceptingStates, this.state.states,
        this.state.alphabet, this.state.transitions);
      let output = nfa_model.checkInputString(this.state.input);
      console.log(output);
    }
    else if (page === "PDA") {
      console.log("Test3");
    }
    else if (page === "TuringMachine") {
      console.log("Test4");
    }

    //event.preventDefault()

  }

  render() {

    return (
      <>
        <div className='contain'>
          <Routes>
            <Route path="/" element={<DFA />} />
            <Route path="/DFA" element={<DFA />} />
            <Route path="/NFA" element={<NFA />} />
            <Route path="/PDA" element={<PDA />} />
            <Route path="/TuringMachine" element={<Turing />} />
          </Routes>
          <div>
            <form onSubmit={this.handleSubmit} className="input" id="form" >
              <div className='formGroup'>
                <label>Alphabet:</label>
                <input type="text" value={this.state.alphabet} onChange={(event) => this.handleChange(event, "alphabet")} name="alphabet" placeholder='ex: a,b,c,d,e' />

              </div>
              <div className='formGroup'>
                <label>States:</label>
                <input type="text" value={this.state.states} onChange={(event) => this.handleChange(event, "states")} name="states" placeholder='ex: A, B, C' />
              </div>
              <div className='formGroup'>
                <label>Starting State:</label>
                <input type="text" value={this.state.startingState} onChange={(event) => this.handleChange(event, "startingState")} name="startingState" placeholder='ex: A' />
              </div>
              <div className='formGroup'>
                <label>Accepting States:</label>
                <input type="text" value={this.state.acceptingStates} onChange={(event) => this.handleChange(event, "acceptingStates")} name="acceptingStates" placeholder="ex: C, B" />
              </div>
              <div className='formGroup'>
                <label>Transitions:</label>
                <input type="text" value={this.state.transitions} onChange={(event) => this.handleChange(event, "transitions")} name="transitions" placeholder="ex: (a, A, B); (b, B, C)" />
              </div>
              <div className='formGroup'>
                <label>Input:</label>
                <input type="text" value={this.state.input} onChange={(event) => this.handleChange(event, "input")} name="input" placeholder="ex: abcde" />
              </div>
              <div className='btnGroup'>
                <input onClick={(event) => this.handleSubmit(event)} type="button" value="Run" />
              </div>
            </form>
          </div>

        </div>
        <div className='visualArea'>
          {this.outputDest.map((txt, index) => {
            if (index % 2 == 0)
              return <State symbol={txt}></State>
            return <Arrow symbol={txt} />
          })}
        </div>

      </>

    )

  }
}
//          


