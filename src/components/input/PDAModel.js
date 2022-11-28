var states = ""
var initialStack = "" // leftmost char will be top of stack
var all = ""

function parseStates(input) {
    let input_array = input.split(',');
    let states_array = [];
    for (let i in input_array) {
        let str_state = input_array[i];
        states_array[i] = new State(str_state.replace(" ", ""));
    }
    return states_array;
}

function parseInputAlphabet(input) {
    let inputAlphabet_array = input.split(',');
    for (let i in inputAlphabet_array) {
        let alpha = inputAlphabet_array[i];
        inputAlphabet_array[i] = alpha.replace(" ", "");
    }
    return inputAlphabet_array;
}

function parsePushdownAlphabet(input) {
    console.log("parsing pushdown alphabet: " + input);
    let pushdownAlphabet_array = input.split(',');
    for (let i in pushdownAlphabet_array) {
        let alpha = pushdownAlphabet_array[i];
        pushdownAlphabet_array[i] = alpha.replace(" ", "");
    }
    return pushdownAlphabet_array;
}

// (q0, a, S) -> (q1, S); (q1, e, S) -> (q2, SS); ...
function parseTransitions(input) {
    let transitions = input.split(';');
    let transArray = [];

    for (let i in transitions) {
        let pair = transitions[i].split(" -> ");
        if (pair.size < 1) return [];
        let src = pair[0].split(','); //(q0, a, Z)
        let dest = pair[1].split(','); // (q1, A)

        for (let j in src) {
            src[j] = src[j].replace(" ", "").replace("(", "").replace(")", "");
        }
        dest[0] = dest[0].replace(" ", "").replace("(", "");
        dest[1] = dest[1].replace(" ", "").replace(")", "");

        let state1 = new State(src[0]);
        let state2 = new State(dest[0]);

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
        this.all = parseStates(all_states);
        this.pushdownAlphabet = parsePushdownAlphabet(pushdownAlphabet);
        this.transitions = parseTransitions(transitions);
        this.inputAlphabet = parseInputAlphabet(inputAlphabet);
        this.initialStack = initialStack;
        this.accepting = parseStates(accepting);
        this.inputSyms = null;
        this.pdSyms = null;
        this.srcToInput = new Map();
        this.srcToStack = new Map();
        this.currentState = null;
        this.currentStack = null;
        this.epsTransitions = [];
        this.stackTrace = [];
        this.acceptanceResult = null;

        if (!this.checkInputAlphabet()) window.alert("Invalid Input Alphabet");
        if (!this.checkPushdownAlphabet()) window.alert("Invalid Pushdown alphabet: " + pushdownAlphabet);
        if (!this.checkInitialStack()) window.alert("Invalid Initial Stack");
        if (!this.checkStates()) window.alert("Invalid states");
        if (!this.getInitialState(initialState)) window.alert("Invalid Initial State");
        if (!this.checkAccepting()) window.alert("Invalid Accepting array");
        if (!this.checkTransitions()) window.alert("Invalid transitions");

        if (states.length > 1) {
            this.makeConnected(this.initialState);
            for (let i in this.all) {
                let s = this.all[i];
                if (!s.connected) {
                    console.log("State " + s.name + " is not reachable.");
                }
            }
        }
    }

    getInitialState(name) {
        if (name === null || name === "") return false;
        for (let i in this.all) {
            let st = this.all[i];
            if (st.name === name) {
                this.initialState = st;
                return true;
            }
        }
        return false;
    }

    checkInputString(input) {
        this.currentState = this.initialState;
        this.currentStack = this.initialStack;
        this.acceptanceResult = false;
        let path = []; // path is gonna have each transition object

        for (let i = 0; i < input.length; i++) {
            this.stackTrace.push(this.currentStack);
            let sym = input.substring(i, i + 1);
            let worked = false;
            let epsTran = null;
            for (let j in this.transitions) { // First will look for non-epsilon transitions that fit, and hold onto any fitting epsilon transitions
                let t = this.transitions[j];
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
            if (!worked && epsTran != null) { // second will use the saved epsilon transition if it exists
                path.push(epsTran);
                this.currentState = epsTran.dest;
                if (epsTran.stack1 != "eps") this.currentStack = epsTran.stack1.concat('', this.currentStack.substring(1, this.currentStack.length));
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
        while (this.currentStack != "") { // this loop uses epsilon transitions until the stack is empty or it fails to do so
            this.stackTrace.push(this.currentStack);
            let worked = false;
            for (let j in this.epsTransitions) {
                let et = this.epsTransitions[j];
                if (et.source === this.currentState && this.currentStack.substring(0, 1) === et.stack0) {
                    path.push(et);
                    this.currentState = et.dest;
                    if (et.stack1 != "eps") this.currentStack = et.stack1.concat('', this.currentStack.substring(1, this.currentStack.length));
                    else this.currentStack = this.currentStack.substring(1, this.currentStack.length);
                    worked = true;
                }
            }
            if (!worked) {
                window.alert("non-empty stack");
                let failt = failTran;
                failt.src = this.currentState;
                failt.input = "ε";
                path.push(failt);
                return false;

            }
        }
        this.stackTrace.push(this.currentStack);

        let endState = false;
        for (let i in this.accepting) {
            let s = this.accepting[i];
            if (s.name === this.currentState.name) {
                endState = true;
                break;
            }
        }

        if (endState) {
            this.acceptanceResult = true;
            return path;
        }
        else {
            window.alert("Not in end state");
            let failt = failTran;
            failt.src = this.currentState;
            failt.input = "ε";
            path.push(failt);
            return false;
        }
    }

    checkInputAlphabet() {
        if (this.inputAlphabet.size === 0) return false;
        let symbols = new Set();
        for (let s in this.inputAlphabet) {
            let i = this.inputAlphabet[s];
            if (symbols.has(i)) return false;
            symbols.add(i);
        }

        this.inputSyms = symbols;
        return true;
    }

    checkPushdownAlphabet() {
        if (this.pushdownAlphabet.size == 0) return false;

        let symbols = new Set();
        for (let s in this.pushdownAlphabet) {
            let i = this.pushdownAlphabet[s];
            if (symbols.has(i) || this.inputSyms.has(i)) return false;
            symbols.add(i);
        }

        this.pdSyms = symbols;
        return true;
    }

    checkStates() {
        if (this.all.size == 0) return false;

        let states = new Map();
        for (let i in this.all) {
            let s = this.all[i];
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
        console.log(this.initialStack);
        for (let i in initialStack) {
            let sym = initialStack.substring(i, i + 1);
            if (!this.pdSyms.has(sym)) {
                return false
            }
        }

        return true;
    }

    checkAccepting() {
        for (let i in all) {
            let s = all[i];
            if (!this.states.has(s)) return false;
            s.accepting = true;
            this.accepting.push(s);
        }
        return true;

    }

    checkTransitions() {
        if (this.transitions.size === 0) return false;

        for (let i in this.transitions) {
            let t = this.transitions[i];
            if (t.input != "eps" && !this.inputSyms.has(t.input)) return false; // must accept empty
            if (t.stack0 != "eps" && !this.pdSyms.has(t.stack0)) return false;
            let st = false;
            let end = false;
            for (let x in this.all) {
                let cc = this.all[x];
                if (st && end) break;
                if (cc.name === t.source.name) {
                    st = true;
                    t.source = cc;
                }
                if (cc.name === t.dest.name) {
                    end = true;
                    t.dest = cc;
                }

            }
            if (!(st && end)) return false;

            // check new stack:
            if (t.stack1 != "eps") {
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

            if (!t.source.conn.includes(t.dest) && t.source.name != t.dest.name) {
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
        for (let i in start.conn) {
            let s = start.conn[i];
            if (!s.connected) {
                s.connected = true;
                this.makeConnected(s);
            }
        }
    }
}