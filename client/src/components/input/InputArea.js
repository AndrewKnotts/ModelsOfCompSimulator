import React, { Component } from 'react'
import './InputArea.css'
import { page } from '../navbar/Navbar.js';

var alphabet = ""
var states = ""
var startingState = ""
var acceptingStates = ""
var transitions = ""
var input = ""

class State {
    constructor(name) {
      this.name = name;
      this.accepting = false;
      this.connected = false;
      this.conn = [];
    }
  }
  
  class Transition {
    constructor(symbol, src, dest) {
      this.symbol = symbol;
      this.source = src;
      this.dest = dest;
    }
  }
  
  class DFAModel {
    constructor(initial, accepting, all_states, alphabet, transitions) {
      this.initial = initial;
      this.accepting = accepting;
      this.all = all_states;
      this.alphabet = alphabet;
      this.transitions = transitions;
      this.current = null;
      this.syms = null;
      this.states = null;
      this.ts = new Map();
      console.log("initial: ", initial);
      console.log("accepting: ", accepting);
      console.log("states: ", all_states);
      console.log("alphabet: ", alphabet);
      console.log("transitions: ", transitions);
  
      // check components
      if (!this.checkAlphabet()) console.log("Invalid Alphabet");
      if (!this.checkStates()) console.log("Invalid states");
      if (!this.checkInitial()) console.log("Invalid initial");
      if (!this.checkAccepting()) console.log("Invalid accepting");
      if (!this.checkTransitions()) console.log("Invalid transitions");
  
      // make Connected for all and check
      this.makeConnected(this.initial);
      for (let i in this.all) {
        let s = this.all[i];
        if (!s.connected) {
          console.log("State " + s.name + " is not reachable.");
        }
      }
    }
  
    // Takes input string and runs it through model, returning list of transitions to acceptance or null for failure
    checkInputString(input) {
      console.log(input);
      // Set current state to initial and create new path starting from initial
      this.current = this.initial;
      let path = [];
      
      // Iterate through each char in string, check transitions for match, update to new state and repeat when found
      for (let i=0; i < input.length; i++) {
        let str = input.substring(i, i+1);
        let worked = false;;
        for (let i in this.transitions) {
          let t = this.transitions[i];
          if ((t.source == this.current) && (t.symbol == str)) {
            path.push(t);
            this.current = t.dest;
            worked = true;
            break;
          }
        }
        if (!worked) return null; 
      }
  
      // Once finished with string, check if end state is accepting and return if so
      for (let i in this.accepting) {
        let s = this.accepting[i];
        if (s == this.current) return path; 
      }
      return null;
    }
  
    // Checks alphabet for repeated symbols or being empty
    checkAlphabet() {
      if (this.alphabet.size == 0) return false;
  
      let symbols = new Set();
      for (let s in this.alphabet) {
        if (symbols.has(s)) return false;
        symbols.add(s);
      }
  
      this.syms = symbols;
      return true;
    }
  
    // Checks states for repeats or conflicts with alphabet
    checkStates() {
      if (this.all.size == 0) return false;
  
      let states = new Set();
      for (let i in this.all) {
        let s = this.all[i];
        if (states.has(s.name) || this.syms.has(s.name)) return false;
        states.add(s);
      }
  
      this.states = states;
      return true;
    }
  
    // Checks that initial state is a valid state
    checkInitial() {
      if (this.states.has(this.initial)) {
        this.initial.connected = true;
        return true;
      }
      return false;
    }
  
    // Checks that accepting states are present and valid
    checkAccepting() {
      if (this.accepting.size == 0) return false;
  
      for (let i in this.accepting) {
        let s = this.accepting[i];
        if (! (this.states.has(s))) return false;
        s.accepting = true;
      }
      return true;
    }
  
    // Checks that transitions are valid symbols/states/states
    // Sets up connections to check all states are connected
    checkTransitions() {
      if (this.transitions.size == 0) return false;
  
      for (let i in this.transitions) {
        let t = this.transitions[i];
        if (!this.syms.has(t.symbol)) return false;
        if (!this.states.has(t.source)) return false;
        if (!this.states.has(t.dest)) return false;
  
        if (this.ts.has(t.source) && this.ts.get(t.source).includes(t.symbol)) {
          return false;
        } else if (this.ts.has(t.source)) {
          let sym_list = this.ts.get(t.source);
          sym_list.push(t.symbol);
          this.ts.set(t.source, sym_list);
        } else {
          let new_list = new Array(t.symbol);
          this.ts.set(t.source, new_list);
        }
  
        if (!t.source.conn.includes(t.dest)) {
          t.source.conn.push(t.dest);
        }
      }
      return true;
    }
  
    // uses conn lists in states to set connected to bool value
    makeConnected(start) {
      for (let i in start.conn) {
        let s = start.conn[i];
        if (!s.connected) {
          s.connected = true;
          this.makeConnected(s);
        }
      }
    }
  }
  
  // CONSOLE TESTS
  let testA = new State("A");
  let testB = new State("B");
  let t1 = new Transition("0", testA, testA);
  let t2 = new Transition("1", testA, testB);
  let t3 = new Transition("1", testB, testA);
  let t4 = new Transition("0", testB, testB);
  
  let test_states = [testA, testB];
  let test_alphabet = ["0", "1"];
  let test_accepting = [testB];
  let test_transitions = [t1,t2,t3,t4];
  
  let test_model = new DFAModel(testA, test_accepting, test_states, test_alphabet, test_transitions);
  
  console.log(test_model.checkInputString("10101"));
  console.log(test_model.checkInputString("1"));
  console.log(test_model.checkInputString("1011"));
  console.log(test_model.checkInputString("10000"));
  
  console.log(test_model.checkInputString("11"));
  console.log(test_model.checkInputString("000101"));
  console.log(test_model.checkInputString("0"));
  console.log(test_model.checkInputString(""));
  console.log(test_model.checkInputString("1001101"));

export default class InputArea extends Component {
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
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Update the states as keys are pressed
    handleChange(evt, field) {
        this.setState({ [field]: evt.target.value });
        localStorage.setItem([field], evt.target.value);
        alphabet = this.state.alphabet;
        states = this.state.states;
        startingState = this.state.startingState;
        acceptingStates = this.state.acceptingStates;
        transitions = this.state.transitions;
        input = this.state.input;
    }

    // On submit, run the correct model simulation
    handleSubmit(event) {

        if (page === "DFA") {
            console.log("Test1");
            console.log(typeof(acceptingState));
            let new_model = new DFAModel(startingState, acceptingStates, states, alphabet, transitions);
        }
        else if (page === "NFA") {
            console.log("Test2");
        }
        else if (page === "PDA") {
            console.log("Test3");
        }
        else if (page === "TuringMachine") {
            console.log("Test4");
        }

        event.preventDefault()

    }

    render() {


        return (
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
                        <input type="text" value={this.state.transitions} onChange={(event) => this.handleChange(event, "transitions")} name="transitions" placeholder="ex: {(a, A, B); (b, B, C)}" />
                    </div>
                    <div className='formGroup'>
                        <label>Input:</label>
                        <input type="text" value={this.state.input} onChange={(event) => this.handleChange(event, "input")} name="input" placeholder="ex: abcde" />
                    </div>
                    <div className='btnGroup'>
                        <input onClick={(event) => this.handleSubmit(event)} type="submit" value="Run" />
                    </div>
                </form>
            </div>
        )
    }
}

export { alphabet, states, startingState, acceptingStates, transitions, input }