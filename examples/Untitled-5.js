// const fetch = require('node-fetch')

// const getFromAPI = baseURL => endPoint => callback =>
//   fetch(`${baseURL}${endPoint}`)
//     .then(res => res.json())
//     .then(data => callback(data))
//     .catch(err => {
//       console.error(err.message)
//     })

// const endpoint = getFromAPI('https://blockchain.com');

// const users = endpoint('/users')
// const messages = (userId) => endpoint(`/messages/${userId}`);

// const me = messages('owonwo');
// users((userData) => {
//     console.log(userData)
// });
// me(data => {
//     console.log('Data')
// })

// const map = xs => fn => xs.map(fn)  // map can be partially applied map([])(() => {})
// const newMap = fn => xs => xs.map(fn);

// const arr1 = [1, 2, 3, 4, 5]
// const double = num => num * 2

// const arr1withMap = map(arr1)
// const arr1Doubles = arr1withMap(double)

// arr1
// arr1Doubles

// arr1.map(num => double(num)) === arr1.map(double)

// arr1withMap(double) === arr1withMap((num) => double(num))

// double(12) // 24

// const arr1Doubles = arr1withMap(double);
// const arr1Increment = arr1withMap(num => num + 1);

const map = fn => xs => xs.map(fn); // Pure function? Yes
const increment = num => num + 1; // Pure function? Yes
const double = num => num * 2  // Pure function? Yes

const doubleItems = map(double);
const incrementItems = map(increment);

// BODMAS
// 1 * 2 => 2 + 1 => 3
// 1 + 1 => 2 * 2 => 4

// composition / piping
// pipe -> streaming  increment(1) -> double(2) -> 4
// increment(1) -> 2
// -> double(2) -> 4
// -> repeat(4) -> 44
// -> output(44) -> renders 44 in the console

// composition 
// creating new functions from existing functions. 
// How make Cake or Bread. Ingredients. Flour, Sugar, Margarine

// pointer-free 
console.log( doubleItems([1,2,3,4,5,6]) )
console.log( incrementItems(doubleItems([1,2,3,4,5,6])) )
console.log( doubleItems(incrementItems([1,2,3,4,5,6])) )

const compose = (...fns)  => (x) => fns.reduceRight((init, fn) => fn(init), x);
const pipe  = (...fns) => (x) => fns.reduce((init, fn) => fn(init), x);

const doubleAndIncrement = compose(doubleItems, incrementItems) // l <- r // right-to-left
const uppercase = x => x.toUpperCase();
const repeat = x => [x,x].join('');
const greet =  (message) => (name) => message + name;

greet("Hi Robot#");
greet("Hi, ");

const validate = (x) => true;
const sanitize = x => "";

const sanitizeAndValidate = compose(
    validate,
    sanitize
)

function login (username, password) {
    // addSanitize => (x[]) -> boolean
    const sanitizeArr = compose(
        r.not,
        r.includes(false),
        map(sanitizeAndValidate)
    )
    
    if (!sanitizeArr(username, password, email)) {
        // side effect 
        throw Error('Your head not correct.')
    }
}

const output = pipe(
    increment, // -> num
    repeat, // -> numnum -> string
    double, // -> string -> num
    String, // num -> string
    uppercase, // string -> string
    greet("Good morning, ") // string -> string
);

console.log( compose(output, double, double)(34) )

console.log( doubleAndIncrement([1,2,4,5,6]) ) 

// compose() .reduce .reduceRight
