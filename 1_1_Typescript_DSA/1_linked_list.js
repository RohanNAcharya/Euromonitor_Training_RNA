var NewNode = /** @class */ (function () {
    function NewNode(value) {
        this.value = value;
        this.next = null;
    }
    return NewNode;
}());
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    LinkedList.prototype.append = function (value) {
        var newNode = new NewNode(value);
        if (this.head == null) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            if (this.tail !== null) {
                this.tail.next = newNode;
                this.tail = newNode;
            }
        }
        this.length++;
        return this;
    };
    LinkedList.prototype.prepend = function (value) {
        var newNode = new NewNode(value);
        if (this.head == null) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    };
    LinkedList.prototype.traverseToIndex = function (index) {
        var counter = 0;
        var currentNode = this.head;
        while (index !== counter && currentNode !== null) {
            currentNode = currentNode.next;
            counter++;
        }
        return currentNode;
    };
    LinkedList.prototype.insert = function (index, value) {
        if (index >= this.length) {
            return this.append(value);
        }
        if (index == 0) {
            return this.prepend(value);
        }
        var newNode = new NewNode(value);
        var leader = this.traverseToIndex(index - 1);
        if (leader !== null) {
            var holdingPointer = leader.next;
            leader.next = newNode;
            newNode.next = holdingPointer;
        }
        this.length++;
        return this;
    };
    LinkedList.prototype.printList = function () {
        var curr = this.head;
        var arr = [];
        while (curr !== null) {
            arr.push(curr.value);
            curr = curr.next;
        }
        console.log(arr);
    };
    LinkedList.prototype.remove = function (index) {
        var leader = this.traverseToIndex(index - 1);
        if (leader !== null) {
            var unwantedElement = leader.next;
            if (unwantedElement !== null) {
                leader.next = unwantedElement.next;
            }
        }
        this.length--;
        return this;
    };
    return LinkedList;
}());
var ll = new LinkedList();
ll.append(10);
ll.append(20);
ll.append(50);
ll.append(30);
ll.printList();
ll.insert(3, 90);
ll.printList();
ll.remove(2);
ll.printList();
ll.prepend(190);
ll.printList();
