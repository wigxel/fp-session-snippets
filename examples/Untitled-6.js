// Currying // a function that returns a new function 
// Partial Application // application of arguments via currying

// fn => (x, y) => (z) => x + y / z
// fn => x => y => z => x + y / z

// Is this a curried function? Yes
// Can this function be partially applied? Yes

// const takeZ = fn(1,2)
// takeZ(3)

// compose // right -> left // arity
// pipe //  left -> right // arity
const pipe = (...fns) => x => fns.reduce((acc, cu) => cu(acc), x);
const compose = (...fns) => x => fns.reduceRight((acc, cu) => cu(acc), x);

const fn1 = (a) => a;
const fn2 = (a, b) => a + b; // 7 + undefined 
const fn2Curried = a => b => a + b; // 2 + 7 => 9

// pointer-fee
const doSomething = pipe(
    fn1,
    // fn2
    fn2Curried(2)
)

doSomething(7) // 9

// non pointer-free
const result_ = fn1(7)
const newResult = fn2(2, result_);
newResult // 9


// pointer-free without composition
fn2(2, fn1(7));

// divide(2, 5)
// const divide2 = divide(2)
// const divide3 = divide(3)
// divide2(5)
// divide3(5);

// const divideBy5 = divide(5)
// divideBy5(2)
// divideBy5(3)


const divide = divisor => x => x / divisor;
const square = (x) => Math.pow(x, 2);
const sqrt = (x) => Math.sqrt(x);

 // left -> right
// divide -> square -> sqrt
const output1 = pipe(sqrt, square, divide(2))(150)

// right -> left
// sqrt -> square -> divide
const output2 = compose(divide(2), square, sqrt)(500)

// const loginThenResetThenFetchData = pipe(
//     login, 
//     reset,
//     fetchData
// )({ username })

// const shout = (arg) => repeat(exclaim(scream(arg)))
// const shout = pipe(scream, exclaim, repeat);


// Associativity
// square -> divide
// const fn = compose(divide(45), square);
// square -> divide
// const fn1 = pipe(square, divide(45));

// fn1 === fn // Is fn1 and fn the same?

// BigO performance and complexity
const filter = predicate => arr => arr.filter(predicate);
const map = transform => arr => arr.map(transform);

const sumValueAndMulti = object => ({ ...object, sum: object.mutliValue + object.value });
const multiplyBy2_ = object => ({ ...object, mutliValue: object.value * 2 });

// performance
const numberLessThan5 = compose(
    map(sumValueAndMulti), // iterated 5 -> array of 5
    map(multiplyBy2_), // iterate 5 -> array of 5
    filter(num => num.value < 5) // iterates 9 times => array of 5
)

// compose(map(fn1), map(fn2)) === map(compose(fn1, fn2))

const numberLessThan5Kelvin = compose(
    map(compose(sumValueAndMulti, multiplyBy2_)), // 5x
    filter(num => num.value < 5), // 9x
)

const arrOfObject = [1, 2, 3, 4, 10, 5, 3, 20, 54].map((num) => ({ value: num }));

console.log(
    numberLessThan5(arrOfObject)
)

