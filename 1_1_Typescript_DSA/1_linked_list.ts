class NewNode{
  value:number;
  next:NewNode|null;
  constructor(value:number){
    this.value = value;
    this.next = null;
  }
}

class LinkedList{
  head:NewNode|null;
  tail:NewNode|null;
  length:number;
  
  constructor(){
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value:number){
    let newNode = new NewNode(value);
    if(this.head==null){
      this.head = newNode;
      this.tail = newNode;
    }
    else{
      if(this.tail !== null){
        this.tail.next = newNode;
        this.tail = newNode;
      }
    }
    this.length++;
    return this;
  }

  prepend(value:number){
    let newNode = new NewNode(value);
    if(this.head==null){
      this.head = newNode;
      this.tail = newNode;
    }
    else{
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  traverseToIndex(index:number){
    let counter = 0;
    let currentNode = this.head;
    while(index!== counter && currentNode !== null){
      currentNode = currentNode.next;
      counter++;
    }
    return currentNode;
  }

  insert(index:number, value:number){
    if(index>=this.length){
      return this.append(value);
    }
    
    if(index == 0){
      return this.prepend(value);
    }
    
    let newNode = new NewNode(value);
    const leader = this.traverseToIndex(index-1);
    if(leader!== null){
      const holdingPointer = leader.next;
      leader.next = newNode;
      newNode.next = holdingPointer;
    }
    this.length++;
    return this;
  }


  printList(){
    let curr = this.head;
    let arr:number[] = []
    while(curr!==null){
      arr.push(curr.value);
      curr = curr.next;
    }
    console.log(arr);
  }

  remove(index:number){
    const leader = this.traverseToIndex(index-1);
    if(leader!==null){
      const unwantedElement = leader.next;
      if(unwantedElement!==null){
        leader.next = unwantedElement.next;
      }
    }
    this.length--;
    return this;
  }
}


const ll = new LinkedList();
ll.append(10);
ll.append(20);
ll.append(50);
ll.append(30);
ll.printList();
ll.insert(3, 90);
ll.printList();
ll.remove(2)
ll.printList();
ll.prepend(190);
ll.printList();