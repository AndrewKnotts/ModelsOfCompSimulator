import { PDAModel } from "./PDAModel";

it('rejects model with empty input alphabet', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "q0";
    let inputAlphabet = "";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, a, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "Z";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    expect(window.alert).toBeCalledWith("Invalid input alphabet");
});

it('rejects model with empty pushdown alphabet', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "";
    let transitions = "(q0, a, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "Z";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    expect(window.alert).toBeCalledWith("Invalid pushdown alphabet");
});

it('rejects model with empty states', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, a, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "Z";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    expect(window.alert).toBeCalledWith("Invalid states");
});

it('rejects model with empty transitions', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "";
    let startStack = "Z";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    expect(window.alert).toBeCalledWith("Invalid transitions");
});

it('rejects model with no start state', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, a, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "Z";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    expect(window.alert).toBeCalledWith("Invalid initial state");
});

it('rejects model with no accepting states', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, a, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "Z";
    let accepting= "";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    expect(window.alert).toBeCalledWith("Invalid accepting states");
});

it('rejects model with invalid start stack', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, a, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "Q";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    expect(window.alert).toBeCalledWith("Invalid initial stack");
});

it('rejects model with a non-existent startState', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "q2";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, a, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "Z";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    expect(window.alert).toBeCalledWith("Invalid initial state");
});

it('rejects model with invalid accepting state', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, a, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "Z";
    let accepting= "q2";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    expect(window.alert).toBeCalledWith("Invalid accepting states");
});

it('rejects model with pushdown and input symbols sharing names', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "a, Z";
    let transitions = "(q0, a, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "Z";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    expect(window.alert).toBeCalledWith("Invalid pushdown alphabet");
});

it('rejects model with states and input symbols sharing names', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1, a";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, a, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "Z";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    expect(window.alert).toBeCalledWith("Invalid states");
});

it('rejects model with states and pushdown symbols sharing names', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1, A";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, a, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "Z";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    expect(window.alert).toBeCalledWith("Invalid states");
});

it('rejects model with transitions that include nonexistent states', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, a, Z) -> (q2, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "Z";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    expect(window.alert).toBeCalledWith("Invalid transitions");
});

it('rejects model with transitions that include nonexistent input symbol', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, c, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "Z";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    expect(window.alert).toBeCalledWith("Invalid transitions");
});

it('rejects model with transitions that include nonexistent pushdown symbols', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, a, Z) -> (q0, AQQ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "Z";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    expect(window.alert).toBeCalledWith("Invalid transitions");
});

//Reject input strings:
it('rejects model with test string "aabbba"', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, a, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "A";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    test.checkInputString("aabbba");
    expect(test.acceptanceResult).toBe(false);
});

it('rejects model with test string "aabbba"', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, a, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "Z";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    test.checkInputString("aabbba");
    expect(test.acceptanceResult).toBe(false);
});

it('rejects model with test string "aabbba"', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, a, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "AAZ";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    test.checkInputString("aabbba");
    expect(test.acceptanceResult).toBe(false);
});

it('rejects model with test string ""', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, a, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "A";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    test.checkInputString("");
    expect(test.acceptanceResult).toBe(false);
});

it('rejects model with test string ""', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, a, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "Z";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    test.checkInputString("");
    expect(test.acceptanceResult).toBe(false);
});

it('rejects model with test string ""', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, a, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "AAZ";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    test.checkInputString("");
    expect(test.acceptanceResult).toBe(false);
});

it('rejects model with test string ""', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, a, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "AAAAA";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    test.checkInputString("");
    expect(test.acceptanceResult).toBe(false);
});

it('rejects model with test string "a"', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, a, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "Z";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    test.checkInputString("a");
    expect(test.acceptanceResult).toBe(false);
});

it('rejects model with test string ""', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, a, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "AAZ";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    test.checkInputString("");
    expect(test.acceptanceResult).toBe(false);
});

it('rejects model with test string ""', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, a, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "AAAAA";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    test.checkInputString("");
    expect(test.acceptanceResult).toBe(false);
});

it('rejects model with test string "a"', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, a, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "Z";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    test.checkInputString("a");
    expect(test.acceptanceResult).toBe(false);
});

it('rejects model with test string "a"', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, a, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "A";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    test.checkInputString("a");
    expect(test.acceptanceResult).toBe(false);
});

it('rejects model with test string "aaabbbb"', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, a, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "AA";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    test.checkInputString("aaabbbb");
    expect(test.acceptanceResult).toBe(false);
});

// Accept
it('accepts model with test string "aaabbb"', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, a, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "Z";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    test.checkInputString("aaabbb");
    expect(test.acceptanceResult).toBe(true);
});

it('accepts model with test string "aaaabbbb"', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, a, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "Z";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    test.checkInputString("aaaabbbb");
    expect(test.acceptanceResult).toBe(true);
});

it('accepts model with test string "abbb"', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, a, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "AZAZ";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    test.checkInputString("abbb");
    expect(test.acceptanceResult).toBe(true);
});

it('accepts model with test string "bbbbb"', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, a, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "AAAAA";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    test.checkInputString("bbbbb");
    expect(test.acceptanceResult).toBe(true);
});

it('accepts model with test string "bbb"', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, a, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "AZAZAZZZZ";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    test.checkInputString("bbb");
    expect(test.acceptanceResult).toBe(true);
});

it('accepts model with test string "ab"', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, a, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "Z";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    test.checkInputString("ab");
    expect(test.acceptanceResult).toBe(true);
});

it('accepts model with test string "aaabbbb"', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0, q1";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A, Z";
    let transitions = "(q0, a, Z) -> (q0, AZ); (q0, a, A) -> (q0, AA); (q0, b, A) -> (q1, eps); (q1, b, A) -> (q1, eps); (q1, eps, Z) -> (q1, eps)"
    let startStack = "A";
    let accepting= "q1";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    test.checkInputString("aaabbbb");
    expect(test.acceptanceResult).toBe(true);
});

it('accepts simple model with test string "aba"', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let states = "q0";
    let startState = "q0";
    let inputAlphabet = "a, b";
    let pushdownAlphabet = "A";
    let transitions = "(q0, a, A) -> (q0, eps); (q0, b, eps) -> (q0, A)";
    let startStack = "A";
    let accepting= "q0";
    let test = new PDAModel(states, startState, inputAlphabet, pushdownAlphabet, transitions, startStack, accepting);
    test.checkInputString("aba");
    expect(test.acceptanceResult).toBe(true);
});
