import { Tape } from "./Tape";
import { TuringMachine } from "./TuringMachine";
 
it('creates tape', () => {
    let test = new Tape(["a", "b"]);
    expect(test.size()).toEqual(2);
    expect(test.getCurrentValue()).toEqual("a");
});
 
it('shifts left', () => {
    let test = new Tape(["a", "b"], "_", 1);
    test.shiftLeft();
    expect(test.size()).toEqual(2);
    expect(test.getCurrentValue()).toEqual("a");
});
 
it('shifts right', () => {
    let test = new Tape(["a", "b"]);
    test.shiftRight();
    expect(test.size()).toEqual(2);
    expect(test.getCurrentValue()).toEqual("b");
});
 
it('creates', () => {
    let test = new Tape(["a", "b", "c"], "_");
    expect(test.size()).toEqual(3);
    expect(test.getCurrentValue()).toEqual("a");
});
 
it('inserts tail', () => {
    let test = new Tape(["a"]);
    expect(test.size()).toEqual(1);
    test.insertTail("b");
    expect(test.size()).toEqual(2);
    expect(test.tail.value).toEqual("b");
});
 
it('shifts right and inserts', () => {
    let test = new Tape(["a"]);
    expect(test.size()).toEqual(1);
    test.shiftRight();
    expect(test.size()).toEqual(2);
    expect(test.tail.value).toEqual("_");
});

it('shifts left and inserts', () => {
    let test = new Tape(["a"]);
    expect(test.size()).toEqual(1);
    test.shiftLeft();
    expect(test.size()).toEqual(2);
    expect(test.head.value).toEqual("_");
});
 
it('gets index', () => {
    let test = new Tape(["a", "b", "c", "d"]);
    expect(test.getIndex(0).value).toEqual("a");
    expect(test.getIndex(1).value).toEqual("b");
    expect(test.getIndex(2).value).toEqual("c");
    expect(test.getIndex(3).value).toEqual("d");
});
 
it('builds TM model', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let test = new TuringMachine("A,B,H", "0,1", "(A, 0) -> (B, 1, >); (B, 0) -> (B, 0, <)", "A", "H", "H", 0);
    expect(test.error).toEqual(null);
});

it('rejects TM with empty alphabet', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "A,B,H";
    let alphabet = "";
    let startState = "A";
    let haltStates = "H";
    let acceptingStates = "H";
    let transitions = "(A, 1)->(B, 1, <);(A,0)->(B,1,>); (B,0)->(A,1, <); (B, 1)->(H,1,>)"
    let test = new TuringMachine(states, alphabet, transitions, startState, haltStates, acceptingStates, "0");
    expect(test.error).toEqual('Empty alphabet');
    expect(window.alert).toBeCalledWith("Empty alphabet");
});

it('rejects TM with duplicate in alphabet', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "A,B,H";
    let alphabet = "0,1,1";
    let startState = "A";
    let haltStates = "H";
    let acceptingStates = "H";
    let transitions = "(A, 1)->(B, 1, <);(A,0)->(B,1,>); (B,0)->(A,1, <); (B, 1)->(H,1,>)"
    let test = new TuringMachine(states, alphabet, transitions, startState, haltStates, acceptingStates, "0");
    expect(test.error).toEqual('Duplicate in alphabet: 1');
    expect(window.alert).toBeCalledWith(test.error);
});

it('rejects TM with empty states', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "";
    let alphabet = "0,1";
    let startState = "A";
    let haltStates = "H";
    let acceptingStates = "H";
    let transitions = "(A, 1)->(B, 1, <);(A,0)->(B,1,>); (B,0)->(A,1, <); (B, 1)->(H,1,>)"
    let test = new TuringMachine(states, alphabet, transitions, startState, haltStates, acceptingStates, "0");
    expect(test.error).toEqual('Empty states');
    expect(window.alert).toBeCalledWith(test.error);
});

it('rejects TM with conflicting state name', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "s0, 1";
    let alphabet = "0,1";
    let startState = "A";
    let haltStates = "H";
    let acceptingStates = "H";
    let transitions = "(A, 1)->(B, 1, <);(A,0)->(B,1,>); (B,0)->(A,1, <); (B, 1)->(H,1,>)"
    let test = new TuringMachine(states, alphabet, transitions, startState, haltStates, acceptingStates, "0");
    expect(test.error).toEqual('Conflicting state name: 1');
    expect(window.alert).toBeCalledWith(test.error);
});

it('rejects TM with invalid initial state', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "A, B, H";
    let alphabet = "0,1";
    let startState = "Q";
    let haltStates = "H";
    let acceptingStates = "H";
    let transitions = "(A, 1)->(B, 1, <);(A,0)->(B,1,>); (B,0)->(A,1, <); (B, 1)->(H,1,>)"
    let test = new TuringMachine(states, alphabet, transitions, startState, haltStates, acceptingStates, "0");
    expect(test.error).toEqual('Invalid initial state');
    expect(window.alert).toBeCalledWith(test.error);
});

it('rejects TM with empty initial', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "A, B,H";
    let alphabet = "0,1";
    let startState = "";
    let haltStates = "H";
    let acceptingStates = "H";
    let transitions = "(A, 1)->(B, 1, <);(A,0)->(B,1,>); (B,0)->(A,1, <); (B, 1)->(H,1,>)"
    let test = new TuringMachine(states, alphabet, transitions, startState, haltStates, acceptingStates, "0");
    expect(test.error).toEqual('Invalid initial state');
    expect(window.alert).toBeCalledWith(test.error);
});

it('rejects TM with empty halting', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "A, B,H";
    let alphabet = "0,1";
    let startState = "A";
    let haltStates = "";
    let acceptingStates = "H";
    let transitions = "(A, 1)->(B, 1, <);(A,0)->(B,1,>); (B,0)->(A,1, <); (B, 1)->(H,1,>)"
    let test = new TuringMachine(states, alphabet, transitions, startState, haltStates, acceptingStates, "0");
    expect(test.error).toEqual('Empty halting states');
    expect(window.alert).toBeCalledWith(test.error);
});

it('rejects TM with invalid halting', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "A, B,H";
    let alphabet = "0,1";
    let startState = "A";
    let haltStates = "Q";
    let acceptingStates = "H";
    let transitions = "(A, 1)->(B, 1, <);(A,0)->(B,1,>); (B,0)->(A,1, <); (B, 1)->(H,1,>)"
    let test = new TuringMachine(states, alphabet, transitions, startState, haltStates, acceptingStates, "0");
    expect(test.error).toEqual('Halting state Q does not exist');
    expect(window.alert).toBeCalledWith(test.error);
});

it('rejects TM with empty accepting', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "A, B,H";
    let alphabet = "0,1";
    let startState = "A";
    let haltStates = "H";
    let acceptingStates = "";
    let transitions = "(A, 1)->(B, 1, <);(A,0)->(B,1,>); (B,0)->(A,1, <); (B, 1)->(H,1,>)"
    let test = new TuringMachine(states, alphabet, transitions, startState, haltStates, acceptingStates, "0");
    expect(test.error).toEqual('Empty accepting states');
    expect(window.alert).toBeCalledWith(test.error);
});

it('rejects TM with invalid accepting', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "A, B,H";
    let alphabet = "0,1";
    let startState = "A";
    let haltStates = "H";
    let acceptingStates = "Q";
    let transitions = "(A, 1)->(B, 1, <);(A,0)->(B,1,>); (B,0)->(A,1, <); (B, 1)->(H,1,>)"
    let test = new TuringMachine(states, alphabet, transitions, startState, haltStates, acceptingStates, "0");
    expect(test.error).toEqual('Accepting state Q does not exist');
    expect(window.alert).toBeCalledWith(test.error);
});
 
it('rejects TM with non-halting accepting', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "A, B,H";
    let alphabet = "0,1";
    let startState = "A";
    let haltStates = "H";
    let acceptingStates = "A";
    let transitions = "(A, 1)->(B, 1, <);(A,0)->(B,1,>); (B,0)->(A,1, <); (B, 1)->(H,1,>)"
    let test = new TuringMachine(states, alphabet, transitions, startState, haltStates, acceptingStates, "0");
    expect(test.error).toEqual('Accepting state A does not halt');
    expect(window.alert).toBeCalledWith(test.error);
});

it('rejects TM with empty transitions', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "A, B,H";
    let alphabet = "0,1";
    let startState = "A";
    let haltStates = "H";
    let acceptingStates = "H";
    let transitions = "";
    let test = new TuringMachine(states, alphabet, transitions, startState, haltStates, acceptingStates, "0");
    expect(test.error).toEqual('Empty transitions');
    expect(window.alert).toBeCalledWith(test.error);
});

it('rejects TM with invalid start state in transition', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "A, B,H";
    let alphabet = "0,1";
    let startState = "A";
    let haltStates = "H";
    let acceptingStates = "H";
    let transitions = "(Q, 1)->(B, 1, <);(A,0)->(B,1,>); (B,0)->(A,1, <); (B, 1)->(H,1,>)";
    let test = new TuringMachine(states, alphabet, transitions, startState, haltStates, acceptingStates, "0");
    expect(test.error).toEqual('Invalid state in transition: (Q, 1) -> (B, 1, <)');
    expect(window.alert).toBeCalledWith(test.error);
});

it('rejects TM with invalid symbol in transition', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "A, B,H";
    let alphabet = "0,1";
    let startState = "A";
    let haltStates = "H";
    let acceptingStates = "H";
    let transitions = "(A, 2)->(B, 1, <);(A,0)->(B,1,>); (B,0)->(A,1, <); (B, 1)->(H,1,>)";
    let test = new TuringMachine(states, alphabet, transitions, startState, haltStates, acceptingStates, "0");
    expect(test.error).toEqual('Invalid symbol in transition: (A, 2) -> (B, 1, <)');
    expect(window.alert).toBeCalledWith(test.error);
});

it('rejects TM with invalid next state in transition', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "A, B,H";
    let alphabet = "0,1";
    let startState = "A";
    let haltStates = "H";
    let acceptingStates = "H";
    let transitions = "(A, 1)->(Q, 1, <);(A,0)->(B,1,>); (B,0)->(A,1, <); (B, 1)->(H,1,>)";
    let test = new TuringMachine(states, alphabet, transitions, startState, haltStates, acceptingStates, "0");
    expect(test.error).toEqual('Invalid next state in transition: (A, 1) -> (Q, 1, <)');
    expect(window.alert).toBeCalledWith(test.error);
});

it('rejects TM with invalid write in transition', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "A, B,H";
    let alphabet = "0,1";
    let startState = "A";
    let haltStates = "H";
    let acceptingStates = "H";
    let transitions = "(A, 1)->(B, 2, <);(A,0)->(B,1,>); (B,0)->(A,1, <); (B, 1)->(H,1,>)";
    let test = new TuringMachine(states, alphabet, transitions, startState, haltStates, acceptingStates, "0");
    expect(test.error).toEqual('Invalid write in transition: (A, 1) -> (B, 2, <)');
    expect(window.alert).toBeCalledWith(test.error);
});

it('rejects TM with invalid move in transition', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "A, B,H";
    let alphabet = "0,1";
    let startState = "A";
    let haltStates = "H";
    let acceptingStates = "H";
    let transitions = "(A, 1)->(B, 1, _);(A,0)->(B,1,>); (B,0)->(A,1, <); (B, 1)->(H,1,>)";
    let test = new TuringMachine(states, alphabet, transitions, startState, haltStates, acceptingStates, "0");
    expect(test.error).toEqual('Invalid move in transition: (A, 1) -> (B, 1, _)');
    expect(window.alert).toBeCalledWith(test.error);
});

it('rejects TM with invalid character in input string', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "A, B,H";
    let alphabet = "0,1";
    let startState = "A";
    let haltStates = "H";
    let acceptingStates = "H";
    let transitions = "(A, 1)->(B, 1, <);(A,0)->(B,1,>); (B,0)->(A,1, <); (B, 1)->(H,1,>)";
    let test = new TuringMachine(states, alphabet, transitions, startState, haltStates, acceptingStates, "0");
    test.simulateTape("A");
    expect(window.alert).toBeCalledWith('Character \'A\' is invalid');
})

it('tests TM model 1 0', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "A,B,H";
    let alphabet = "0,1";
    let startState = "A";
    let haltStates = "H";
    let acceptingStates = "H";
    let transitions = "(A, 1)->(B, 1, <);(A,0)->(B,1,>); (B,0)->(A,1, <); (B, 1)->(H,1,>);"
    let test = new TuringMachine(states, alphabet, transitions, startState, haltStates, acceptingStates, "0");
    expect(test.error).toEqual(null);
    expect(test.simulateTape("0")).toEqual(true);
});

it('tests TM model 1 1110', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "A,B,H";
    let alphabet = "0,1";
    let startState = "A";
    let haltStates = "H";
    let acceptingStates = "H";
    let transitions = "(A, 1)->(B, 1, <);(A,0)->(B,1,>); (B,0)->(A,1, <); (B, 1)->(H,1,>);"
    let test = new TuringMachine(states, alphabet, transitions, startState, haltStates, acceptingStates, "0");
    expect(test.error).toEqual(null);
    expect(test.simulateTape("1110")).toEqual(true);
});

it('tests TM model 2 101', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "s0, 1o, 1i, 2o, 2i, 3, 4, A, R";
    let alphabet = "0,1";
    let startState = "s0";
    let haltStates = "A, R";
    let acceptingStates = "A";
    let transitions = "(s0, 0) -> (1o, _, >); (s0, 1) -> (1i, _, >); (s0, _) -> (A, _, |); (1o, _) -> (2o, _, <);" +
        "(1o, 0) -> (1o, 0, >); (1o, 1) -> (1o, 1, >);(1i, _) -> (2i, _, <);(1i, 0) -> (1i, 0, >);(1i, 1) -> (1i, 1, >);" +
        "(2o, 0) -> (3, _, <); (2o, _) -> (A, _, |); (2o, 1) -> (R, _, |); (2i, 1) -> (3, _, <); (2i, _) -> (A, _, |);" +
        "(2i, 0) -> (R, 0, |); (3, _) -> (A, _, |); (3, 0) -> (4, 0, <); (3, 1) -> (4, 1, <); (4, 0) -> (4, 0, <);" +
        "(4, 1) -> (4, 1, <); (4, _) -> (s0, _, >)";
    let test = new TuringMachine(states, alphabet, transitions, startState, haltStates, acceptingStates, "_");
    expect(test.error).toEqual(null);
    expect(test.simulateTape("101")).toEqual(true);
});

it('tests TM model 2 empty', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "s0, 1o, 1i, 2o, 2i, 3, 4, A, R";
    let alphabet = "0,1";
    let startState = "s0";
    let haltStates = "A, R";
    let acceptingStates = "A";
    let transitions = "(s0, 0) -> (1o, _, >); (s0, 1) -> (1i, _, >); (s0, _) -> (A, _, |); (1o, _) -> (2o, _, <);" +
        "(1o, 0) -> (1o, 0, >); (1o, 1) -> (1o, 1, >);(1i, _) -> (2i, _, <);(1i, 0) -> (1i, 0, >);(1i, 1) -> (1i, 1, >);" +
        "(2o, 0) -> (3, _, <); (2o, _) -> (A, _, |); (2o, 1) -> (R, _, |); (2i, 1) -> (3, _, <); (2i, _) -> (A, _, |);" +
        "(2i, 0) -> (R, 0, |); (3, _) -> (A, _, |); (3, 0) -> (4, 0, <); (3, 1) -> (4, 1, <); (4, 0) -> (4, 0, <);" +
        "(4, 1) -> (4, 1, <); (4, _) -> (s0, _, >)";
    let test = new TuringMachine(states, alphabet, transitions, startState, haltStates, acceptingStates, "_");
    expect(test.error).toEqual(null);
    expect(test.simulateTape("")).toEqual(true);
});

it('tests TM model 2 1', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "s0, 1o, 1i, 2o, 2i, 3, 4, A, R";
    let alphabet = "0,1";
    let startState = "s0";
    let haltStates = "A, R";
    let acceptingStates = "A";
    let transitions = "(s0, 0) -> (1o, _, >); (s0, 1) -> (1i, _, >); (s0, _) -> (A, _, |); (1o, _) -> (2o, _, <);" +
        "(1o, 0) -> (1o, 0, >); (1o, 1) -> (1o, 1, >);(1i, _) -> (2i, _, <);(1i, 0) -> (1i, 0, >);(1i, 1) -> (1i, 1, >);" +
        "(2o, 0) -> (3, _, <); (2o, _) -> (A, _, |); (2o, 1) -> (R, _, |); (2i, 1) -> (3, _, <); (2i, _) -> (A, _, |);" +
        "(2i, 0) -> (R, 0, |); (3, _) -> (A, _, |); (3, 0) -> (4, 0, <); (3, 1) -> (4, 1, <); (4, 0) -> (4, 0, <);" +
        "(4, 1) -> (4, 1, <); (4, _) -> (s0, _, >)";
    let test = new TuringMachine(states, alphabet, transitions, startState, haltStates, acceptingStates, "_");
    expect(test.error).toEqual(null);
    expect(test.simulateTape("1")).toEqual(true);
});

it('tests TM model 2 0', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "s0, 1o, 1i, 2o, 2i, 3, 4, A, R";
    let alphabet = "0,1";
    let startState = "s0";
    let haltStates = "A, R";
    let acceptingStates = "A";
    let transitions = "(s0, 0) -> (1o, _, >); (s0, 1) -> (1i, _, >); (s0, _) -> (A, _, |); (1o, _) -> (2o, _, <);" +
        "(1o, 0) -> (1o, 0, >); (1o, 1) -> (1o, 1, >);(1i, _) -> (2i, _, <);(1i, 0) -> (1i, 0, >);(1i, 1) -> (1i, 1, >);" +
        "(2o, 0) -> (3, _, <); (2o, _) -> (A, _, |); (2o, 1) -> (R, _, |); (2i, 1) -> (3, _, <); (2i, _) -> (A, _, |);" +
        "(2i, 0) -> (R, 0, |); (3, _) -> (A, _, |); (3, 0) -> (4, 0, <); (3, 1) -> (4, 1, <); (4, 0) -> (4, 0, <);" +
        "(4, 1) -> (4, 1, <); (4, _) -> (s0, _, >)";
    let test = new TuringMachine(states, alphabet, transitions, startState, haltStates, acceptingStates, "_");
    expect(test.error).toEqual(null);
    expect(test.simulateTape("0")).toEqual(true);
});

it('tests TM model 2 10111101', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "s0, 1o, 1i, 2o, 2i, 3, 4, A, R";
    let alphabet = "0,1";
    let startState = "s0";
    let haltStates = "A, R";
    let acceptingStates = "A";
    let transitions = "(s0, 0) -> (1o, _, >); (s0, 1) -> (1i, _, >); (s0, _) -> (A, _, |); (1o, _) -> (2o, _, <);" +
        "(1o, 0) -> (1o, 0, >); (1o, 1) -> (1o, 1, >);(1i, _) -> (2i, _, <);(1i, 0) -> (1i, 0, >);(1i, 1) -> (1i, 1, >);" +
        "(2o, 0) -> (3, _, <); (2o, _) -> (A, _, |); (2o, 1) -> (R, _, |); (2i, 1) -> (3, _, <); (2i, _) -> (A, _, |);" +
        "(2i, 0) -> (R, 0, |); (3, _) -> (A, _, |); (3, 0) -> (4, 0, <); (3, 1) -> (4, 1, <); (4, 0) -> (4, 0, <);" +
        "(4, 1) -> (4, 1, <); (4, _) -> (s0, _, >)";
    let test = new TuringMachine(states, alphabet, transitions, startState, haltStates, acceptingStates, "_");
    expect(test.error).toEqual(null);
    expect(test.simulateTape("10111101")).toEqual(true);
});

it('tests TM model 2 1010', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "s0, 1o, 1i, 2o, 2i, 3, 4, A, R";
    let alphabet = "0,1";
    let startState = "s0";
    let haltStates = "A, R";
    let acceptingStates = "A";
    let transitions = "(s0, 0) -> (1o, _, >); (s0, 1) -> (1i, _, >); (s0, _) -> (A, _, |); (1o, _) -> (2o, _, <);" +
        "(1o, 0) -> (1o, 0, >); (1o, 1) -> (1o, 1, >);(1i, _) -> (2i, _, <);(1i, 0) -> (1i, 0, >);(1i, 1) -> (1i, 1, >);" +
        "(2o, 0) -> (3, _, <); (2o, _) -> (A, _, |); (2o, 1) -> (R, _, |); (2i, 1) -> (3, _, <); (2i, _) -> (A, _, |);" +
        "(2i, 0) -> (R, 0, |); (3, _) -> (A, _, |); (3, 0) -> (4, 0, <); (3, 1) -> (4, 1, <); (4, 0) -> (4, 0, <);" +
        "(4, 1) -> (4, 1, <); (4, _) -> (s0, _, >)";
    let test = new TuringMachine(states, alphabet, transitions, startState, haltStates, acceptingStates, "_");
    expect(test.error).toEqual(null);
    expect(test.simulateTape("1010")).toEqual(false);
});

it('tests TM model 2 10110', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "s0, 1o, 1i, 2o, 2i, 3, 4, A, R";
    let alphabet = "0,1";
    let startState = "s0";
    let haltStates = "A, R";
    let acceptingStates = "A";
    let transitions = "(s0, 0) -> (1o, _, >); (s0, 1) -> (1i, _, >); (s0, _) -> (A, _, |); (1o, _) -> (2o, _, <);" +
        "(1o, 0) -> (1o, 0, >); (1o, 1) -> (1o, 1, >);(1i, _) -> (2i, _, <);(1i, 0) -> (1i, 0, >);(1i, 1) -> (1i, 1, >);" +
        "(2o, 0) -> (3, _, <); (2o, _) -> (A, _, |); (2o, 1) -> (R, _, |); (2i, 1) -> (3, _, <); (2i, _) -> (A, _, |);" +
        "(2i, 0) -> (R, 0, |); (3, _) -> (A, _, |); (3, 0) -> (4, 0, <); (3, 1) -> (4, 1, <); (4, 0) -> (4, 0, <);" +
        "(4, 1) -> (4, 1, <); (4, _) -> (s0, _, >)";
    let test = new TuringMachine(states, alphabet, transitions, startState, haltStates, acceptingStates, "_");
    expect(test.error).toEqual(null);
    expect(test.simulateTape("10110")).toEqual(false);
});