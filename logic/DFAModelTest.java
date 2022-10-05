import org.junit.Before;
import org.junit.jupiter.api.Test;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class DFAModelTest {

    @Before
    void makeDefault() {
        //DFAState normA = new DFAState("A");

    }

    @Test
    void checkInputString1() {
        DFAState oneA = new DFAState("A"); // initial for valid1
        DFAState oneB = new DFAState("B");
        List<DFAState> oneStates = new ArrayList<DFAState>();
        oneStates.add(oneA);
        oneStates.add(oneB);
        List<String> oneAlphabet = new ArrayList<String>();
        oneAlphabet.add("1");
        oneAlphabet.add("0");
        List<DFAState> oneAccept = new ArrayList<DFAState>();
        oneAccept.add(oneB);
        List<Transition> oneTrans = new ArrayList<Transition>();
        Transition one1 = new Transition("0", oneA, oneA);
        Transition one2 = new Transition("1", oneA, oneB);
        Transition one3 = new Transition("1", oneB, oneA);
        Transition one4 = new Transition("0", oneB, oneB);
        oneTrans.add(one1);
        oneTrans.add(one2);
        oneTrans.add(one3);
        oneTrans.add(one4);
        DFAModel valid1 = new DFAModel(oneA, oneAccept, oneStates, oneAlphabet, oneTrans);

        assertTrue(valid1.checkInputString("10101"));
        assertTrue(valid1.checkInputString("1"));
        assertTrue(valid1.checkInputString("1011"));
        assertTrue(valid1.checkInputString("101"));
        assertTrue(valid1.checkInputString("10000"));

        assertFalse(valid1.checkInputString("11"));
        assertFalse(valid1.checkInputString("000101"));
        assertFalse(valid1.checkInputString("0"));
        assertFalse(valid1.checkInputString(""));
        assertFalse(valid1.checkInputString("1001101"));

    }

    @Test
    void checkInputString2() {
        DFAState dA = new DFAState("A");
        DFAState dB = new DFAState("B");
        DFAState dC = new DFAState("C");
        DFAState dD = new DFAState("D");
        DFAState dE = new DFAState("E");
        List<DFAState> all2 = new ArrayList<DFAState>();
        List<DFAState> acc2 = new ArrayList<DFAState>();
        all2.add(dA);
        all2.add(dB);
        all2.add(dC);
        all2.add(dD);
        all2.add(dE);
        acc2.add(dE);
        acc2.add(dD);

        List<String> alph2 = new ArrayList<String>();
        alph2.add("0");
        alph2.add("1");
        alph2.add("2");

        Transition t1 = new Transition("0", dA, dB);
        Transition t2 = new Transition("1", dA, dE);
        Transition t3 = new Transition("1", dB, dE);
        Transition t4 = new Transition("0", dB, dC);
        Transition t5 = new Transition("1", dB, dE);
        Transition t6 = new Transition("2", dB, dB);
        Transition t7 = new Transition("0", dC, dD);
        Transition t8 = new Transition("1", dC, dC);
        Transition t9 = new Transition("2", dC, dB);
        Transition t10 = new Transition("0", dD, dB);
        Transition t11 = new Transition("1", dD, dD);
        Transition t12 = new Transition("2", dD, dE);
        Transition t13 = new Transition("0", dE, dE);
        Transition t14 = new Transition("2", dE, dD);
        List<Transition> transitions2 = new ArrayList<>(Arrays.asList(t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12, t13, t14));

        DFAModel mod2 = new DFAModel(dA, acc2, all2, alph2, transitions2);

        assertTrue(mod2.checkInputString("000"));
        assertTrue(mod2.checkInputString("1"));
        assertTrue(mod2.checkInputString("012"));
        assertTrue(mod2.checkInputString("0002"));
        assertTrue(mod2.checkInputString("022020121"));
        assertTrue(mod2.checkInputString("01220021"));
        assertTrue(mod2.checkInputString("1021020001"));

        // Don't end in accepting state
        assertFalse(mod2.checkInputString(""));
        assertFalse(mod2.checkInputString("0"));
        assertFalse(mod2.checkInputString("020"));
        assertFalse(mod2.checkInputString("120"));
        assertFalse(mod2.checkInputString("00122120"));
        assertFalse(mod2.checkInputString("02220112"));
        assertFalse(mod2.checkInputString("00002011012020"));

        // Try to execute a symbol that can't be executed at point
        assertFalse(mod2.checkInputString("2"));
        assertFalse(mod2.checkInputString("11"));
        assertFalse(mod2.checkInputString("121011"));
        assertFalse(mod2.checkInputString("02200001021"));
    }

    @Test
    void checkAlphabet() {
        List<String> a1 = new ArrayList<String>();
        List<String> a2 = new ArrayList<String>();
        List<String> a3 = new ArrayList<String>();
        List<String> a4 = new ArrayList<String>();

        a1.add("A");
        a1.add("B");
        a1.add("A");

        DFAState s1 = new DFAState("state");
        DFAState ss1 = new DFAState("alsostate");

        List<DFAState> sl1 = new ArrayList<DFAState>();

        sl1.add(s1);
        sl1.add(ss1);

        Transition t1 = new Transition("A", s1, ss1);
        DFAModel moda1 = new DFAModel(s1, sl1, sl1, a1, null);
        assertFalse(moda1.checkAlphabet());

        List<String> emptyAlphabet = new ArrayList<String>();
        DFAModel mod2 = new DFAModel(s1, sl1, sl1, emptyAlphabet, null);
        assertFalse(mod2.checkAlphabet());
    }

    @Test
    void checkStates() {

    }

    @Test
    void checkInitial() {
    }

    @Test
    void checkAccepting() {
    }

    @Test
    void checkTransitions() {
        DFAState a = new DFAState("a");
        DFAState b = new DFAState("b");
        DFAState c = new DFAState("c");

        Transition t1 = new Transition("1", a, b);
        Transition t2 = new Transition("1", a, b);
        Transition t3 = new Transition("0", a, b);
        Transition t4 = new Transition("1", a, c);
        Transition t5 = new Transition("1", c, b);

        assertTrue(t1.equals(t2));
        assertFalse(t1.equals(t3));
        assertFalse(t1.equals(t4));
        assertFalse(t1.equals(t5));
        assertFalse(t2.equals(t3));
        assertFalse(t2.equals(t4));
        assertFalse(t2.equals(t5));
    }

    @Test
    void makeConnected() {
    }

}