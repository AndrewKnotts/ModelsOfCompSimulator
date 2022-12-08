import { Tape } from "./Tape";
import { parseAlphabet } from "./DFAModel";

export class TuringState {
    constructor(name, halting = false, accepting = false, transitions = new Map()) {
        this.name = name;
        this.halting = halting;
        this.accepting = accepting;
        // transitions is a Map from the transition's symbol to the TuringTransition
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
    constructor(state, symbol, nextState, write, move) {
        this.state = state;
        this.symbol = symbol;
        this.nextState = nextState;
        this.write = write;
        this.move = move;
    }
}

export class TuringMachine {
    constructor(states, alphabet, transitions, startState, haltStates, acceptingStates, blankSym, centered=0) {
        this.states = parseTuringStates(states);
        this.alphabet = parseAlphabet(alphabet);
        this.transitions = parseTuringTransitions(transitions);
        this.initial = null;
        this.blankSym = blankSym;
        this.tape = null;
        // tapeHistory is an array of arrays of the tape's contents at each step
        this.tapeHistory = [];
        // tsHistory is an array of transitions undergone
        this.tsHistory = [];
        this.current = null;
        this.halted = false;
        // error is used to store error message strings
        this.error = null;
        // setting to move indicator (0) or move tape (1) in display
        this.display = centered;

        // check components and alert if error
        if (!this.checkAlphabet()) {
            window.alert(this.error);
        } else if (!this.checkStates()) {
            window.alert(this.error);
        } else if (!this.checkInitial(startState)) {
            window.alert(this.error);
        } else if (!this.checkHalting(haltStates)) {
            window.alert(this.error);
        } else if (!this.checkAccepting(acceptingStates)) {
            window.alert(this.error);
        } else if (!this.checkTransitions()) {
            window.alert(this.error);
        }
    }

    // create and run tape
    simulateTape(input) {
        if (input === "") {
            this.tape = new Tape([this.blankSym], this.blankSym, 0);
        } else {
            let inputArr = input.split("");
            for (let char of inputArr) {
                if (!this.alphabet.has(char)) {
                    window.alert("Character '" + char + "' is invalid")
                }
            }
            this.tape = new Tape(inputArr, this.blankSym, 0);
        }
        if (this.display === false) this.tapeHistory.push(this.tape.printTape());
        if (this.display === true) this.tapeHistory.push(this.tape.printCenteredTape(4));
        this.tsHistory.push(new TuringTransition("", "", this.initial, "", ""));

        // run tape until halted or step fails
        while (!this.halted) {
            if (this.oneStep() === false) {
                return false;
            }
        }
        return this.current.accepting;
    }

    oneStep() {
        // read transition from current state/symbol
        let ts = this.current.getTransition(this.tape.getCurrentValue());
        this.tsHistory.push(ts);
        if (ts !== false) {
            // write new symbol on tape
            this.tape.overwrite(ts.write);

            // move tape head
            if (ts.move === ">") {
                this.tape.shiftRight();
            } else if (ts.move === "<") {
                this.tape.shiftLeft();
            }

            // update to next state and halt if necessary
            this.current = ts.nextState;
            if (this.current.halting === true) {
                this.halted = true;
            }
            // add to tapeHistory with right setting
            if (this.display === false) this.tapeHistory.push(this.tape.printTape());
            if (this.display === true) this.tapeHistory.push(this.tape.printCenteredTape(4));
            return true;
        } else {
            // fail
            if (this.display === false) this.tapeHistory.push(this.tape.printTape());
            if (this.display === true) this.tapeHistory.push(this.tape.printCenteredTape(4));
            return false;
        }
    }

    // check alphabet for empty input or duplicates
    checkAlphabet() {
        if (this.alphabet.length === 0) {
            this.error = "Empty alphabet";
            return false;
        }

        let symbols = new Set();
        for (let s of this.alphabet) {
            if (symbols.has(s)) {
                this.error = "Duplicate in alphabet: " + s;
                return false;
            }
            symbols.add(s);
        }

        // Add blankSym at the end to allow for transitions to write blankSym
        symbols.add(this.blankSym);
        this.alphabet = symbols;
        return true;
    }

    // check states for empty input or conflicts
    checkStates() {
        if (this.states.length === 0) {
            this.error = "Empty states";
            return false;
        }

        // Create map of state name to TuringState object
        let states = new Map();
        for (let s of this.states) {
            if (states.has(s.name) || this.alphabet.has(s.name)) {
                this.error = "Conflicting state name: " + s.name;
                return false;
            }
            states.set(s.name, s);
        }

        this.states = states;
        return true;
    }

    // check that initial state is valid and assign current/initial to the TuringState object
    checkInitial(initial) {
        if (this.states.has(initial)) {
            this.initial = this.states.get(initial);
            this.current = this.initial;
            return true;
        }
        this.error = "Invalid initial state";
        return false;
    }

    // check halting states are valid TuringStates and set the halting flag to true for each
    checkHalting(halting) {
        let haltArray = parseAlphabet(halting);
        if (haltArray.length === 0) {
            this.error = "Empty halting states";
            return false;
        }

        for (let hName of haltArray) {
            if (!this.states.has(hName)) {
                this.error = "Halting state " + hName + " does not exist";
                return false;
            }
            this.states.get(hName).halting = true;
        }
        return true;
    }

    // check acc. states are valid TuringStates and are halting, set accepting flag to true for each
    checkAccepting(accepting) {
        let accArray = parseAlphabet(accepting);
        if (accArray.length === 0) {
            this.error = "Empty accepting states";
            return false;
        }

        for (let accName of accArray) {
            if (!this.states.has(accName)) {
                this.error = "Accepting state " + accName + " does not exist";
                return false;
            } else {
                let s = this.states.get(accName);
                if (s.halting === false) {
                    this.error = "Accepting state " + accName + " does not halt";
                    return false;
                }
                s.accepting = true;
            }

        }
        return true;
    }

    // check transitions for valid source/sym, next/write/move
    checkTransitions() {
        if (this.transitions.length === 0) {
            this.error = "Empty transitions";
            return false;
        }

        // check that all transitions are valid
        for (let ts of this.transitions) {
            if (!this.states.has(ts.state)) {
                this.error = "Invalid state in transition: (" + ts.state + ", " + ts.symbol + ") -> (" + ts.nextState +
                    ", " + ts.write + ", " + ts.move + ")";
                return false;
            }
            if (!this.alphabet.has(ts.symbol)) {
                this.error = "Invalid symbol in transition: (" + ts.state + ", " + ts.symbol + ") -> (" + ts.nextState +
                    ", " + ts.write + ", " + ts.move + ")";
                return false;
            }
            if (!this.states.has(ts.nextState)) {
                this.error = "Invalid next state in transition: (" + ts.state + ", " + ts.symbol + ") -> (" + ts.nextState +
                    ", " + ts.write + ", " + ts.move + ")";
                return false;
            }
            if (!this.alphabet.has(ts.write)) {
                this.error = "Invalid write in transition: (" + ts.state + ", " + ts.symbol + ") -> (" + ts.nextState +
                    ", " + ts.write + ", " + ts.move + ")";
                return false;
            }
            if (!(ts.move === ">" || ts.move === "<" || ts.move === "|")) {
                this.error = "Invalid move in transition: (" + ts.state + ", " + ts.symbol + ") -> (" + ts.nextState +
                    ", " + ts.write + ", " + ts.move + ")";
                return false;
            }

            // reassign ts's states from name to TuringState object
            ts.state = this.states.get(ts.state);
            ts.nextState = this.states.get(ts.nextState);

            // check for duplicates
            if (ts.state.addTransition(ts) === false) {
                this.error = "Duplicate transition: (" + ts.state + ", " + ts.symbol + ")";
                return false;
            }
        }
        return true;
    }
}

// parse states string input into TuringState array
export function parseTuringStates(input) {
    input = input.replaceAll(" ", "");
    if (input.length === 0) return [];

    let inputArray = input.split(',');
    let statesArray = [];
    for (let strState of inputArray) {
        statesArray.push(new TuringState(strState));
    }
    return statesArray;
}

// (State, Sym) -> (State, Write, Move); (State, Sym) -> (State, Write, Move)
// parse transition string input into TuringTransition array
export function parseTuringTransitions(input) {
    input = input.replaceAll(" ", "");
    if (input.length === 0) return [];

    let transitions = input.split(';');
    let transArray = [];
    for (let trans of transitions) {
        if (trans.length === 0) break;
        let split = trans.split("->");
        let current = split[0].replaceAll("(", "").replaceAll(")", "");
        current = current.split(",");
        let output = split[1].replaceAll("(", "").replaceAll(")", "");
        output = output.split(",");
        transArray.push(new TuringTransition(current[0], current[1], output[0], output[1], output[2]));
    }
    return transArray;
}