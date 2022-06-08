const a = Object.freeze({ // 0x234
    model: "Bughatti"
})

// spreading 
const b = { ...a } // b -> a 
b.model = "Ford Mustang" // b -> a -> model = "Ford Mustang"

console.log(a)
console.log(b)

// Map - { key: value }
const map = new Map();
map.set(function() {}, 'hello');
map.get(function() {})  // null

paths = new Map([
    ['Patient', '/patients'],
    ['Profile', '/profile'],
    ['Patient View', '/patients/adea-32oinad-32oia-23923']
])
// generateBreadcrumbs = (path, url) => string[]
generateBreadcrumbs(paths, 'https://localhost:3000/patients/adea-32oinad-32oia-23923/consultations')
// => [Patient, Patient View]
function generateBreadcrumbs(paths, url) {
    const arr =  []
    for (const [key, value] of Object.entries(paths)) {
        if (checksIf(value, url)) {
            arr.push(key)
        }
    }
    return arr;
}

function uniqueValues(arr) {
    const set = new Set([...arr])
    return set;
}

uniqueValues([1,2,3,4,5,5]);
new Set([1,2,3,4,5,5]);





// Immutable Data Types


// Pure function
const b = (n) => n + 2


[1,2,3,9] // mutable 
const obj = { a: [] } // mutable
obj.a = "okiki"
const obj2 = obj;
obj2.a = "Bryan"

console.log(obj.a); // Bryan




// const user = { age: 24 };

// signup(user);
// const updateUser = guessNextAge(user);
// // users age is 25
// register(updateUser.age); // 25

const user = { age: 24 };

const updateUser = guessNextAge(user);
// user age is 24
// update user age is 25
signup(user); // 'User is too old to join'

// users age is 25
register(updateUser.age); // 25




user.age // 24
updatedUser.age // 25

// user.age = 25
if (update.age === 24) { // false

}





// reference

// mutable -> Can be changed / re-assigned
// immutable -> Can't be changed



a = { }
b = a;

b = { ...a } 
b = Object.assign({}, a)


arrOfPersons = []
arrOfFirstP = arrOfPersons.filter(item => item[0].toLowerCase() === 'p');

arrOfPersons = [1,2,3,4]
arrofPeople = [...arrOfPersons];

arrOfPersons[2] = 55

arrofPeople[2] // 3
arryOfPersons[2] // 55




// GC - Garbage Collector


const checkTokenLocalStorage = async (userToken) => {
    console.log('user_Token12532: ', );
    let user_Token = await AsyncStorage.getItem('userToken');
    if (user_Token !== null && user_Token !== '') {
      if (userToken !== '' && userToken !== null && userToken !== undefined) {
        checkLocationPermissionHandler();
      } else {
        checkValidation();
      }
    } else {
      checkValidation();
    }
  };