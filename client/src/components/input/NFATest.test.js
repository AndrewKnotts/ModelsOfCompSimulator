import { NFAModel, NFAState, Pair } from "./NFAModel";

it('test works', () => {
    expect(1+2).toEqual(3);
  });

it('rejects model with empty alphabet', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "0";
    let accepting = "3";
    let all_states = "0,1,2,3";
    let alphabet = "";
    let transitions = "(a,0,1);(a,0,2);(b,1,1); (eps,1,2);(b,2,2);(a,2,3)";
    let test = new NFAModel(initial, accepting, all_states, alphabet, transitions);
    expect(window.alert).toBeCalledWith("Empty alphabet");
});

it('rejects model with duplicates in alphabet', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "0";
    let accepting = "3";
    let all_states = "0,1,2,3";
    let alphabet = "a,b,b";
    let transitions = "(a,0,1);(a,0,2);(b,1,1); (eps,1,2);(b,2,2);(a,2,3)";
    let test = new NFAModel(initial, accepting, all_states, alphabet, transitions);
    expect(window.alert).toBeCalledWith("Duplicate in alphabet: b");
});

it('rejects model with empty states', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "0";
    let accepting = "3";
    let all_states = "";
    let alphabet = "a,b";
    let transitions = "(a,0,1);(a,0,2);(b,1,1); (eps,1,2);(b,2,2);(a,2,3)";
    let test = new NFAModel(initial, accepting, all_states, alphabet, transitions);
    expect(window.alert).toBeCalledWith("Empty States");
});

it('rejects model with duplicates in states', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "0";
    let accepting = "3";
    let all_states = "0,1,2,1,3";
    let alphabet = "a,b";
    let transitions = "(a,0,1);(a,0,2);(b,1,1); (eps,1,2);(b,2,2);(a,2,3)";
    let test = new NFAModel(initial, accepting, all_states, alphabet, transitions);
    expect(window.alert).toBeCalledWith("Conflicting state name: 1");
});

it('rejects model with alphabet symbol as state', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "0";
    let accepting = "3";
    let all_states = "0,1,b,2,3";
    let alphabet = "a,b";
    let transitions = "(a,0,1);(a,0,2);(b,1,1); (eps,1,2);(b,2,2);(a,2,3)";
    let test = new NFAModel(initial, accepting, all_states, alphabet, transitions);
    expect(window.alert).toBeCalledWith("Conflicting state name: b");
});

it('rejects model with empty initial', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "";
    let accepting = "3";
    let all_states = "0,1,2,3";
    let alphabet = "a,b";
    let transitions = "(a,0,1);(a,0,2);(b,1,1); (eps,1,2);(b,2,2);(a,2,3)";
    let test = new NFAModel(initial, accepting, all_states, alphabet, transitions);
    expect(window.alert).toBeCalledWith("Invalid initial state");
});

it('rejects model with invalid initial', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "a";
    let accepting = "3";
    let all_states = "0,1,2,3";
    let alphabet = "a,b";
    let transitions = "(a,0,1);(a,0,2);(b,1,1); (eps,1,2);(b,2,2);(a,2,3)";
    let test = new NFAModel(initial, accepting, all_states, alphabet, transitions);
    expect(window.alert).toBeCalledWith("Invalid initial state");
});

it('rejects model with empty accepting', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "0";
    let accepting = "";
    let all_states = "0,1,2,3";
    let alphabet = "a,b";
    let transitions = "(a,0,1);(a,0,2);(b,1,1); (eps,1,2);(b,2,2);(a,2,3)";
    let test = new NFAModel(initial, accepting, all_states, alphabet, transitions);
    expect(window.alert).toBeCalledWith("Empty accepting states");
});

it('rejects model with invalid accepting', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "0";
    let accepting = "3,a";
    let all_states = "0,1,2,3";
    let alphabet = "a,b";
    let transitions = "(a,0,1);(a,0,2);(b,1,1); (eps,1,2);(b,2,2);(a,2,3)";
    let test = new NFAModel(initial, accepting, all_states, alphabet, transitions);
    expect(window.alert).toBeCalledWith("Accepting state a does not exist");
});

it('rejects model with empty transitions', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "0";
    let accepting = "3";
    let all_states = "0,1,2,3";
    let alphabet = "a,b";
    let transitions = "";
    let test = new NFAModel(initial, accepting, all_states, alphabet, transitions);
    expect(window.alert).toBeCalledWith("Empty transitions");
});

it('rejects model with invalid symbol of transition', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "0";
    let accepting = "3";
    let all_states = "0,1,2,3";
    let alphabet = "a,b";
    let transitions = "(c,0,1);(a,0,2);(b,1,1); (eps,1,2);(b,2,2);(a,2,3)";
    let test = new NFAModel(initial, accepting, all_states, alphabet, transitions);
    expect(window.alert).toBeCalledWith("Invalid symbol in transition: (c, 0, 1)");
});

it('rejects model with invalid source of transition', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "0";
    let accepting = "3";
    let all_states = "0,1,2,3";
    let alphabet = "a,b";
    let transitions = "(a,0,1);(a,b,2);(b,1,1); (eps,1,2);(b,2,2);(a,2,3)";
    let test = new NFAModel(initial, accepting, all_states, alphabet, transitions);
    expect(window.alert).toBeCalledWith("Invalid source in transition: (a, b, 2)");
});

it('rejects model with invalid dest of transition', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "0";
    let accepting = "3";
    let all_states = "0,1,2,3";
    let alphabet = "a,b";
    let transitions = "(a,0,1);(a,0,2);(b,1,1); (eps,1,2);(b,2,2);(a,2,4)";
    let test = new NFAModel(initial, accepting, all_states, alphabet, transitions);
    expect(window.alert).toBeCalledWith("Invalid destination in transition: (a, 2, 4)");
});

it('rejects model with duplicate transition', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "0";
    let accepting = "3";
    let all_states = "0,1,2,3";
    let alphabet = "a,b";
    let transitions = "(a,0,1);(a,0,2);(b,1,1); (eps,1,2);(b,2,2);(a,2,3);(a,0,2)";
    let test = new NFAModel(initial, accepting, all_states, alphabet, transitions);
    expect(window.alert).toBeCalledWith("Transition (a, 0, 2) already exists");
});

it('warns about disconnected state', () => {
    // write test
    expect(true).toBe(true);
});

it('accepts sample string 1 for test model 1', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "0";
    let accepting = "3";
    let all_states = "0,1,2,3";
    let alphabet = "a,b";
    let transitions = "(a,0,1);(a,0,2);(b,1,1); (eps,1,2);(b,2,2);(a,2,3)";
    let test = new NFAModel(initial, accepting, all_states, alphabet, transitions);
    test.checkInputString("abbbbbbbbba");
    expect(test.acceptance_result).toBe(true);
});

it('accepts sample string 2 for test model 1', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "0";
    let accepting = "3";
    let all_states = "0,1,2,3";
    let alphabet = "a,b";
    let transitions = "(a,0,1);(a,0,2);(b,1,1); (eps,1,2);(b,2,2);(a,2,3)";
    let test = new NFAModel(initial, accepting, all_states, alphabet, transitions);
    test.checkInputString("aba");
    expect(test.acceptance_result).toBe(true);
});

it('accepts sample string 3 for test model 1', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "0";
    let accepting = "3";
    let all_states = "0,1,2,3";
    let alphabet = "a,b";
    let transitions = "(a,0,1);(a,0,2);(b,1,1); (eps,1,2);(b,2,2);(a,2,3)";
    let test = new NFAModel(initial, accepting, all_states, alphabet, transitions);
    test.checkInputString("aa");
    expect(test.acceptance_result).toBe(true);
});

// NEED TO DEBUG: should fail when string is not empty and stuck in an accepting state
it('rejects sample string 1 for test model 1', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "0";
    let accepting = "3";
    let all_states = "0,1,2,3";
    let alphabet = "a,b";
    let transitions = "(a,0,1);(a,0,2);(b,1,1); (eps,1,2);(b,2,2);(a,2,3)";
    let test = new NFAModel(initial, accepting, all_states, alphabet, transitions);
    test.checkInputString("abbbbbbbbbaa");
    expect(test.acceptance_result).toBe(false);
});

it('rejects sample string 2 for test model 1', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "0";
    let accepting = "3";
    let all_states = "0,1,2,3";
    let alphabet = "a,b";
    let transitions = "(a,0,1);(a,0,2);(b,1,1); (eps,1,2);(b,2,2);(a,2,3)";
    let test = new NFAModel(initial, accepting, all_states, alphabet, transitions);
    test.checkInputString("aaba");
    expect(test.acceptance_result).toBe(false);
});

it('rejects sample string 3 for test model 1', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let initial = "0";
    let accepting = "3";
    let all_states = "0,1,2,3";
    let alphabet = "a,b";
    let transitions = "(a,0,1);(a,0,2);(b,1,1); (eps,1,2);(b,2,2);(a,2,3)";
    let test = new NFAModel(initial, accepting, all_states, alphabet, transitions);
    test.checkInputString("ababa");
    expect(test.acceptance_result).toBe(false);
});