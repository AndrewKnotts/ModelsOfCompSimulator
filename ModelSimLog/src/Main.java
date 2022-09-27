import java.util.*;

public class Main {

    public static void main (String [] args) {
        validOne();

    }

    public static void validOne() {
        DFAState q1 = new DFAState("q1");
        DFAState q2 = new DFAState("q2");
        DFAState q3 = new DFAState("q3");
        DFAState q0 = new DFAState("q0");

        List<DFAState> states = new ArrayList<DFAState>();
        states.add(q1);
        states.add(q2);
        states.add(q3);
        states.add(q0);

        Transition t1 = new Transition("1", q1, q2);
        Transition t2 = new Transition("1", q2, q1);
        Transition t3 = new Transition("0", q0, q1);
        Transition t4 = new Transition("1", q1, q0);
        Transition t5 = new Transition("0", q2, q3);
        Transition t6 = new Transition("0", q3, q2);
        Transition t7 = new Transition("0", q3, q0);
        Transition t8 = new Transition("1", q0, q3);

        List<Transition> ts = new ArrayList<Transition>();
        ts.add(t1);
        ts.add(t2);
        ts.add(t3);
        ts.add(t4);
        ts.add(t5);
        ts.add(t6);
        ts.add(t7);
        ts.add(t8);

        List<String> alphabet = new ArrayList<String>();
        alphabet.add("1");
        alphabet.add("0");

        List<DFAState> accepting = new ArrayList<DFAState>();
        accepting.add(q0);

        DFAModel model = new DFAModel(q0, accepting, states, alphabet, ts);
    }
    public static void calidTwo() {

    }
    public static void validThree() {

    }

}
