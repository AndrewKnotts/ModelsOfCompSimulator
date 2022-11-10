var inputAlphabet = ""
var pushdownAlphabet = ""
var states = ""
var transitions = ""
var stack = ""
var initialState = ""
var final = ""
var model = ""
var initialStack = "" // leftmost char will be top of stack
var all = ""


export function parseStates(input) {
    input = input.toString().replaceAll(" ", "");

    let input_array = input.split(',');
    //let input_array = input.split(',');
    let states_array = [];
    for (let i in input_array) {
        //let str_state = input_array[i].replace(" ", "");
        let str_state = input_array[i];
        states_array[i] = new State(str_state);
    }
    return states_array;
}

export function parseInputAlphabet(input) {
    let inputAlphabet_array = input.toString().split(',');
    for (let i in inputAlphabet_array) {
        let alpha = inputAlphabet_array[i];
        inputAlphabet_array[i] = alpha.replace(" ", "");
    }
    return inputAlphabet_array;
}

export function parsePushdownAlphabet(input) {
    let pushdownAlphabet_array = input.toString().split(',');
    for (let i in pushdownAlphabet_array) {
        let alpha = pushdownAlphabet_array[i];
        pushdownAlphabet_array[i] = alpha.replace(" ", "");
    }
    return pushdownAlphabet_array;
}

// (q0, a, S) -> (q1, S); (q1, e, S) -> (q2, SS); ...
export function parseTransitions(input) {
    let transitions = input.split(';');
    let transArray = [];
    for (let i in transitions) {
        let pair = transitions[i].split(" -> ");
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

export class State { // same as DFA
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
        this.pushdownAlphabet = parsePushdownAlphabet(pushdownAlphabet);
        this.transitions = transitions;
        this.inputAlphabet = inputAlphabet;
        this.initialStack = initialStack;
        this.final = final;
        this.inputSyms = null;
        this.pdSyms = null;
        //this.ts = new Map();
        this.srcToInput = new Map();
        this.srcToStack = new Map();
        this.currentState = null;
        this.currentStack = null;

        if (!this.checkInputAlphabet()) console.log("Invalid Input Alphabet");
        //console.log(this.pushdownAlphabet.size);
        if (!this.checkPushdownAlphabet()) console.log("Invalid Pushdown alphabet");
        //console.log("here");
        if (!this.checkStates()) console.log("Invalid states");
        if (!this.checkInitialStack()) console.log("Invalid Initial Stack");
        if (!this.checkInitialState()) console.log("Invalid initial state");
        if (!this.checkAccepting()) console.log("Invalid Accepting array");
        if (!this.checkTransitions()) console.log("Invalid transitions");
        //if (!this.checkDeterministic()) console.log("Non-deterministic");
        //else console.log("Deterministic");

        this.makeConnected(this.initialState);
        for (let i in this.all) {
            let s = this.all[i];
            if (!s.connected) {
                console.log("State " + s.name + " is not reachable.");
            }
        }
    }

    checkInputString(input) {
        this.currentState = this.initialState;
        this.currentStack = this.initialStack;
        let path = []; // path is gonna have each transition object
        for (let i = 0; i < input.length; i++) {
            let sym = input.substring(i, i + 1);
            let worked = false;
            for (let j in this.transitions) {
                let t = this.transitions[j];
                if ((t.source === this.currentState) && (t.input === sym) && (t.stack0 === this.currentStack.substring(0, 1))) {
                    path.push(t);
                    this.currentState = t.dest;
                    if (t.stack1 != "eps") this.currentStack = t.stack1.concat('', this.currentStack.substring(1, this.currentStack.length));
                    worked = true;
                    break;
                }
            }
            if (!worked) return false;
        }

        for (let i in this.accepting) {
            let s = this.accepting[i];
            if (s === this.currentState) return path;
        }
        return true;
    }

    /*
    checkDeterministic() {
        let symPairs = new Set();
        for (let i in this.transitions) {
            let t = this.transitions[i]; 
            let symPair = [t.input, t.stack0];
            for (let x in symPairs) {
                let j = symPairs[x];
                if (t.input == j[0] && t.stack0 === j[1]) return false;
            }
            symPairs.add(symPair);
        }
        return true; 
    }
    */

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
        //console.log(this.pdSyms.size());
        return true;
    }

    checkStates() {
        if (this.all.size == 0) return false;

        let states = new Map();
        for (let i in this.all) {
            let s = this.all[i];
            if (states.has(s.name) || this.pdSyms.has(s.name) || this.inputSyms.has(s.name)) return false;
            states.set(s.name, s);
        }

        this.states = states;
        return true;
    }

    checkInitialState() {
        if (this.states.has(this.initialState.name)) {
            //this.initialState = this.states.has(initialState.name);
            this.initialState.connected = true;
            return true;
        }
        return false;
    }

    checkInitialStack() {
        if (this.pdSyms.has(this.initialStack)) {
            //this.initialStack = this.pdSyms.get(initialStack)
            return true;
        }
        return false;
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
            //if (!this.all.includes(t.source)) return false;
            //if (!this.all.includes(t.dest)) return false;

            // check new stack:
            if (t.stack1 != "eps") {
                for (let x in t.stack1) {
                    let c = t.stack1.substring(x, x + 1);
                    if (!this.pdSyms.has(c)) return false;
                }
            }


            //t.source = this.states.get(t.source);
            //t.dest = this.states.get(t.dest);

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

            if (!t.source.conn.includes(t.dest)) {
                t.source.conn.push(t.dest);
                if (t.source.name === this.initialState.name) this.initialState = t.source;
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

// *TESTS*

/*
// Non-deterministic
let q0 = new State("q0");
let q1 = new State("q1");
let t1 = new Transition(q0, q0, "a", "Z", "AZ"); // (q0, a, Z) -> (q0,A)
let t2 = new Transition(q0, q0, "a", "A", "AA"); // (q0, a, A) -> (q0, AA)
let t3 = new Transition(q0, q1, "b", "A", ""); // (q0, b, A) -> (q1, eps)
let t4 = new Transition(q1, q1, "b", "A", ""); // (q1. b. A) -> (q1, eps)
let t5 = new Transition(q1, q1, "", "Z", ""); // (q1, eps, Z) -> (q1, eps)
var test_states = new Array(q0, q1);
var test_inAlphabet = new Array("a", "b"); //["a", "b"];
var test_stAlphabet = new Array("A", "Z"); //["A", "Z"];
//console.log(test_stAlphabet.length);
let test_accepting = [q1];
let test_transitions = [t1, t2, t3, t4, t5];
let testPDA = new PDAModel(test_states, q0, test_inAlphabet, test_stAlphabet, test_transitions, "Z", q1);
console.log(testPDA.checkInputString("aaabbb"));
*/
let statebox = "q0, q1";
let _transitions = "(q0, a, Z) -> (q0,A); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)";
let startstatebox = "q0";
let startStack = "Z";
let inputbox = "a, b";
let stackBox = "A, Z";
let finalbox = "q1";
let inString = "aaabbb";

let _states = parseStates(statebox);
let _inAlph = parseInputAlphabet(inputbox);
let _pdAlph = parsePushdownAlphabet(stackBox);
let _acc = parseStates(finalbox);
let _trans = parseTransitions(_transitions);
let _initSt = new State(startstatebox);

let _testPDA = new PDAModel(_states, _initSt, _inAlph, _pdAlph, _trans, startStack, _acc);

console.log(_testPDA.checkInputString(inString));
console.log(_testPDA.checkPushdownAlphabet(_pdAlph));


//console.log(t1.input);
//let transArr = parseTransitions("(q0, a, S) -> (q1, S); (q1, e, S) -> (q2, SS)");
//console.log(transArr[0].input);
//console.log(transArr[1].stack1);