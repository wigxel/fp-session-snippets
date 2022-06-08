
// Given the same input(s) will return the expect output
// 01. A pure always returns value
// 02. A pure takes in at least one input
// 03. Pure function are synchronous
// 04. Print an output - console.log()

const addOne = (x) => x + 1 

addOne(2) // 3
addOne(2) // 3

// Synchronous  -> Pure
// Asynchoronous -> Impure

const multiplyBy2 = async (x) => {
    return addOne(x)
}

multiplyBy2() // impure





const state = {
    status: "None"
}

const slice = createSlice({
    updateStatus(state, payload) {
        state.status = payload;
    },
})

// immer 

slice.updateStatus(state, 'ACTIVE');


function guessNextAge(user) {
    return { ...user, age: user.age + 1 }
}

function guessNextAge(user) {
    user.age += 1;    
    return user
}

function signup(user) {
    if (user.age < 25) {
        return 'Signed up'
    }
    return 'User is too old to join.'
}

function register(age) {}

const checkTokenLocalStorage = async (userToken) => {
    const tokenFromStore = await AsyncStorage.getItem('userToken'); // string or null or undefined

    if (Boolean(tokenFromStore) && Boolean(userToken)) {
        return checkLocationPermissionHandler();
    } 

    checkValidation();
  };



