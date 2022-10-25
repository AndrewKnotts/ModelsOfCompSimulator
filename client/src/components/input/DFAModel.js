var alphabet = ""
var states = ""
var startingState = ""
var acceptingStates = ""
var transitions = ""
var input = ""
var model = null;

class State {
    constructor(name) {
        this.name = name;
        this.accepting = false;
        this.connected = false;
        this.conn = [];
    }
}

export class Transition {
    constructor(symbol, src, dest) {
        this.symbol = symbol;
        this.source = src;
        this.dest = dest;
    }

    static getDest() {
        return this.dest;
    }
}

export class DFAModel {
    constructor(initial, accepting, all_states, alphabet, transitions) {
        this.all = parseStates(all_states);
        this.initial = null;
        this.accepting = [];
        this.alphabet = parseAlphabet(alphabet);
        this.transitions = parseTransition(transitions);
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
        if (!this.checkInitial(initial)) console.log("Invalid initial");
        if (!this.checkAccepting(accepting)) console.log("Invalid accepting");
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
        //console.log(input);
        // Set current state to initial and create new path starting from initial
        this.current = this.initial;
        let path = [];

        // Iterate through each char in string, check transitions for match, update to new state and repeat when found
        for (let i = 0; i < input.length; i++) {
            let str = input.substring(i, i + 1);
            let worked = false;;
            for (let i in this.transitions) {
                let t = this.transitions[i];
                if ((t.source === this.current) && (t.symbol === str)) {
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
            if (s === this.current) return path;
        }
        return null;
    }

    // Checks alphabet for repeated symbols or being empty
    checkAlphabet() {
        if (this.alphabet.size === 0) return false;

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
