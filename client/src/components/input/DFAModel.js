export class State {
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
        console.log("DFA Model:");
        this.all = parseStates(all_states);
        this.initial = null;
        this.accepting = [];
        this.alphabet = parseAlphabet(alphabet);
        this.transitions = parseTransition(transitions);
        this.current = null;
        this.syms = null;
        this.states = null;
        this.ts = new Map();
        this.error = null;
        this.acceptance_result = null;
        
        /* console.log("initial: ", initial);
        console.log("accepting: ", accepting);
        console.log("states: ", all_states);
        console.log("alphabet: ", alphabet);
        console.log("transitions: ", transitions); */

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
            // make Connected for all and check
            this.makeConnected(this.initial);
            for (let i in this.all) {
                let s = this.all[i];
                if (!s.connected) {
                    console.log("State " + s.name + " is not reachable.");
                }
            }
        }
    }

    // given a path, checks whether end state is accepting and adds success/fail marker if so
    acceptString(path) {
        // Check if the current state is an accepting state
        for (let i in this.accepting) {
            let s = this.accepting[i];
            if (s == this.current) {
                // create acceptance visualization and add it to end of path
                let accept_state = new State("🙂");
                let acceptance = new Transition("✔️", null, accept_state);
                path.push(acceptance);
                this.acceptance_result = true;
                return path;
            }
        }
        // if not accepting, create fail visualization and add it to end of path
        let fail_state = new State("🙁");
        let failure = new Transition("❌", null, fail_state);
        path.push(failure);
        this.acceptance_result = false;
        return path;
    }

    // Takes input string and runs it through model, returning list of transitions to acceptance or null for failure
    checkInputString(input) {
        // Set current state to initial and create new path starting from initial
        this.current = this.initial;
        let path = [];

        // Iterate through each char in string, check transitions for match, update to new state and repeat when found
        for (let i = 0; i < input.length; i++) {
            let str = input.substring(i, i + 1);
            // input string fails if a character is not in alphabet
            if (!this.syms.has(str)) {
                window.alert("Character " + str + " is not in alphabet");
                return null;
            }
            //let worked = false;
            for (let i in this.transitions) {
                let t = this.transitions[i];
                if ((t.source === this.current) && (t.symbol === str)) {
                    path.push(t);
                    this.current = t.dest;
                    //worked = true;
                    break;
                }
            }
            /* if (!worked) {
                let fail_state = new State("🙁");
                let failure = new Transition(str, null, fail_state);
                path.push(failure);
                return path;
            } */
        }
        return this.acceptString(path);
    }

    // Checks alphabet for repeated symbols or being empty
    checkAlphabet() {
        if (this.alphabet.length === 0){
            this.error = "Empty alphabet";
            return false;
        }

        // Add each character to a set, checking for duplicates
        let symbols = new Set();
        for (let i in this.alphabet) {
            let s = this.alphabet[i];
            if (symbols.has(s)) {
                this.error = "Duplicate in alphabet: " + s;
                return false;
            }
            symbols.add(s);
        }

        this.syms = symbols;
        return true;
    }

    // Checks states for repeats or conflicts with alphabet
    checkStates() {
        if (this.all.length === 0) {
            this.error = "Empty States";
            return false;
        }

        // map state names to state object, checking for duplicates or conflict with alphabet
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
        let acc_array = parseAlphabet(accepting);
        if (acc_array.length === 0) {
            this.error = "Empty accepting states";
            return false;
        }

        for (let i in acc_array) {
            let acc_name = acc_array[i];
            if (!this.states.has(acc_name)) {
                this.error = "Accepting state " + acc_name + " does not exist";
                return false;
            }
            this.states.get(acc_name).accepting = true;
            this.accepting.push(this.states.get(acc_name));
        }
        return true;
    }

    // Checks that transitions are valid symbols/states/states
    // Sets up connections to check all states are connected
    // ts is a map of Sources to a list of symbols that have been assigned a transition
    checkTransitions() {
        if (this.transitions.length === 0) {
            this.error = "Empty transitions";
            return false;
        }

        for (let i in this.transitions) {
            let t = this.transitions[i];

            // confirm that the symbol and source/dest states exist 
            if (!this.syms.has(t.symbol)) {
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

            // fails if source already has the symbol; else add it to the sym_list or create a new sym_list for it
            if (this.ts.has(t.source) && this.ts.get(t.source).includes(t.symbol)) {
                this.error = "State " + t.source.name + " has multiple transitions for symbol " + t.symbol;
                return false;
            } else if (this.ts.has(t.source)) {
                let sym_list = this.ts.get(t.source);
                sym_list.push(t.symbol);
                this.ts.set(t.source, sym_list);
            } else {
                let new_list = new Array(t.symbol);
                this.ts.set(t.source, new_list);
            }

            // add the dest to the source state for connection check
            if (!t.source.conn.includes(t.dest)) {
                t.source.conn.push(t.dest);
            }
        }

        // check that all states have all alphabet symbols represented
        for (let i in this.all) {
            let s = this.states.get(this.all[i].name);
            // fails if a state is missing from the transitions map 
            if (!this.ts.has(s)) {
                this.error = "State " + s.name + " has no transitions";
                return false;
            }
        }

        for (let trans of this.ts.keys()) {
            for (let sym of this.syms) {
                // fails if a symbol is missing from a state
                if (!this.ts.get(trans).includes(sym)) {
                    this.error = "State " + trans.name + " has no transition for symbol " + sym;
                    return false;
                }
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

// parse alphabet string input into String array
export function parseAlphabet(input) {
    input = input.replaceAll(" ","");
    if (input.length == 0) return [];

    let alphabet_array = input.split(',');
    for (let i in alphabet_array) {
        let alpha = alphabet_array[i];
        alphabet_array[i] = alpha;
    }
    return alphabet_array;
}

// parse states string input into State array
export function parseStates(input) {
    input = input.replaceAll(" ","");
    if (input.length == 0) return [];

    let input_array = input.split(',');
    let states_array = [];
    for (let i in input_array) {
        let str_state = input_array[i];
        states_array[i] = new State(str_state);
    }
    return states_array;
}

// parse transition string input into Transition array
export function parseTransition(input) {
    input = input.replaceAll(" ","");
    if (input.length == 0) return [];

    let transitions = input.split(';');
    let trans_array = [];
    for (let i in transitions) {
        let trans = transitions[i];
        let split = trans.split(',');
        for (let j in split) {
            split[j] = split[j].replaceAll("(", "").replaceAll(")", "");
        }
        trans_array[i] = new Transition(split[0], split[1], split[2]);
    }
    return trans_array;
}