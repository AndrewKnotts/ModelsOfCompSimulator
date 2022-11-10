import { Tape } from "./Tape";
import { parseAlphabet } from "./DFAModel";

export class TuringState {
    constructor(name, halting = false, accepting = false, transitions = new Map()) {
        this.name = name;
        this.halting = halting;
        this.accepting = accepting;
        this.transitions = transitions;
    }

    addTransition(transition) {
        if (this.transitions.has(transition.symbol)) {
            return false;
        }
        this.transitions.set(transition.symbol, transition);
    }

    getTransition(symbol) {
        if (this.transitions.has(symbol)) {
            return this.transitions.get(symbol);
        }
        return false;
    }
}

export class TuringTransition {
    constructor(state, symbol, write, move, next_state) {
        this.state = state;
        this.symbol = symbol;
        this.write = write;
        this.move = move;
        this.next_state = next_state;
    }
}

export class TuringMachine {
    constructor(states, alphabet, transitions, start_state, halt_states, accepting_states, start_index = 0) {
        this.states = parseTuringStates(states);
        this.alphabet = parseAlphabet(alphabet);
        this.transitions = parseTuringTransitions(transitions);
        this.initial = null;
        this.current = null;
        this.halting = new Set();
        this.start_index = start_index;
        this.tape = null;
        this.halted = false;
        this.error = null;

        // check components and alert if error
        if (!this.checkAlphabet()) {
            window.alert(this.error);
        } else if (!this.checkStates()) {
            window.alert(this.error);
        } else if (!this.checkInitial(start_state)) {
            window.alert(this.error);
        } else if (!this.checkHalting(halt_states)) {
            window.alert(this.error);
        } else if (!this.checkAccepting(accepting_states)) {
            window.alert(this.error);
        } else if (!this.checkTransitions()) {
            window.alert(this.error);
        }
    }

    // create and run tape
    simulateTape(input) {
        let input_arr = input.split("");
        this.tape = new Tape(input_arr, "_", this.start_index);
        while (!this.halted) {
            if (this.oneStep() === false) {
                return false;
            }
        }
        return this.current.accepting;
    }

    oneStep() {
        // read
        let ts = this.current.getTransition(this.tape.getCurrentValue());
        if (ts !== false) {
            // write
            this.tape.overwrite(ts.write);
            // move
            if (ts.move == ">") {
                this.tape.shiftRight();
            } else if (ts.move === "<") {
                this.tape.shiftLeft();
            }
            this.current = ts.next_state;
            if (this.current.halting === true) {
                this.halted = true;
            }
        } else {
            return false;
        }
    }

    // check alphabet
    checkAlphabet() {
        if (this.alphabet.length === 0) {
            this.error = "Empty alphabet";
            return false;
        }

        let symbols = new Set();
        symbols.add("eps");
        for (let i in this.alphabet) {
            let s = this.alphabet[i];
            if (symbols.has(s)) {
                this.error = "Duplicate in alphabet: " + s;
                return false;
            }
            symbols.add(s);
        }
        this.alphabet = symbols;
        return true;
    }

    // check states
    checkStates() {
        if (this.states.length === 0) {
            this.error = "Empty States";
            return false;
        }

        let states = new Map();
        for (let i in this.all) {
            let s = this.all[i];
            if (states.has(s.name) || this.syms.has(s.name)) {
                this.error = "Conflicting state name: " + s.name;
                return false;
            }
            states.set(s.name, s);
        }

        this.states = states;
        return true;
    }

    // check initial state
    checkInitial(initial) {
        if (this.states.has(initial)) {
            this.initial = this.states.get(initial);
            this.current = this.initial;
            return true;
        }
        this.error = "Invalid initial state";
        return false;
    }

    // check halting states
    checkHalting(halting) {
        let halt_array = parseAlphabet(halting);
        if (halt_array.length === 0) {
            this.error = "Empty halting states";
            return false;
        }

        for (let h_name of halt_array) {
            if (!this.states.has(h_name)) {
                this.error = "Halting state " + h_name + " does not exist";
                return false;
            }
            this.states.get(h_name).halting = true;
            this.halting.add(this.states.get(h_name));
        }
        return true;
    }

    checkAccepting(accepting) {
        let acc_array = parseAlphabet(accepting);
        if (acc_array.length === 0) {
            this.error = "Empty accepting states";
            return false;
        }

        for (let acc_name of acc_array) {
            if (!this.states.has(acc_name)) {
                this.error = "Accepting state " + acc_name + " does not exist";
                return false;
            }
            if (!this.halting.has(acc_name)) {
                this.error = "Accepting state " + acc_name + " does not halt";
                return false;
            }
            this.states.get(acc_name).accepting = true;
        }
        return true;
    }

    // check transitions
    checkTransitions() {
        if (this.transitions.length === 0) {
            this.error = "Empty transitions";
            return false;
        }

        for (let ts of this.transitions) {
            if (!this.states.has(ts.state)) {
                this.error = "Invalid state in transition: (" + ts.state + ", " + ts.symbol + ")";
                return false;
            }
            if (!this.alphabet.has(ts.symbol)) {
                this.error = "Invalid symbol in transition: (" + ts.state + ", " + ts.symbol + ")";
                return false;
            }
            if (!this.states.has(ts.next_state)) {
                this.error = "Invalid next state in transition: (" + ts.state + ", " + ts.symbol + ")";
                return false;
            }
            if (!this.alphabet.has(ts.write)) {
                this.error = "Invalid write in transition: (" + ts.state + ", " + ts.symbol + ")";
                return false;
            }
            if (!(ts.move === ">" || ts.move === "<" || ts.move === "|")) {
                this.error = "Invalid move in transition: (" + ts.state + ", " + ts.symbol + ")";
                return false;
            }

            ts.state = this.states.get(ts.state);
            ts.next_state = this.states.get(ts.next_state);

            if (ts.state.addTransition(ts)) {
                this.error = "Duplicate transition: (" + ts.state + ", " + ts.symbol + ")";
                return false;
            }
            // check that all symbol/state combos are accounted for?
        }
        return true;
    }
}

export function parseTuringStates(input) {
    input = input.replaceAll(" ", "");
    if (input.length === 0) return [];

    let input_array = input.split(',');
    let states_array = [];
    for (let i in input_array) {
        let str_state = input_array[i];
        states_array[i] = new TuringState(str_state);
    }
    return states_array;
}

// (State, Sym) -> (State, Write, Move); (State, Sym) -> (State, Write, Move)
export function parseTuringTransitions(input) {
    input = input.replaceAll(" ", "");
    if (input.length === 0) return [];

    let transitions = input.split(';');
    let trans_array = [];
    for (let trans of transitions) {
        let split = trans.split("->");
        let current = split[0].replaceAll("(", "").replaceAll(")", "");
        current = current.split(",");
        let output = split[1].replaceAll("(", "").replaceAll(")", "");
        output = output.split(",");
        trans_array.push(new TuringTransition(current[0], current[1], output[0], output[1], output[2]));
    }
    return trans_array;
}