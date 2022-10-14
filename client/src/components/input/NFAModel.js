import { Transition, parseAlphabet, parseTransition } from "./DFAModel";

export class Pair {
    constructor(left, right) {
        this.left = left;
        this.right = right;
    }

    equalTo(other) {
        if ((this.left == other.left) && (this.right == other.right)) return true;
        return false;
    }
}

export class NFAState {
    constructor(name) {
        this.name = name;
        this.accepting = false;
        this.connected = false;
        this.conn = [];
        this.transitions = [];
    }

    addTrans(symbol, dest) {
        this.transitions.push(new Pair(symbol, dest));
    }

    getTrans() {
        return this.transitions;
    }
}

export class NFAModel {
    constructor(initial, accepting, all_states, alphabet, transitions) {
        console.log("NFA Model:");
        this.all = parseNFAStates(all_states);
        this.initial = null;
        this.accepting = [];
        this.alphabet = parseAlphabet(alphabet);
        this.transitions = parseTransition(transitions);
        this.current = null;
        this.syms = null;
        this.states = null;
        //this.ts = new Map();

        console.log("initial: ", initial);
        console.log("accepting: ", accepting);
        console.log("states: ", all_states);
        console.log("alphabet: ", alphabet);
        console.log("transitions: ", transitions);

        // check components and alert if error
        if (!this.checkAlphabet()) window.alert("Invalid Alphabet");
        if (!this.checkStates()) window.alert("Invalid states");
        if (!this.checkInitial(initial)) window.alert("Invalid initial");
        if (!this.checkAccepting(accepting)) window.alert("Invalid accepting");
        if (!this.checkTransitions()) window.alert("Invalid transitions");
        
        // make Connected for all and check
        this.makeConnected(this.initial);
        for (let i in this.all) {
            let s = this.all[i];
            if (!s.connected) {
                console.log("State " + s.name + " is not reachable.");
            }
        }
    }

    // call checkPath
    checkInputString(input) {
        console.log(input);
        return this.checkPath(input, this.initial);
    }

    // recursively check path for acceptance
    checkPath(input, current) {
        console.log("checkPath");
    }

    // Checks alphabet for repeated symbols or being empty
    checkAlphabet() {
        if (this.alphabet.size === 0) return false;

        let symbols = new Set();
        symbols.add("eps");
        for (let i in this.alphabet) {
            let s = this.alphabet[i];
            if (symbols.has(s)) return false;
            symbols.add(s);
        }

        this.syms = symbols;
        return true;
    }

    // Checks states for repeats or conflicts with alphabet
    checkStates() {
        if (this.all.size === 0) return false;

        let states = new Map();
        for (let i in this.all) {
            let s = this.all[i];
            if (states.has(s.name) || this.syms.has(s.name)) return false;
            states.set(s.name, s);
        }

        this.states = states;
        return true;
    }

    // Checks that initial state is a valid state and assigns it
    checkInitial(initial) {
        if (this.states.has(initial)) {
            this.initial = this.states.get(initial);
            this.initial.connected = true;
            return true;
        }
        return false;
    }

    // Checks that accepting states are present and valid
    checkAccepting(accepting) {
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

    // Checks that transitions are valid symbols/states/states
    // Sets up connections to check all states are connected
    checkTransitions() {
        if (this.transitions.size === 0) return false;

        for (let i in this.transitions) {
            let t = this.transitions[i];
            if (!this.syms.has(t.symbol)) return false;
            if (!this.states.has(t.source)) return false;
            if (!this.states.has(t.dest)) return false;

            t.source = this.states.get(t.source);
            t.dest = this.states.get(t.dest);

            let src_state = t.source;
            for (let j in src_state.getTrans()) {
                let ts = src_state.getTrans()[j];
                if ((ts.left == t.symbol) && (ts.right == t.dest)) {
                    // duplicate transition
                    return false;
                }
            }
            src_state.addTrans(t.symbol, t.end);

            // add for connection check
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

// parse states string input into NFAState array
export function parseNFAStates(input) {
    let input_array = input.split(',');
    let states_array = [];
    for (let i in input_array) {
        let str_state = input_array[i];
        states_array[i] = new NFAState(str_state.replace(" ", ""));
    }
    return states_array;
}
