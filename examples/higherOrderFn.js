// Higher order functions

// A higher order function is any function that does at least one of the following
//   1. Accepts a function as an argument
//   2. Returns a new function

// callbacks

// Receives a function as an argument
const withCount = (fn) => {
  let count = 0;

  // Returns a new function
  return (...args) => {
    console.log(`Call count: ${++count}`);
    if (args.length > 2) return 0;

    return fn(...args);
  };
};

const add = (x, y) => x + y;

const countedAdd = withCount(add);

console.log(add(1, 2));
console.log(countedAdd(1, 2));
console.log(countedAdd(2, 2));
console.log(countedAdd(3, 2));
console.log(countedAdd(2, 3, 4));

//   const update = (object, key, value) => {
//       if (key === 'model') return
//       if (key === 'name') return
//       object[key] = value
//   }

// blackProps a highOrder
const blacklistProps = (fn, blackList) => (object, key, value) => {
  if (blackList.includes(key)) return;

  return fn(object, key, value);
};

const update = (object, key, value) => {
  object[key] = value;
};

const curateUpdate = blacklistProps(update, ["model", "name"]);

const car = {
  name: "Marsarati",
  model: "Vyper",
};
curateUpdate(car, "model", "V2");
curateUpdate(car, "name", "Ferrari");

console.log(car);

const arrOfNumbers = [-3, -224, 1, 2, 3, 4, 4, 5, -2, 4];

const postiveArr = arrOfNumbers.filter((value) => !(value < 0));

const findHighestNumber = (fn, arr) => {
  const maxNum = Math.max(...arr);

  return fn(maxNum);
};
const patternOne = (hightNum) => "The highest number is " + hightNum;
const patternTwo = (hightNum) =>
  "We discovered the highest number to be " + hightNum;

console.log(
  findHighestNumber(patternOne, [8, 9, 8, 10, 4, 59, 293, 199, 10008, 0])
);
console.log(findHighestNumber(patternTwo, arrOfNumbers))

"The highest number is 5" === data;

console.log(postiveArr);
