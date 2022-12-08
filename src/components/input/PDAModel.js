import { parseAlphabet } from "./DFAModel";

// parse a comma-separated string into an array of PDA States
function parseStates(input) {
    input = input.replaceAll(" ","");
    if (input.length === 0) return [];
    let inputArray = input.split(',');
    let statesArray = [];
    for (let strState of inputArray) {
        statesArray.push(new State(strState));
    }
    return statesArray;
}

// (q0, a, S) -> (q1, S); (q1, e, S) -> (q2, SS); ...
function parseTransitions(input) {
    if (input.length === 0) return [];
    let transitions = input.split(';');
    let transArray = [];

    for (let i in transitions) {
        let pair = transitions[i].split(" -> ");
        if (pair.size < 1) return [];
        let src = pair[0].split(','); //(q0, a, Z)
        let dest = pair[1].split(','); // (q1, A)

        for (let j in src) {
            src[j] = src[j].replaceAll(" ", "").replaceAll("(", "").replaceAll(")", "");
        }
        dest[0] = dest[0].replaceAll(" ", "").replaceAll("(", "");
        dest[1] = dest[1].replaceAll(" ", "").replaceAll(")", "");

        //let state1 = new State(src[0]);
        //let state2 = new State(dest[0]);
        let state1 = src[0];
        let state2 = dest[0];

        transArray[i] = new Transition(state1, state2, src[1], src[2], dest[1]);
    }
    return transArray;
}

export class State {
    constructor(name) {
        this.name = name;
        this.accepting = false;
        this.connected = false;
        this.conn = [];
    }
}

export class Transition { // (source, input, stack0) -> (dest, stack1)
    constructor(source, dest, input, stack0, stack1) {
        this.input = input;
        this.source = source;
        this.dest = dest;
        this.stack0 = stack0;
        this.stack1 = stack1;
    }

    static getDest() {
        return this.dest;
    }
}

let sadFace = new State("😡");
let failTran = new Transition(null, sadFace, "", "❌", "❌");

export class PDAModel {
    constructor(all_states, initialState, inputAlphabet, pushdownAlphabet, transitions, initialStack, accepting) {
        this.states = parseStates(all_states);
        this.pdSyms = parseAlphabet(pushdownAlphabet);
        this.transitions = parseTransitions(transitions);
        this.inputSyms = parseAlphabet(inputAlphabet);
        this.initialStack = initialStack;
        this.srcToInput = new Map();
        this.srcToStack = new Map();
        this.currentState = null;
        this.currentStack = null;
        this.epsTransitions = [];
        this.stackTrace = [];
        this.acceptanceResult = null;

        if (!this.checkInputAlphabet()) {
            window.alert("Invalid input alphabet");
        } else if (!this.checkPushdownAlphabet()) {
            window.alert("Invalid pushdown alphabet");
        } else if (!this.checkInitialStack()) {
            window.alert("Invalid initial stack");
        } else if (!this.checkStates()) {
            window.alert("Invalid states");
        } else if (!this.getInitialState(initialState)) {
            window.alert("Invalid initial state");
        } else if (!this.checkAccepting(parseAlphabet(accepting))) {
            window.alert("Invalid accepting states");
        } else if (!this.checkTransitions()) {
            window.alert("Invalid transitions");
        } else {
            if (this.states.length > 1) {
                this.makeConnected(this.initialState);
                for (let s of this.states.values()) {
                    if (!s.connected) {
                        console.log("State " + s.name + " is not reachable.");
                    }
                }
            }
        }
    }

    getInitialState(name) {
        if (name === null || name === "") return false;
        if (this.states.has(name)) {
            this.initialState = this.states.get(name);
            return true;
        }
        return false;
    }

    checkInputString(input) {
        this.currentState = this.initialState;
        this.currentStack = this.initialStack;
        this.acceptanceResult = false;
        let path = []; // path contains each transition object

        for (let i = 0; i < input.length; i++) {
            this.stackTrace.push(this.currentStack);
            let sym = input.substring(i, i + 1);
            let worked = false;
            let epsTran = null;
            for (let t of this.transitions) { // First will look for non-epsilon transitions that fit, and hold onto any fitting epsilon transitions
                let currStackChar = (t.stack0 === "eps") ? "" : t.stack0;
                if ((t.source === this.currentState) && (t.input === sym) && (currStackChar === this.currentStack.substring(0, 1))) {
                    path.push(t);
                    this.currentState = t.dest;
                    if (t.stack1 !== "eps") this.currentStack = t.stack1.concat('', this.currentStack.substring(1, this.currentStack.length));
                    else this.currentStack = this.currentStack.substring(1, this.currentStack.length);
                    worked = true;
                    break;
                }
                else if ((t.input === "eps") && (t.source === this.currentState) && (t.stack0 === this.currentStack.substring(0, 1))) {
                    epsTran = t;
                }
            }
            if (!worked && epsTran !== null) { // second will use the saved epsilon transition if it exists
                path.push(epsTran);
                this.currentState = epsTran.dest;
                if (epsTran.stack1 !== "eps") this.currentStack = epsTran.stack1.concat('', this.currentStack.substring(1, this.currentStack.length));
                else this.currentStack = this.currentStack.substring(1, this.currentStack.length);
                i--;
            }
            else if (!worked) { // otherwise will fail as there is no fitting transition
                window.alert("No transition suitable");
                let failt = failTran;
                failt.src = this.currentState;
                failt.input = sym;
                path.push(failt);
                return path; 
                //return false;
            }
        }
        while (this.currentStack !== "") { // this loop uses epsilon transitions until the stack is empty or it fails to do so
            this.stackTrace.push(this.currentStack);
            let worked = false;
            for (let et of this.epsTransitions) {
                if (et.source === this.currentState && this.currentStack.substring(0, 1) === et.stack0) {
                    path.push(et);
                    this.currentState = et.dest;
                    if (et.stack1 !== "eps") this.currentStack = et.stack1.concat('', this.currentStack.substring(1, this.currentStack.length));
                    else this.currentStack = this.currentStack.substring(1, this.currentStack.length);
                    worked = true;
                }
            }
            if (!worked) {
                let failt = failTran;
                failt.src = this.currentState;
                failt.input = "ε";
                path.push(failt);
                return path;

            }
        }
        this.stackTrace.push(this.currentStack);

        if (this.currentState.accepting) {
            let accTran = new Transition(null, new State("🙂"), "✔️", "✔️", "✔️");
            path.push(accTran);
            this.acceptanceResult = true;
            return path;
        } else {
            let failt = failTran;
            failt.src = this.currentState;
            failt.input = "ε";
            path.push(failt);
            return path;
        }
    }

    checkInputAlphabet() {
        if (this.inputSyms.length === 0) return false;
        let symbols = new Set();
        for (let i of this.inputSyms) {
            if (symbols.has(i)) return false;
            symbols.add(i);
        }

        this.inputSyms = symbols;
        return true;
    }

    checkPushdownAlphabet() {
        if (this.pdSyms.length === 0) return false;

        let symbols = new Set();
        for (let i of this.pdSyms) {
            if (symbols.has(i) || this.inputSyms.has(i)) return false;
            symbols.add(i);
        }

        this.pdSyms = symbols;
        return true;
    }

    checkStates() {
        if (this.states.length === 0) return false;

        let states = new Map();
        for (let s of this.states) {
            if (states != null && (states.has(s.name) || this.pdSyms.has(s.name) || this.inputSyms.has(s.name))) return false;
            states.set(s.name, s);
        }

        this.states = states;
        return true;
    }

    checkInitialState() {
        if (this.states.has(this.initialState.name)) {
            this.initialState.connected = true;
            return true;
        }
        return false;
    }

    checkInitialStack() {
        for (let sym of this.initialStack) {
            if (!this.pdSyms.has(sym)) {
                return false;
            }
        }

        return true;
    }

    checkAccepting(accepting) {
        if (accepting.length === 0) return false;
        let acceptingArray = [];
        for (let s of accepting) {
            if (!this.states.has(s)) return false;
            let accState = this.states.get(s);
            accState.accepting = true;
            acceptingArray.push(accState);
        }
        accepting = acceptingArray;
        return true;
    }

    checkTransitions() {
        if (this.transitions.length === 0) return false;

        for (let t of this.transitions) {
            if (t.input !== "eps" && !this.inputSyms.has(t.input)) return false; // must accept empty
            if (t.stack0 !== "eps" && !this.pdSyms.has(t.stack0)) return false;
            if (!this.states.has(t.source)) return false;
            if (!this.states.has(t.dest)) return false;

            // reassign source/dest from names to actual object
            t.source = this.states.get(t.source);
            t.dest = this.states.get(t.dest);

            // check new stack:
            if (t.stack1 !== "eps") {
                for (let x in t.stack1) {
                    let c = t.stack1.substring(x, x + 1);
                    if (!this.pdSyms.has(c)) return false;
                }
            }

            if (this.srcToInput.has(t.source) && this.srcToInput.get(t.source).includes(t.input)
                && this.srcToStack.has(t.source) && this.srcToStack.get(t.source).includes(t.stack0)) {
                return false;
            }
            // doesn't have the stack symbol yet
            else if (this.srcToInput.has(t.source) && this.srcToInput.get(t.source).includes(t.input)) {
                let symList = this.srcToInput.get(t.source);
                symList.push(t.input);
                this.srcToInput.set(t.source, symList);
            }
            // doesnt have the input symbol yet
            else if (this.srcToStack.has(t.source) && this.srcToStack.get(t.source).includes(t.stack0)) {
                let symList = this.srcToStack.get(t.source);
                symList.push(t.stack0);
                this.srcToStack.set(t.source, symList);
            }
            // has the source, but neither the symbol nor the input
            else if (this.srcToStack.has(t.source) && this.srcToInput.has(t.source)) {
                let inList = this.srcToInput.get(t.source);
                inList.push(t.input);
                this.srcToInput.set(t.source, inList);
                let stackList = this.srcToStack.get(t.source);
                stackList.push(t.stack0);
                this.srcToStack.set(t.source, inList);
            }
            // state has yet to be recorded as a source
            else {
                let inList = new Array(t.input);
                let stList = new Array(t.stack0);
                this.srcToInput.set(t.source, inList);
                this.srcToStack.set(t.source, stList);
            }

            if (!t.source.conn.includes(t.dest) && t.source.name !== t.dest.name) {
                t.source.conn.push(t.dest);
                t.source.connected = true;
                if (t.source.name === this.initialState.name) this.initialState = t.source;
            }

            // Adding to list of Transitions with eps as input
            if (t.input === "eps") {
                this.epsTransitions.push(t);
            }
        }
        return true;
    }

    makeConnected(start) {
        for (let s of start.conn) {
            if (!s.connected) {
                s.connected = true;
                this.makeConnected(s);
            }
        }
    }
}