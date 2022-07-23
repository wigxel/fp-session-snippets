// What is a Pure Function?
// Are functions without Side-effects?
let b = 2;
// Given an input a functions the same output

const fn = (a) => {
    b += 1;
    return b + a;
}

fn(2) // 3 + 2 => 5
fn(2) // 4 + 2 => 6
fn('hi') // 5 + 'hi' => '5hi'

const fn2 = (a, b) => b + a;
fn2(1, 3)
fn2(1, 3)
fn2(1, 3)
fn2(1, 3)

// Impure function 
// localStorage.getItem('count') // null | data 
// document.querySelector('#id') // null | Element
// const id = setTimeout(() => {}, 1000);
// Math.random() // 1


// Pure function 
const multiply = (a, b) => a * b; // Great says it's a Pure functions
const assoc = (key, value, object) => { // Oma says it's impure
    object[key] = value;
    return object;
}
const pick = (key, object) => object[key]; // Anna says it's Pure

const getAndUppercaseName = (key, object) => {
    if (!(key in object)) throw Error('Key not in object'); // Maybe or Either Monads

    return object[key].toUpperCase();
}

const obj1 = { name: "Kelvin", age: 30 }

console.log( getAndUppercaseName('name', obj1) );
console.log( getAndUppercaseName('age', obj1) );
console.log( getAndUppercaseName('name', obj1) );
