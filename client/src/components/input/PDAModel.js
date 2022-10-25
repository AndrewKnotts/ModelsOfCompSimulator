var inputAlphabet = ""
var pushdownAlphabet = ""
var states = ""
var transitions = ""
var stack = ""
var initialState = ""
var final = ""
var model = ""
var initialStack = ""
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
    let pushdownAlphabet_array = input.split(',');
    for (let i in pushdownAlphabet_array) {
        let alpha = pushdownAlphabet_array[i];
        pushdownAlphabet_array[i] = alpha.replace(" ", "");
    }
    return pushdownAlphabet_array;
}

// (q0, a, S) -> (q1, S); (q1, e, S) -> (q2, SS); ...
function parseTransitions(input) {
    let transitions = input.split(',');
    for (let i in transitions) {
        let pair = transitions.split("->");
        let src = pair[0].split(',');
        let dest = pair[1].split(',');

        for (let j in src) {
            src[j] = src[j].replace(" ", "").replace("(", "").replace(")", "");
        }
        dest[0] = dest[0].replace(" " , "").replace("(", "");
        dest[1] = dest[1].replace(" ", "").replace(")", "");

        transArray = new Transition(src[0], dest[0], src[1], src[2], dest[1]);
    }
}

class State { // same as DFA
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

export class PDAModel {
    constructor(all_states, initialState, inputAlphabet, pushdownAlphabet, transitions, initialStack, final) {
        this.all = all_states;
        this.initialState = initialState;
        this.pushdownAlphabet = pushdownAlphabet;
        this.transitions = transitions;
        this.inputAlphabet = inputAlphabet;
        this.initialStack = initialStack;
        this.final = final;
        this.inputSyms = null;
        this.pdSyms = null;
        this.ts = new Map();
        this.current = null;

    }

    checkInputString(input) {
        
    }

    checkInputAlphabet() {
        if (this.inputAlphabet.size === 0) return false;

        let symbols = new Set();
        for (let s in this.inputAlphabet) {
            if (symbols.has(s)) return false;
            symbols.add(s);
        }

        this.inputSyms = symbols;
        return true;
    }
    
    checkPushdownAlphabet() {
        if (this.pushdownAlphabet.size == 0) return false;

        let symbols = new Set();
        for (let s in this.pushdownAlphabet) {
            if (symbols.has(s) || this.inputSyms.has(s)) return false;
            symbols.add(s);
        }

        this.pdSyms = symbols;
        return true;
    }

    checkStates() {
        if (this.states.size == 0) return false;

        let States = new Map();
        for (let i in this.all) {
            let s = this.all[i];
            if (states.has(s.name) || this.pdSyms.has(s.name) || this.inputSyms.has(s.name)) return false;
            states.set(s.name, s);
        }

        this.states = states;
        return true;
    }

    checkInitialState() {
        if (this.states.has(initial)) {
            this.initial = this.states.get(initial);
            this.initial.connected = true;
            return true;
        }
        return false;
    }

    checkInitialStack() {
        if (this.pdSyms.has(initialStack)) {
            this.initialStack = this.pdSyms.get(initialStack)
            return true;
        }
        return false;
    }

    checkAccepting() {
        let acc_array = parseAlphabet(accepting);
        if (acc_array.size === 0) return false;

        for (let i in acc_array) {
            let acc_name = acc_array[i];
            if (!this.states.has(acc_name)) {
                return false;
            }
            this.states.get(acc_name).accepting = true;
            this.accepting.push(this.states.get(acc_name));
        }
        return true;
    }

    checkTransitions() {
        if (this.transitions.size === 0) return false;

        for (let i in this.transitions) {
            let t = this.transitions[i];
            if (!this.inputSyms.has(t.input)) return false;
            if (!this.pdSyms.has(t.stack0)) return false;
            if (!this.pdSyms.has(t.stack1)) return false;
            if (!this.states.has(t.source)) return false;
            if (!this.states.has(t.dest)) return false;

            t.source = this.states.get(t.source);
            t.dest = this.states.get(t.dest);

            if (this.ts.has(t.source) && this.ts.get(t.source).includes(t.input) 
                && this.ts.get(t.source).includes(t.stack0)) {
                    return false;
            }
            else if (){

            }
        }
    }
}


