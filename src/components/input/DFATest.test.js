import { DFAModel, Transition, State, parseAlphabet, parseStates, parseTransition } from './DFAModel.js';

it('test works', () => {
  expect(1+2).toEqual(3);
});

it('rejects model with empty alphabet', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "s0";
    let accepting = "s0";
    let allStates = "s0, s1, s2";
    let alphabet = "";
    let transitions = "(0, s0, s0); (1,s0,s1);(0,s1,s2);(1,s1,s0);(0,s2,s1);(1,s2,s2)";
    let DFATest = new DFAModel(initial, accepting, allStates, alphabet, transitions);
    expect(window.alert).toBeCalledWith("Empty alphabet");
}); 

it('rejects model with duplicates in alphabet', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "s0";
    let accepting = "s0";
    let allStates = "s0, s1, s2";
    let alphabet = "0,1,0";
    let transitions = "(0, s0, s0); (1,s0,s1);(0,s1,s2);(1,s1,s0);(0,s2,s1);(1,s2,s2)";
    let DFATest = new DFAModel(initial, accepting, allStates, alphabet, transitions);
    expect(window.alert).toBeCalledWith("Duplicate in alphabet: 0");
});

it('rejects model with empty states', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "s0";
    let accepting = "s0";
    let allStates = "";
    let alphabet = "0,1";
    let transitions = "(0, s0, s0); (1,s0,s1);(0,s1,s2);(1,s1,s0);(0,s2,s1);(1,s2,s2)";
    let DFATest = new DFAModel(initial, accepting, allStates, alphabet, transitions);
    expect(window.alert).toBeCalledWith("Empty States");
});

it('rejects model with duplicates in states', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "s0";
    let accepting = "s0";
    let allStates = "s0,s1,s2,s0";
    let alphabet = "0,1";
    let transitions = "(0, s0, s0); (1,s0,s1);(0,s1,s2);(1,s1,s0);(0,s2,s1);(1,s2,s2)";
    let DFATest = new DFAModel(initial, accepting, allStates, alphabet, transitions);
    expect(window.alert).toBeCalledWith("Conflicting state name: s0");
});

it('rejects model with alphabet symbol as a state', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "s0";
    let accepting = "s0";
    let allStates = "s0,s1,1,s2";
    let alphabet = "0,1";
    let transitions = "(0, s0, s0); (1,s0,s1);(0,s1,s2);(1,s1,s0);(0,s2,s1);(1,s2,s2)";
    let DFATest = new DFAModel(initial, accepting, allStates, alphabet, transitions);
    expect(window.alert).toBeCalledWith("Conflicting state name: 1");
});

it('rejects model with empty initial', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "";
    let accepting = "s0";
    let allStates = "s0,s1,s2";
    let alphabet = "0,1";
    let transitions = "(0, s0, s0); (1,s0,s1);(0,s1,s2);(1,s1,s0);(0,s2,s1);(1,s2,s2)";
    let DFATest = new DFAModel(initial, accepting, allStates, alphabet, transitions);
    expect(window.alert).toBeCalledWith("Invalid initial state");
});

it('rejects model with invalid initial', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "0";
    let accepting = "s0";
    let allStates = "s0,s1,s2";
    let alphabet = "0,1";
    let transitions = "(0, s0, s0); (1,s0,s1);(0,s1,s2);(1,s1,s0);(0,s2,s1);(1,s2,s2)";
    let DFATest = new DFAModel(initial, accepting, allStates, alphabet, transitions);
    expect(window.alert).toBeCalledWith("Invalid initial state");
});

it('rejects model with empty accepting', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "s0";
    let accepting = "";
    let allStates = "s0,s1,s2";
    let alphabet = "0,1";
    let transitions = "(0, s0, s0); (1,s0,s1);(0,s1,s2);(1,s1,s0);(0,s2,s1);(1,s2,s2)";
    let DFATest = new DFAModel(initial, accepting, allStates, alphabet, transitions);
    expect(window.alert).toBeCalledWith("Empty accepting states");
});

it('rejects model with invalid accepting', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "s0";
    let accepting = "s0,s3";
    let allStates = "s0,s1,s2";
    let alphabet = "0,1";
    let transitions = "(0, s0, s0); (1,s0,s1);(0,s1,s2);(1,s1,s0);(0,s2,s1);(1,s2,s2)";
    let DFATest = new DFAModel(initial, accepting, allStates, alphabet, transitions);
    expect(window.alert).toBeCalledWith("Accepting state s3 does not exist");
});

it('rejects model with empty transitions', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "s0";
    let accepting = "s0";
    let allStates = "s0,s1,s2";
    let alphabet = "0,1";
    let transitions = "";
    let DFATest = new DFAModel(initial, accepting, allStates, alphabet, transitions);
    expect(window.alert).toBeCalledWith("Empty transitions");
});

it('rejects model with invalid symbol of transition', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "s0";
    let accepting = "s0";
    let allStates = "s0,s1,s2";
    let alphabet = "0,1";
    let transitions = "(a, s0, s0); (1,s0,s1);(0,s1,s2);(1,s1,s0);(0,s2,s1);(1,s2,s2)";
    let DFATest = new DFAModel(initial, accepting, allStates, alphabet, transitions);
    expect(window.alert).toBeCalledWith("Invalid symbol in transition: (a, s0, s0)");
});

it('rejects model with invalid source of transition', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "s0";
    let accepting = "s0";
    let allStates = "s0,s1,s2";
    let alphabet = "0,1";
    let transitions = "(0, s0, s0); (1,s0,s1);(0,1,s2);(1,s1,s0);(0,s2,s1);(1,s2,s2)";
    let DFATest = new DFAModel(initial, accepting, allStates, alphabet, transitions);
    expect(window.alert).toBeCalledWith("Invalid source in transition: (0, 1, s2)");
});

it('rejects model with invalid destination of transition', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "s0";
    let accepting = "s0";
    let allStates = "s0,s1,s2";
    let alphabet = "0,1";
    let transitions = "(0, s0, s0); (1,s0,s1);(0,s1,s2);(1,s1,s0);(0,s2,s3);(1,s2,s2)";
    let DFATest = new DFAModel(initial, accepting, allStates, alphabet, transitions);
    expect(window.alert).toBeCalledWith("Invalid destination in transition: (0, s2, s3)");
});

it('rejects model with duplicate transition', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "s0";
    let accepting = "s0";
    let allStates = "s0,s1,s2";
    let alphabet = "0,1";
    let transitions = "(0, s0, s0); (1,s0,s1);(0,s1,s2);(1,s1,s0);(0,s2,s1);(1,s2,s2);(0,s0,s0)";
    let DFATest = new DFAModel(initial, accepting, allStates, alphabet, transitions);
    expect(window.alert).toBeCalledWith("State s0 has multiple transitions for symbol 0");
});

it('rejects model with two dests for one src/symbol', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "s0";
    let accepting = "s0";
    let allStates = "s0,s1,s2";
    let alphabet = "0,1";
    let transitions = "(0, s0, s0); (1,s0,s1);(0,s1,s2);(1,s1,s0);(0,s2,s1);(1,s2,s2);(1,s2,s0)";
    let DFATest = new DFAModel(initial, accepting, allStates, alphabet, transitions);
    expect(window.alert).toBeCalledWith("State s2 has multiple transitions for symbol 1");
});

it('rejects model with no transitions for a state', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "s0";
    let accepting = "s0";
    let allStates = "s0,s1,s2";
    let alphabet = "0,1";
    let transitions = "(0, s0, s0); (1,s0,s1);(0,s1,s2);(1,s1,s0)";
    let DFATest = new DFAModel(initial, accepting, allStates, alphabet, transitions);
    expect(window.alert).toBeCalledWith("State s2 has no transitions");
}); 

it('rejects model with missing symbols for a state', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "s0";
    let accepting = "s0";
    let allStates = "s0,s1,s2";
    let alphabet = "0,1";
    let transitions = "(0, s0, s0); (1,s0,s1);(0,s1,s2);(1,s1,s0);(0,s2,s1)";
    let DFATest = new DFAModel(initial, accepting, allStates, alphabet, transitions);
    expect(window.alert).toBeCalledWith("State s2 has no transition for symbol 1");
});

it('accepts sample string 1 for test model 1', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "s0";
    let accepting = "s0";
    let allStates = "s0, s1, s2";
    let alphabet = "0,1";
    let transitions = "(0, s0, s0); (1,s0,s1);(0,s1,s2);(1,s1,s0);(0,s2,s1);(1,s2,s2);";
    let test = new DFAModel(initial, accepting, allStates, alphabet, transitions);
    test.checkInputString("10111110100");
    expect(test.acceptanceResult).toBe(true);
});

it('accepts sample string 2 for test model 1', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "s0";
    let accepting = "s0";
    let allStates = "s0, s1, s2";
    let alphabet = "0,1";
    let transitions = "(0, s0, s0); (1,s0,s1);(0,s1,s2);(1,s1,s0);(0,s2,s1);(1,s2,s2)";
    let test = new DFAModel(initial, accepting, allStates, alphabet, transitions);
    test.checkInputString("101111101");
    expect(test.acceptanceResult).toBe(true);
});

it('accepts sample string 3 for test model 1', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "s0";
    let accepting = "s0";
    let allStates = "s0, s1, s2";
    let alphabet = "0,1";
    let transitions = "(0, s0, s0); (1,s0,s1);(0,s1,s2);(1,s1,s0);(0,s2,s1);(1,s2,s2)";
    let test = new DFAModel(initial, accepting, allStates, alphabet, transitions);
    test.checkInputString("1001");
    expect(test.acceptanceResult).toBe(true);
});

it('rejects sample string 1 for test model 1', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "s0";
    let accepting = "s0";
    let allStates = "s0, s1, s2";
    let alphabet = "0,1";
    let transitions = "(0, s0, s0); (1,s0,s1);(0,s1,s2);(1,s1,s0);(0,s2,s1);(1,s2,s2)";
    let test = new DFAModel(initial, accepting, allStates, alphabet, transitions);
    test.checkInputString("1011111011");
    expect(test.acceptanceResult).toBe(false);
});

it('rejects sample string 2 for test model 1', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "s0";
    let accepting = "s0";
    let allStates = "s0, s1, s2";
    let alphabet = "0,1";
    let transitions = "(0, s0, s0); (1,s0,s1);(0,s1,s2);(1,s1,s0);(0,s2,s1);(1,s2,s2)";
    let test = new DFAModel(initial, accepting, allStates, alphabet, transitions);
    test.checkInputString("10");
    expect(test.acceptanceResult).toBe(false);
});

it('rejects sample string 3 for test model 1', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "s0";
    let accepting = "s0";
    let allStates = "s0, s1, s2";
    let alphabet = "0,1";
    let transitions = "(0, s0, s0); (1,s0,s1);(0,s1,s2);(1,s1,s0);(0,s2,s1);(1,s2,s2)";
    let test = new DFAModel(initial, accepting, allStates, alphabet, transitions);
    test.checkInputString("1010101");
    expect(test.acceptanceResult).toBe(false);
});

it('accepts sample string 1 for test model 2', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "q0";
    let accepting = "q3,q4";
    let allStates = "q0,q1,q2,q3,q4";
    let alphabet = "0,1";
    let transitions = "(0,q0,q1);(1,q0,q2);(0,q1,q3);(1,q1,q2);(0,q2,q1);(1,q2,q4);(0,q3,q3);(1,q3,q2);(0,q4,q1);(1,q4,q4)";
    let test = new DFAModel(initial, accepting, allStates, alphabet, transitions);
    test.checkInputString("0000000");
    expect(test.acceptanceResult).toBe(true);
});

it('accepts sample string 2 for test model 2', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "q0";
    let accepting = "q3,q4";
    let allStates = "q0,q1,q2,q3,q4";
    let alphabet = "0,1";
    let transitions = "(0,q0,q1);(1,q0,q2);(0,q1,q3);(1,q1,q2);(0,q2,q1);(1,q2,q4);(0,q3,q3);(1,q3,q2);(0,q4,q1);(1,q4,q4)";
    let test = new DFAModel(initial, accepting, allStates, alphabet, transitions);
    test.checkInputString("111111");
    expect(test.acceptanceResult).toBe(true);
});

it('accepts sample string 3 for test model 2', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "q0";
    let accepting = "q3,q4";
    let allStates = "q0,q1,q2,q3,q4";
    let alphabet = "0,1";
    let transitions = "(0,q0,q1);(1,q0,q2);(0,q1,q3);(1,q1,q2);(0,q2,q1);(1,q2,q4);(0,q3,q3);(1,q3,q2);(0,q4,q1);(1,q4,q4)";
    let test = new DFAModel(initial, accepting, allStates, alphabet, transitions);
    test.checkInputString("0000011");
    expect(test.acceptanceResult).toBe(true);
});


it('rejects sample string 1 for test model 2', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "q0";
    let accepting = "q3,q4";
    let allStates = "q0,q1,q2,q3,q4";
    let alphabet = "0,1";
    let transitions = "(0,q0,q1);(1,q0,q2);(0,q1,q3);(1,q1,q2);(0,q2,q1);(1,q2,q4);(0,q3,q3);(1,q3,q2);(0,q4,q1);(1,q4,q4)";
    let test = new DFAModel(initial, accepting, allStates, alphabet, transitions);
    test.checkInputString("000001");
    expect(test.acceptanceResult).toBe(false);
});

it('rejects sample string 2 for test model 2', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "q0";
    let accepting = "q3,q4";
    let allStates = "q0,q1,q2,q3,q4";
    let alphabet = "0,1";
    let transitions = "(0,q0,q1);(1,q0,q2);(0,q1,q3);(1,q1,q2);(0,q2,q1);(1,q2,q4);(0,q3,q3);(1,q3,q2);(0,q4,q1);(1,q4,q4)";
    let test = new DFAModel(initial, accepting, allStates, alphabet, transitions);
    test.checkInputString("010101010");
    expect(test.acceptanceResult).toBe(false);
});

it('rejects sample string 3 for test model 2', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "q0";
    let accepting = "q3,q4";
    let allStates = "q0,q1,q2,q3,q4";
    let alphabet = "0,1";
    let transitions = "(0,q0,q1);(1,q0,q2);(0,q1,q3);(1,q1,q2);(0,q2,q1);(1,q2,q4);(0,q3,q3);(1,q3,q2);(0,q4,q1);(1,q4,q4)";
    let test = new DFAModel(initial, accepting, allStates, alphabet, transitions);
    test.checkInputString("0");
    expect(test.acceptanceResult).toBe(false);
});