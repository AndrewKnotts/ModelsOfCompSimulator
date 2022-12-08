import { Tape } from "./Tape";
import { TuringMachine } from "./TuringMachine";
 
it('test works', () => {
    expect(1+2).toEqual(3);
  });
 
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
 
/*it('rejects when going out of bounds to left', () => {
    let test = new Tape(["a", "b", "c"], "_");
    expect(test.size()).toEqual(3);
    expect(test.shiftLeft()).toEqual(false);
}); */
 
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
})
 
it('gets index', () => {
    let test = new Tape(["a", "b", "c", "d"]);
    expect(test.getIndex(0).value).toEqual("a");
    expect(test.getIndex(1).value).toEqual("b");
    expect(test.getIndex(2).value).toEqual("c");
    expect(test.getIndex(3).value).toEqual("d");
})
 
it('builds TM model', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let test = new TuringMachine("A,B,H", "0,1", "(A, 0) -> (B, 1, >); (B, 0) -> (B, 0, <)", "A", "H", "H", 0);
    expect(test.error).toEqual(null);
})
 
it('tests TM model 1', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "A,B,H";
    let alphabet = "0,1";
    let startState = "A";
    let haltStates = "H";
    let acceptingStates = "H";
    let transitions = "(A, 1)->(B, 1, <);(A,0)->(B,1,>); (B,0)->(A,1, <); (B, 1)->(H,1,>)"
    let test = new TuringMachine(states, alphabet, transitions, startState, haltStates, acceptingStates, "0");
    expect(test.error).toEqual(null);
    expect(test.simulateTape("0000000000")).toEqual(true);
})

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
})

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
})