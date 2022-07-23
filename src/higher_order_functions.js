// Higher Functions
// A higher order function is any function that does at least one of the following
//   1. Accepts a function as an argument
//   2. Returns a new function

const fn1 = (a) => () => a; // 2
const doFn = fn1(1);
console.log(doFn());

const apply1 = (callback) => {
  return callback(1);
};

const addOne = (x) => x + 1;
const multiplyBy2 = (x) => x * 2;
const value = apply1(addOne);
const value2 = apply1(multiplyBy2);

console.log(value, value2);

const map = (arr, fn) => {
  const array = [];
  for (const item of arr) {
    array.push(fn(item));
  }
  return array;
};

const inc = (x) => x + 1;
const arrOfNums1 = [1, 2, 3, 4].map(inc);
const arrOfNums2 = map([1, 2, 3, 4], inc);

console.log(arrOfNums1, arrOfNums2);

function subscribe(optionObject, pingFn) {
  console.log("Subscribed to ", optionObject.channel);
  let count = 0;

  const intervalId = setInterval(() => {
    pingFn(count++);
  }, 2000);

  return function unsubscribe() {
    count = 0;
    clearInterval(intervalId);
    console.log("Unsubscribed!");
  };
}
const ping = () => console.log("Pinged!");
const unsubscribe = subscribe({ channel: "#fp" }, ping);

setTimeout(() => {
  unsubscribe();
  process.exit(0);
}, 10000);

// Currying & Partial Application
const add = (x, y) => x + y; // not a curried
const addCurry = (x) => (y) => (z) => x + y + z; // curried function

add(1, 2);
const fn = addCurry(1);
const fn2 = fn();
const finalValue = fn2(3);

console.log(finalValue);

const addStyle = (el) => (cssProperty, value) => {
  el.style[cssProperty] = value;
};
const applyBg = (el) => (value) => addStyle(el)("backgroundColor", value);

const el = document.querySelector("button");
const cssProperty = "backgroundColor";

const buttonEl = addStyle(el);
const setBackgroundForButtonEl = applyBg(el);

setBackgroundForButtonEl("blue"); // Partial Application
buttonEl(cssProperty, "red"); // Partial Application
buttonEl("border", "solid 1px black"); // Partially applied arguments
buttonEl("color", "black"); // Partially applied arguments
