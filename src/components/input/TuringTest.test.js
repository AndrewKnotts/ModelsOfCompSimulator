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
 
it('rejects when going out of bounds to left', () => {
    let test = new Tape(["a", "b", "c"], "_");
    expect(test.size()).toEqual(3);
    expect(test.shiftLeft()).toEqual(false);
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
 
it('gets index', () => {
    let test = new Tape(["a", "b", "c", "d"]);
    expect(test.getIndex(0).value).toEqual("a");
    expect(test.getIndex(1).value).toEqual("b");
    expect(test.getIndex(2).value).toEqual("c");
    expect(test.getIndex(3).value).toEqual("d");
})
 
xit('builds TM model', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let test = new TuringMachine("A,B,H", "0,1", "(A, 0) -> (B, 1, >); (B, 0) -> (B, 0, <)", "A", "H", "H", 0);
    //console.log(test.states);
    expect(test.states.has("A")).toEqual(true);
})
 
xit('tests TM model', () => {
    let test = new TuringMachine(states, alphabet, transitions, start_state, halt_states, accepting_states, 0);
})
