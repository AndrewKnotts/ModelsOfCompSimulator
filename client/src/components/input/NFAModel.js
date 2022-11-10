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

    getAllTrans() {
        return this.transitions;
    }

    getEpsilonTrans() {
        let ret_list = [];
        for (let i in this.transitions) {
            let ts = this.transitions[i];
            if (ts.left === "eps") {
                ret_list.push(ts);
            }
        }
        return ret_list;
    }

    getSymbolTrans(sym) {
        let ret_list = [];
        for (let i in this.transitions) {
            let ts = this.transitions[i];
            if (ts.left === sym) {
                ret_list.push(ts);
            }
        }
        return ret_list;
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
        this.current = new Set();
        this.syms = null;
        this.states = null;
        this.error = null;
        this.setPath = [];
        this.input = null;
        //this.ts = new Map();

        console.log("initial: ", initial);
        console.log("accepting: ", accepting);
        console.log("states: ", all_states);
        console.log("alphabet: ", alphabet);
        console.log("transitions: ", transitions);

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

    acceptString() {
        console.log(this.setPath);
        let ret_path = [new Pair("", this.initial)];
        for (let a of this.current) {
            if (a.accepting) {
                // create acceptance visualization and add it to end of path
                let accept_state = new NFAState("🙂");
                let acceptance = new Pair("✔️", accept_state);
                ret_path.push(acceptance);
                console.log(ret_path);
                return ret_path;
            }
        }
        // if not accepting, create fail visualization and add it to end of path
        let fail_state = new NFAState("🙁");
        let failure = new Pair("❌", fail_state);
        ret_path.push(failure);
        return ret_path;
    }

    checkInputString(input) {
        // create Set to represent next states and initialize current Set to initial state
        let next = new Set();
        this.current = new Set().add(this.initial);
        this.input = input;

        // add all epsilon transitons from initial state
        let eps_trans = this.initial.getEpsilonTrans();
        if (eps_trans.length != 0) {
            for (let trans of eps_trans) {
                next.add(trans.right);
            }
            this.current.add(...next);
        }

        this.setPath.push(this.current);

        // loop through input
        while (input.length > 0) {
            let str = input.substring(0, 1);
            input = input.substring(1);
            let next = new Set();

            for (let a of this.current) {
                let eps_trans = a.getEpsilonTrans();
                if (eps_trans.length != 0) {
                    for (let trans of eps_trans) {
                        next.add(trans.right);
                    }
                }
                let sym_trans = a.getSymbolTrans(str);
                if (sym_trans.length != 0) {
                    for (let trans of sym_trans) {
                        next.add(trans.right);
                    }
                }
            }

            for (let b of next) {
                let eps_trans = b.getEpsilonTrans();
                if (eps_trans != 0) {
                    for (let trans of eps_trans) {
                        next.add(trans.right);
                    }
                }
            }
            console.log(next);
            this.setPath.push(this.current);
            this.current = next;
        }
        //console.log(this.setPath[this.setPath.length - 1]);
        return this.acceptString();
    }

    // Checks alphabet for repeated symbols or being empty
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

        this.syms = symbols;
        return true;
    }

    // Checks states for repeats or conflicts with alphabet
    // Creates a Map of state names to States (this.states)
    checkStates() {
        if (this.all.length === 0) {
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
    // Creates an array of the appropriate accepting States in this.accepting
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

    // Checks that transitions are valid symbols/states/states, and are not duplicates of prior transitions
    // Sets up connections to check all states are connected
    checkTransitions() {
        if (this.transitions.size === 0) {
            this.error = "Empty transitions";
            return false;
        }

        for (let i in this.transitions) {
            let t = this.transitions[i];

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

            t.source = this.states.get(t.source);
            t.dest = this.states.get(t.dest);

            let src_state = t.source;
            for (let j in src_state.getAllTrans()) {
                let ts = src_state.getAllTrans()[j];
                if ((ts.left == t.symbol) && (ts.right == t.dest)) {
                    this.error = "Transition (" + t.symbol + ", " + t.source.name + ", " + t.dest.name + ") already exists";
                    return false;
                }
            }
            src_state.addTrans(t.symbol, t.dest);

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

    let input_array = input.split(',');
    let states_array = [];
    for (let i in input_array) {
        let str_state = input_array[i];
        states_array[i] = new NFAState(str_state);
    }
    return states_array;
}
