import java.util.*;
import java.util.HashSet;

public class DFAModel {

    private DFAState initial;
    private List<DFAState> accepting;
    private List<DFAState> all;
    private List<String> alphabet;
    private DFAState current;
    private Set<String> syms;
    private Set<DFAState> states;
    private List<Transition> transitions;
    private Map<DFAState, List<String>> trans;
    private Map<String, DFAState> stateNames;

    public DFAModel (DFAState _initial, List<DFAState> _accepting, List<DFAState> _all, List<String> _alphabet, List<Transition> ts) {
        initial = _initial;
        accepting = _accepting;
        all = _all;
        alphabet = _alphabet;
        //current = _current;
        transitions = ts;
        trans = new HashMap<DFAState, List<String>>();

        if (!checkAlphabet()) System.out.println("Invalid Alphabet");
        if (!checkStates()) System.out.println("Invalid states");
        if(!checkInitial()) System.out.println("Invalid initial");
        if (!checkAccepting()) System.out.println("Invalid accepting");
        if (!checkTransitions()) System.out.println("Invalid transitions");

        makeConnected(initial);
        for (DFAState s: all) {
            if (!s.connected) {
                // state lives unreachable from initial
                System.out.println("State " + s.name + " is not reachable");
            }
        }
        System.out.println("Valid DFA");

    }

    public boolean checkInputString(String input) {
        DFAState current = initial;
        for(int i = 0; i < input.length(); i++) {
            for(Transition t: transitions) {

            }
        }

        return true;
    }
    public boolean checkAlphabet() {
        if (alphabet.size() == 0) {
            return false;
        }
        Set<String> symbols = new HashSet<String>();
        for(String s: alphabet) {
            if (symbols.contains(s)) return false;
            symbols.add(s);
        }
        this.syms = symbols;
        return true;
    }

    public boolean checkStates() {
        if (all.size() == 0) return false;
        Set<DFAState> states = new HashSet<DFAState>();
        for (DFAState s: all) {
            if (states.contains(s.name) || syms.contains(s.name)) return false;
            states.add(s);
        }
        this.states = states;
        return true;
    }

    public boolean checkInitial() {
        if (states.contains(initial)) {
            initial.connected = true;
            return true;
        }
        return false;
    }

    public boolean checkAccepting() {
        if (accepting.isEmpty()) { return false; }
        for (DFAState s : accepting) {
            if (! (states.contains(s))) { return false;}
            s.accepting = true;
        }
        return true;
    }

    public boolean checkTransitions() {
        if (transitions.isEmpty()) return false;
        for (Transition t: transitions) {
            if (!syms.contains(t.symbol)) {
                return false;
            }
            if (!(states.contains(t.end) && states.contains(t.start))) return false;

            if (trans.containsKey(t.start) && trans.get(t.start).contains(t.symbol)) {
                return false;
            }
            else if (trans.containsKey(t.start)) {
                List<String> newSymbol = trans.get(t.start);
                newSymbol.add(t.symbol);
                trans.put(t.start, newSymbol);
            }
            else {
                List<String> newList = new ArrayList<String>();
                trans.put(t.start, newList);
            }

            if (!t.start.conn.contains(t.end)) {
                t.start.conn.add(t.end);
            }

        }
        return true;
    }

    // call from somewhere
    public void makeConnected(DFAState start) {
        for(DFAState d: start.conn) {
            if (!d.connected) {
                d.connected = true;
                makeConnected(d);
            }
        }
    }
}
