
const arrOfObject = Array(20).fill({ a: 20, selected: false });
const index = 2;

const clone = arrOfObject.map((item, idx) => {
    if (idx === index) {
        return { ...item, selected: true };
    }
    return item;
})

arrOfObject.pop();

console.log(arrOfObject.length)
console.log(clone.length)

console.log(clone[2])
console.log(arrOfObject[2])