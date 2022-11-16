export class TapeNode {
    constructor(value, prev = null, next = null) {
        this.value = value;
        this.prev = prev;
        this.next = next;
    }
}
 
export class Tape {
    constructor(input = [], blank_sym = "_", start_index = 0) {
        this.blank = blank_sym;
        this.head = new TapeNode(input[0]);
        this.tail = this.head;
        input.shift();
       
        for (let sym of input) {
            this.insertTail(sym);
        }
 
        this.current = this.getIndex(start_index);
    }
 
    size() {
        let count = 1;
        let node = this.head;
        while (node.next != null) {
            count++;
            node = node.next;
        }
        return count;
    }
 
    getIndex(index) {
        let count = 0;
        let node = this.head;
        while (count !== index) {
            node = node.next;
            count = count + 1;
        }
        return node;
    }
 
    insertHead(value) {
        let node = new TapeNode(value, null, this.head);
        this.head.prev = node;
        this.head = node;
    }
 
    insertTail(value) {
        let node = new TapeNode(value, this.tail, null);
        this.tail.next = node;
        this.tail = node;
    }
 
    shiftLeft() {
        if (this.current === this.head) {
            this.insertHead(this.blank);
            // if one way:
            //return false;
        } 
        this.current = this.current.prev;
    }
 
    shiftRight() {
        if (this.current === this.tail) {
            this.insertTail(this.blank);
        }
        this.current = this.current.next;
    }
 
    getCurrentValue() {
        return this.current.value;
    }

    overwrite(sym) {
        this.current.value = sym;
    }

    printTape() {
        let tape_arr = [];
        let node = this.head;
        while (node !== null) {
            tape_arr.push(node.value);
            node = node.next;
        }
        //console.log(tape_arr);
        return tape_arr;
    }
}
