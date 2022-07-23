// Function composition
// What is Function Composition?
// The act of creating a new function by combining two or more existing functions.

// For example:
// greet :: String -> String
const greet = (name) => `Hi ${name}`;

// uppercase :: String -> String
const uppercase = (str) => str.toUpperCase();

// greet * uppercase
// (String -> String) (String -> String)
// greetToUppercase :: String -> String -> String -> String => monoid
const greetToUppercase = (name) => uppercase(greet(name));
const uppercaseToGreet = (name) => greet(uppercase(name));

// split :: String -> String[]
const split = (str) => str.split("");

// uppercaseToGreet * split
// (String -> String) * (String -> String[])
// String -> String[] -> String -> String => not monoid
const greetAndSplit = (name) => split(uppercaseToGreet(name));

console.log(greetToUppercase("Johnson"));
console.log(uppercaseToGreet("Peter"));
console.log(greetAndSplit("Peter"));

const greetAndSplitS = (name) => split(greet(uppercase(name)));

const pipe = (...fnArgs) => {
  return function (value) {
    var intial_value = value;

    // fnArgs -> Function[]
    for (const fn of fnArgs) {
      intial_value = fn(intial_value);
    }

    return intial_value;
  };
};

const pipeReduceStyle = (...fnArgs) => {
  return function (value) {
    return fnArgs.reduce((accum, fn) => {
      return fn(accum);
    }, value);
  };
};

const pipeOneline =
  (...fnArgs) =>
  (value) =>
    fnArgs.reduce((accum, fn) => fn(accum), value);

// Pipe Function
const greetAndSplit2 = pipeOneline(uppercase, split, greet);
console.log(greetAndSplit2("Tommy"));

// uppercase -> HELLO
// greet(HELLO) -> Hi HELLO
// split(Hi HELLO) -> ['H', 'i', ' ', 'H', 'E', 'L', 'L', 'O']

// What is Arity?
// The number of arguments a function needs to execute
// unary -> 1 argument
// binary -> 2 argument
// tenary -> 3 argument
// variadic argument => fn(...a)
// Often times it's not adviced for a function to have more than 4 arguments.

const five = (a, b, c, d) => {};
const fiveCurryBinary = (a, b) => (c, d) => {};
const fiveCurryUnary = (a) => (b) => (c) => (d) => {};
const fiveCurryUnaryAndTenary = (a) => (b, c, d) => {};

const fn = fiveCurryUnaryAndTenary(1); // <- The first call is (Unary)
fn(2, 3, 4); // <- then the second call requires 3 arguments (Tenary)
