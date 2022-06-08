

function greet (period, name) {

    if (period === 'Morning') return 'Good morning ' + name;
    if (period === 'Afternoon') return 'Hot morning ' + name;

    return 'Good day ' + name
}

greet("Morning", "Johnson")
greet("Morning", "Kelvin")
greet("Morning", "Joshua")
greet("Morning", "Vali")
greet("Evening", "Okiki")

console.log(greet('Morning', 'John'))
console.log(greet('Morning'))

const greetCurry = (period) =>  (name) => {
    if (period === 'Morning') return 'Good morning ' + name;
    if (period === 'Afternoon') return 'Hot morning ' + name;

    return 'Good day ' + name
}


const morningGreeting = greetCurry('Morning') 
morningGreeting('Johnson') 

const arrOfGreetings = ['Johnson', 'Kelvin', 'Joshua', 'Vali']
    .map(morningGreeting);

console.log(arrOfGreetings)



// METHOD URL QUERY BODY
// GET https://blockchain.com { } FormData

// Vali -> URL METHOD QUERY BODY
// JOSHUA & OKIKI -> URL QUERY BODY METHOD
// KELVIN -> METHOD URL BODY QUERY

const fetch = (url) => (method) => query => body => {
    return axios({ url, method, params: query, body })
}

fetch('https://blockchain.com', 'GET', {}, new FormData({}));
fetch('https://blockchain.com', 'POST', {}, new FormData({}));
fetch('https://blockchain.com', 'PUT', {}, new FormData({}));
fetch('https://blockchain.com', 'GET', {}, new FormData({}));
fetch('https://blockchain.com', 'GET', {}, new FormData({}));

const url = (name) => (period) => {
    // ...
}


greetCurry2('Johnson', 'Morning')
greetCurry2('Kelvin', 'Morning')
greetCurry2('Okiki', 'Morning')
greetCurry2('Vali', 'Morning')
greetCurry2('Joshua', 'Morning')




