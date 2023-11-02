// 1 Basic Types

const Circ = (diameter: number) => {
  return diameter * Math.PI;
}

// console.log(Circ("Test")); <---- ERROR
console.log(Circ(20));



// 2 Arrays and Objects

let names = ['Pikachu', 'charmender', 'bulbasaur'];

// names.push(1); Error
names.push("Sniper");

console.log(names)

let mixed = ['Rohan', 2, true]

mixed.push(false);
mixed.push('Ranjan');
mixed.push(6);

console.log(mixed);

let obj = {
  name: "Sana",
  age: 26,
  gender: "female"
}

console.log(obj);

obj = {
  name : "Ten",
  age : 27,
  gender: "male",
}

console.log(obj);



// 3 Explict types

let array:(string|number|boolean)[] = [];

array.push("Pikachu");
array.push(20);
array.push(true);
array.push(45);
array.push("Mark");

console.log(array);

let myObject:object;

myObject = {name: "Lucas", age: 23, brand: "NCT"};
console.log(myObject);

myObject = {naming: 7 , age: 23, brand: "NCT", count: 9};
console.log(myObject);

myObject = [];
console.log(myObject);

let myObject2: {
  name:string,
  age:number,
  beltColor:string
}

myObject2 = {name: "Ten", age: 27, beltColor: "black"};
console.log(myObject2);


// Type Aliasing

type StringOrNumber = string|number;
type ObjWithNameAge = {name:string, age:StringOrNumber}

let greet = (a:string, b:StringOrNumber) =>{
  console.log(`Hello ${a}, you have completed ${b} rounds`);
}

greet("Jennie", 27);
greet("Jennie", "27");

let greetAgain = (a:StringOrNumber|boolean, b:StringOrNumber) =>{
  console.log(`${a}, you have completed ${b} rounds`);
}

greetAgain(true, 10);
greetAgain(0, 0);
greetAgain("False", "0");


let music = (obj:ObjWithNameAge, b:StringOrNumber) =>{
  console.log(`${obj.name} who is ${obj.age} years old has recorded ${b} songs so far.`);
}
music({name:"Giselle", age:24}, 50);



// Function Signatures

let greetings:(a:string, b:string) => void;

greetings = (name:string, group:string) =>{
  console.log(`Hello ${name}, you are a member of ${group}`);
}

greetings("Mark", "NCT");


let calculate:(x:number, y:number, z:string) => number;

calculate = (num1:number, num2:number, str:string) =>{
  if(str === "add"){
    return num1 + num2;
  }
  else{
    return num1 - num2;
  }
}

console.log(calculate(3, 6, "add"));


let objFunction: (test:{name:string, age:number}) => void;

type myObj = {name:string, age: number};

objFunction = (obj:myObj) =>{
  console.log(`${obj.name} is ${obj.age} years old.`);
}

objFunction({name: "Mark", age: 23});