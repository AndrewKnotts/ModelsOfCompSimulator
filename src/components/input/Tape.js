// TapeNode encapsulates value and reference to previous and next TapeNodes in a Tape
export class TapeNode {
    constructor(value, prev = null, next = null) {
        this.value = value;
        this.prev = prev;
        this.next = next;
    }
}
 
// Tape is similar to a LinkedList, tracks head and tail, blank is used to fill in additional nodes as needed
export class Tape {
    constructor(input = [], blankSym = "_", startIndex = 0) {
        this.blank = blankSym;
        this.head = new TapeNode(input[0]);
        this.tail = this.head;
        input.shift();
       
        for (let sym of input) {
            this.insertTail(sym);
        }
 
        this.current = this.getIndex(startIndex);
    }
 
    size() {
        let node = this.head;
        let count = 1;
        while (node.next != null) {
            count++;
            node = node.next;
        }
        return count;
    }

    getIndex(index) {
        let node = this.head;
        let count = 0;
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
 
    // shift the tape one node to the left, inserts a new blank node as a head if needed
    shiftLeft() {
        if (this.current === this.head) {
            this.insertHead(this.blank);
            // if using a one way tape:
            //return false;
        } 
        this.current = this.current.prev;
    }

    // shift the tape one node to the right, inserts a new blank node as a tail if needed
    shiftRight() {
        if (this.current === this.tail) {
            this.insertTail(this.blank);
        }
        this.current = this.current.next;
    }
 
    getCurrentValue() {
        return this.current.value;
    }

    // replace the value of the current node with sym
    overwrite(sym) {
        this.current.value = sym;
    }

    // returns array of all nodes' values in order
    printTape() {
        let tapeArr = [];
        let node = this.head;
        while (node !== null) {
            tapeArr.push(node.value);
            node = node.next;
        }
        return tapeArr;
    }

    // returns array of node values with the current node at center and padding # of nodes each side
    printCenteredTape(padding) {
        let leftNode = this.current;
        let rightNode = this.current;
        let tapeArr = [this.current.value];
        for (let i = 0; i < padding; i++) {
            if (rightNode.next !== null) {
                tapeArr.push(rightNode.next.value);
                rightNode = rightNode.next;
            } else {
                tapeArr.push(this.blank);
            }

            if (leftNode.prev !== null) {
                tapeArr.unshift(leftNode.prev.value);
                leftNode = leftNode.prev;
            } else {
                tapeArr.unshift(this.blank);
            }
        }
        return tapeArr;
    }
}
