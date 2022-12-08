import { parseAlphabet, parseTransition } from "./DFAModel";

// Pair is used to represent Transitions within NFAStates
export class Pair {
    constructor(left, right) {
        this.left = left;
        this.right = right;
    }

    equalTo(other) {
        if ((this.left === other.left) && (this.right === other.right)) return true;
        return false;
    }
}

export class NFAState {
    constructor(name) {
        this.name = name;
        this.accepting = false;
        // connected represents whether reachable from initial state, conn used to check that
        this.connected = false;
        this.conn = []; 
        // array of Pairs with left as symbol, right as destination state, where this is the source
        this.transitions = [];
        // array of Pairs with left as source state, right as symbol, where this is the destination
        this.destOf = [];
    }

    addTrans(symbol, dest) {
        this.transitions.push(new Pair(symbol, dest));
    }

    addDestOf(state, symbol) {
        let newPair = new Pair(state, symbol);
        this.destOf.push(newPair);
    }

    getAllTrans() {
        return this.transitions;
    }

    // return an array of only epsilon transitions
    getEpsilonTrans() {
        let retList = [];
        for (let i in this.transitions) {
            let ts = this.transitions[i];
            if (ts.left === "eps") {
                retList.push(ts);
            }
        }
        return retList;
    }

    // return an array of only non-epsilon transitions for a specific symbol
    getSymbolTrans(sym) {
        let retList = [];
        for (let i in this.transitions) {
            let ts = this.transitions[i];
            if (ts.left === sym) {
                retList.push(ts);
            }
        }
        return retList;
    }

    // get all symbols for transitions from a specific source
    getSym(src) {
        let syms = [];
        for (let p of this.destOf) {
            if (p.left === src) {
                syms.push(p.right);
            }
        }
        return syms;
    }
}

export class NFAModel {
    constructor(initial, accepting, allStates, alphabet, transitions) {
        this.alphabet = parseAlphabet(alphabet);
        this.states = parseNFAStates(allStates);
        this.initial = null;
        this.transitions = parseTransition(transitions);
        this.current = new Set();
    
        // input used to save original input string
        this.input = null;
        // path of possible sets of states
        this.setPath = [];
        // backward path used for backtrack()
        this.backwardPath = [];
        // true/false on string acceptance, used for unit testing
        this.acceptanceResult = null;
        // logs error messages
        this.error = null;

        // check components and alert if error
        if (!this.checkAlphabet()) {
            window.alert(this.error);
        } else if (!this.checkStates()) {
            window.alert(this.error);
        } else if (!this.checkInitial(initial)) {
            window.alert(this.error);
        } else if (!this.checkAccepting(accepting)) {
            window.alert(this.error);
        } else if (!this.checkTransitions()) {
            window.alert(this.error);
        } else {
            this.makeConnected(this.initial);
            for (let s of this.states.values()) {
                if (!s.connected) {
                    console.log("State " + s.name + " is not reachable.");
                }
            }
        }
    }

    // given an input string, simulate it in the NFA model
    checkInputString(input) {
        // create Set to represent next states and initialize current Set to initial state
        let next = new Set();
        this.current = new Set().add(this.initial);
        this.input = input;

        // add all epsilon transitons from initial state
        let epsTrans = this.initial.getEpsilonTrans();
        if (epsTrans.length !== 0) {
            this.setPath.push(this.current);
            for (let trans of epsTrans) {
                next.add(trans.right);
            }
            for (let a of next) {
                let nextEps = a.getEpsilonTrans();
                if (nextEps.length !== 0) {
                    for (let trans of nextEps) {
                        next.add(trans.right);
                    }
                }
            }
            next.add(this.initial);
            this.current = next;
            this.setPath.push(this.current);
        }

        // loop through input string, one char at a time
        while (input.length > 0) {
            let str = input.substring(0, 1);
            input = input.substring(1);
            if (!this.alphabet.has(str)) {
                window.alert("Character " + str + " is not in alphabet");
                return null;
            }
            // next represents set of possible States after one transition
            let next = new Set();
            // passing tracks which States have outgoing transitions in this step
            let passing = new Set();

            for (let a of this.current) {
                // for each current state, add all possible symbol transitions for the symbol/src
                let symTrans = a.getSymbolTrans(str);
                let epsTrans = a.getEpsilonTrans();
                if (symTrans.length !== 0) {
                    for (let trans of symTrans) {
                        next.add(trans.right);
                        passing.add(a);
                    }
                }
                if (epsTrans.length !== 0) {
                    passing.add(a);
                }
            }

            // if there are no possible next states for the input, the input is rejected
            if (next.size === 0 && input.length !== 0) {
                console.log("no possible next states");
                let retPath = [new Pair(this.initial, "")];
                let failState = new NFAState("🙁");
                retPath.push(new Pair(failState, "❌"));
                this.acceptanceResult = false;
                return retPath;
            }

            // add all epsilon transitions of next into next
            for (let b of next) {
                let epsTrans = b.getEpsilonTrans();
                if (epsTrans !== 0) {
                    for (let trans of epsTrans) {
                        next.add(trans.right);
                        passing.add(b);
                    }
                }
            }

            // remove all dead ends (States not in passing)
            for (let stt of this.current) {
                if (!passing.has(stt)) {
                    this.current.delete(stt);
                }
            }

            // add current to setPath, update to next
            this.setPath.push(this.current);
            this.current = next;
        }
        this.setPath.push(this.current);
        return this.acceptString();
    }

        // once checkInputString has run, determine whether or not to accept input
        acceptString() {
            let retPath = [];
            for (let a of this.current) {
                if (a.accepting) {
                    // create acceptance visualization and add it to end of path
                    this.backtrack(a);
                    this.backwardPath.push(new Pair(this.initial, ""));
                    retPath = [...this.backwardPath].reverse();
                    let acceptState = new NFAState("🙂");
                    retPath.push(new Pair(acceptState, "✔️"));
                    this.acceptanceResult = true;
                    return retPath;
                }
            }
            // if not accepting, create fail visualization and add it to end of path
            retPath.push(new Pair(this.initial, ""));
            let failState = new NFAState("🙁");
            retPath.push(new Pair(failState, "❌"));
            this.acceptanceResult = false;
            return retPath;
        }

    // start at back of array and go back picking options from the previous set that have transitions that go to the current state chosen
    backtrack(accState) {
        // inp is an array of characters from input string in reverse order
        let inp = this.input.split("");
        inp.reverse();
        let currState = accState;
        // revPath is the path of possible sets in reverse order
        let revPath = [...this.setPath].reverse();
        // epsSet used for epsilon loop checking
        let epsSet = new Set();

        // for each set of possible states in the path
        for (let i = 1; i < revPath.length; i++) {
            let chr = inp[0];
            for (let src of revPath[i]) {
                // find first src that currState can transition to and add it to the path
                if (currState.getSym(src).includes(chr)) {
                    // reset epsSet 
                    epsSet = new Set();
                    this.backwardPath.push(new Pair(currState, chr));
                    currState = src;
                    // pop the first input off the array
                    inp.shift();
                    break;
                } else if (currState.getSym(src).includes("eps")) {
                    // if no symbol transitions, try to find an epsilon transition
                    if (epsSet.has(src)) {
                        // if tried epsilon transition already, skip this source
                        continue;
                    } else {
                        // add to epsSet for loop checking
                        epsSet.add(src);
                    }
                    this.backwardPath.push(new Pair(currState, "ε"));
                    currState = src;
                    // reset i to i-1 since an input char is not consumed
                    i = i - 1;
                    break;
                }
            }
        }    
    }

    // Checks alphabet for repeated symbols or being empty
    checkAlphabet() {
        if (this.alphabet.length === 0) {
            this.error = "Empty alphabet";
            return false;
        }

        // include "eps" by default
        let symbols = new Set();
        symbols.add("eps");
        for (let s of this.alphabet) {
            if (symbols.has(s)) {
                this.error = "Duplicate in alphabet: " + s;
                return false;
            }
            symbols.add(s);
        }

        // reassign alphabet to the Set
        this.alphabet = symbols;
        return true;
    }

    // Checks states for repeats or conflicts with alphabet
    // Creates a Map of state names to States 
    checkStates() {
        if (this.states.length === 0) {
            this.error = "Empty States";
            return false;
        }

        // map state names to NFAState objects
        let states = new Map();
        for (let s of this.states) {
            if (states.has(s.name) || this.alphabet.has(s.name)) {
                this.error = "Conflicting state name: " + s.name;
                return false;
            }
            states.set(s.name, s);
        }

        // reassign states to the Map
        this.states = states;
        return true;
    }

    // Checks that initial state is a valid state and assigns this.initial to the State
    checkInitial(initial) {
        if (this.states.has(initial)) {
            this.initial = this.states.get(initial);
            this.initial.connected = true;
            return true;
        }
        this.error = "Invalid initial state";
        return false;
    }

    // Checks that accepting states are present and valid
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
            }
            this.states.get(accName).accepting = true;
        }
        return true;
    }

    // Checks that transitions are valid symbols/states/states, and are not duplicates of prior transitions
    // Sets up connections to check all states are connected
    checkTransitions() {
        if (this.transitions.length === 0) {
            this.error = "Empty transitions";
            return false;
        }

        for (let t of this.transitions) {
            // confirm that symbol and src/dest states exist
            if (!this.alphabet.has(t.symbol)) {
                this.error = "Invalid symbol in transition: (" + t.symbol + ", " + t.source + ", " + t.dest + ")";
                return false;
            }
            if (!this.states.has(t.source)) {
                this.error = "Invalid source in transition: (" + t.symbol + ", " + t.source + ", " + t.dest + ")";
                return false;
            }
            if (!this.states.has(t.dest)) {
                this.error = "Invalid destination in transition: (" + t.symbol + ", " + t.source + ", " + t.dest + ")";
                return false;
            }

            // reassign source/dest to the NFAState object
            t.source = this.states.get(t.source);
            t.dest = this.states.get(t.dest);

            // check for duplicate transitions
            let srcState = t.source;
            for (let ts of srcState.getAllTrans()) {
                if ((ts.left === t.symbol) && (ts.right === t.dest)) {
                    this.error = "Transition (" + t.symbol + ", " + t.source.name + ", " + t.dest.name + ") already exists";
                    return false;
                }
            }
            // add transition to source state and destOf for dest state
            srcState.addTrans(t.symbol, t.dest);
            t.dest.addDestOf(srcState, t.symbol);

            // Add the dest State to source.conn for connection check
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
    input = input.replaceAll(" ", "");
    if (input.length === 0) return [];

    let inputArray = input.split(',');
    let statesArray = [];
    for (let i in inputArray) {
        let strState = inputArray[i];
        statesArray[i] = new NFAState(strState);
    }
    return statesArray;
}