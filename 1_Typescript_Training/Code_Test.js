// 1 Basic Types
var Circ = function (diameter) {
    return diameter * Math.PI;
};
// console.log(Circ("Test")); <---- ERROR
console.log(Circ(20));
// 2 Arrays and Objects
var names = ['Pikachu', 'charmender', 'bulbasaur'];
// names.push(1); Error
names.push("Sniper");
console.log(names);
var mixed = ['Rohan', 2, true];
mixed.push(false);
mixed.push('Ranjan');
mixed.push(6);
console.log(mixed);
var obj = {
    name: "Sana",
    age: 26,
    gender: "female"
};
console.log(obj);
obj = {
    name: "Ten",
    age: 27,
    gender: "male",
};
console.log(obj);
// 3 Explict types
var array = [];
array.push("Pikachu");
array.push(20);
array.push(true);
array.push(45);
array.push("Mark");
console.log(array);
var myObject;
myObject = { name: "Lucas", age: 23, brand: "NCT" };
console.log(myObject);
myObject = { naming: 7, age: 23, brand: "NCT", count: 9 };
console.log(myObject);
myObject = [];
console.log(myObject);
var myObject2;
myObject2 = { name: "Ten", age: 27, beltColor: "black" };
console.log(myObject2);
var greet = function (a, b) {
    console.log("Hello ".concat(a, ", you have completed ").concat(b, " rounds"));
};
greet("Jennie", 27);
greet("Jennie", "27");
var greetAgain = function (a, b) {
    console.log("".concat(a, ", you have completed ").concat(b, " rounds"));
};
greetAgain(true, 10);
greetAgain(0, 0);
greetAgain("False", "0");
var music = function (obj, b) {
    console.log("".concat(obj.name, " who is ").concat(obj.age, " years old has recorded ").concat(b, " songs so far."));
};
music({ name: "Giselle", age: 24 }, 50);
// Function Signatures
var greetings;
greetings = function (name, group) {
    console.log("Hello ".concat(name, ", you are a member of ").concat(group));
};
greetings("Mark", "NCT");
var calculate;
calculate = function (num1, num2, str) {
    if (str === "add") {
        return num1 + num2;
    }
    else {
        return num1 - num2;
    }
};
console.log(calculate(3, 6, "add"));
var objFunction;
objFunction = function (obj) {
    console.log("".concat(obj.name, " is ").concat(obj.age, " years old."));
};
objFunction({ name: "Mark", age: 23 });
// DOM and Type Casting
var form = document.querySelector('.new-item-form');
console.log(form.childeren);
