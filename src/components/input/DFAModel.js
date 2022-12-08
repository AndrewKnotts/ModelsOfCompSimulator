export class State {
    constructor(name) {
        this.name = name;
        this.accepting = false;
        // connected flag to represent whether it is reachable from initial state
        this.connected = false;
        // conn array of states to which it can transition directly
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
    constructor(initial, accepting, allStates, alphabet, transitions) {
        this.alphabet = parseAlphabet(alphabet);
        this.states = parseStates(allStates);
        this.initial = null;
        this.transitions = parseTransition(transitions);
        this.current = null;
        // ts is a Map of source States to an array of symbols used in checkTransitions()
        this.ts = new Map();
        // error is used to store error message strings
        this.error = null;
        // true/false for accept/reject, used for unit testing
        this.acceptanceResult = null;

        // check each component and alert for errors
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
            // make Connected for all and check that all states are reachable
            this.makeConnected(this.initial);
            for (let s of this.states.values()) {
                if (!s.connected) {
                    console.log("State " + s.name + " is not reachable.");
                }
            }
        } 
    }

    // Takes input string and runs it through model, returning list of transitions to acceptance or null for failure
    checkInputString(input) {
        // Set current state to initial and create new path starting from initial
        this.current = this.initial;
        let path = [];

        // Iterate through each char in string
        for (let i = 0; i < input.length; i++) {
            let str = input.substring(i, i + 1);
            // input string fails if a character is not in alphabet
            if (!this.alphabet.has(str)) {
                window.alert("Character " + str + " is not in alphabet");
                return null;
            }
            // check transitions for match and update to new state when found
            for (let t of this.transitions) {
                if ((t.source === this.current) && (t.symbol === str)) {
                    path.push(t);
                    this.current = t.dest;
                    break;
                }
            }
        }
        return this.acceptString(path);
    }

    // given a path, checks whether end state is accepting and adds success/fail marker if so
    acceptString(path) {
        // Check if the current state is an accepting state, create accept vis. and add to path
        if (this.current.accepting === true) {
            let acceptState = new State("🙂");
            path.push(new Transition("✔️", null, acceptState));
            this.acceptanceResult = true;
            return path;
        } 
        // if not accepting, create fail visualization and add it to end of path
        let failState = new State("🙁");
        path.push(new Transition("❌", null, failState));
        this.acceptanceResult = false;
        return path;
    }

    // Checks alphabet for repeated symbols or being empty
    checkAlphabet() {
        if (this.alphabet.length === 0){
            this.error = "Empty alphabet";
            return false;
        }

        // Add each character to a set, checking for duplicates
        let symbols = new Set();
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
    checkStates() {
        if (this.states.length === 0) {
            this.error = "Empty States";
            return false;
        }

        // map state names to state object, checking for duplicates or conflict with alphabet
        let states = new Map();
        for (let s of this.states) {
            if (states.has(s.name) || this.alphabet.has(s.name)) {
                this.error = "Conflicting state name: " + s.name;
                return false;
            }
            states.set(s.name, s);
        }

        // reassign this.states to the Map
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

    // Checks that transitions have valid symbols/states/states
    // Sets up connections to check all states are connected
    checkTransitions() {
        if (this.transitions.length === 0) {
            this.error = "Empty transitions";
            return false;
        }

        for (let t of this.transitions) {
            // confirm that the symbol and source/dest states exist 
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

            // reassign t.source/dest from string names to the actual states
            t.source = this.states.get(t.source);
            t.dest = this.states.get(t.dest);

            // fails if source already has the symbol in ts; else add it to the symList in ts or create a new symList for it 
            if (this.ts.has(t.source) && this.ts.get(t.source).includes(t.symbol)) {
                this.error = "State " + t.source.name + " has multiple transitions for symbol " + t.symbol;
                return false;
            } else if (this.ts.has(t.source)) {
                let symList = this.ts.get(t.source);
                symList.push(t.symbol);
                this.ts.set(t.source, symList);
            } else {
                let newList = new Array(t.symbol);
                this.ts.set(t.source, newList);
            }

            // add the dest to the source state for connection check
            if (!t.source.conn.includes(t.dest)) {
                t.source.conn.push(t.dest);
            }
        }

        // check that all states have all alphabet symbols represented
        for (let s of this.states.values()) {
            // fails if a state is missing from the transitions map
            if (!this.ts.has(s)) {
                this.error = "State " + s.name + " has no transitions";
                return false;
            }
        }

        for (let trans of this.ts.keys()) {
            for (let sym of this.alphabet) {
                // fails if a symbol is missing from a state
                if (!this.ts.get(trans).includes(sym)) {
                    this.error = "State " + trans.name + " has no transition for symbol " + sym;
                    return false;
                }
            }
        }
        return true;
    }

    // uses conn lists in states to set connected to true if reachable from initial
    makeConnected(start) {
        for (let s of start.conn) {
            if (!s.connected) {
                s.connected = true;
                this.makeConnected(s);
            }
        }
    }
}

// parse alphabet string input into String array
export function parseAlphabet(input) {
    input = input.replaceAll(" ","");
    if (input.length === 0) return [];

    let alphabetArray = input.split(',');
    return alphabetArray;
}

// parse states string input into (DFA) State array
export function parseStates(input) {
    input = input.replaceAll(" ","");
    if (input.length === 0) return [];

    let inputArray = input.split(',');
    let statesArray = [];
    for (let strState of inputArray) {
        statesArray.push(new State(strState));
    }
    return statesArray;
}

// parse transition string input into Transition array
export function parseTransition(input) {
    input = input.replaceAll(" ","");
    if (input.length === 0) return [];

    let transitions = input.split(';');
    let transArray = [];
    for (let trans of transitions) {
        if (trans.length === 0) break;
        let split = trans.split(',');
        for (let j in split) {
            split[j] = split[j].replaceAll("(", "").replaceAll(")", "");
        }
        transArray.push(new Transition(split[0], split[1], split[2]));
    }
    return transArray;
}