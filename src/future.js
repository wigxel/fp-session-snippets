// Promises
// Async/Await
import Future, { fork, rejectAfter } from "fluture";
import * as r from "ramda";

// Promise -> resolve reject
// Future / Task / Promise
// Future -> reject resolve
// Either -> Left Right

// Promise.map() // not a functor
// Future.map() // functor

// fetch()
//     .then(successHandler // subHandler)
//     .then(successHandler)
//     .catch(() => {}) // global error handler

// fetch().then(successHandler).catch(errHandler)

// Promise
// Promise.then(() => {}).catch(() => {})
// Promise helps manage asynchornous in a procedural fashion

// HTTP Request
// Playing an Animation/Transition
// Persistence // LocalStorage.getItem('') Input Output
const log = [];

// method 1
const getUsernames = async (db) => {
  log.push("Execute getUsernames");
  if (db !== "remote") throw new Error("Invalid db provided.");
  return ["owonwo", "kelvin", "vali"];
};

const getUsername = (db) => {
  return new Promise((resolve, reject) => {
    if (db === "remote") resolve("Connection successful"); // .then()
    reject(new Error("Invalid db provided.")); // .catch()
  });
  // ['owonwo', 'kelvin', 'vali']
};

// getUsernames("remote")
//   .then((res) => {
//     console.log(res); //
//   })
//   .catch((error) => {
//     console.log(error, typeof error);
//   });

const getUsers = (db) =>
  Future((rej, res) => {
    log.push("Execute getUsers");
    if (db === "remote") res(["kelvin", "phillip", "vali", "Okiki"]);
    rej(new Error("Invalid db provided."));

    return function onCancel() {
      log("cancelling");
      // Clearing the timeout releases the resources we were holding.
    };
  });

// getUsers :: String -> Future (rej res)
const getUserValue = r.map(r.join(","), getUsers("remote"));

// execute immediately
console.log(log);
const promise = getUsernames();
console.log(log);
// do something
promise.then(
  () => {},
  () => {}
); //
console.log(log);

// execute
console.log(log);
const future = getUsers();
console.log(log);

// do something
fork(() => {})(() => {})(future); // <- executes here!
console.log(log);

// Promise.then(onSucces).catch(onError);
// fork(onError, onSucces)(Future); // Future(Future(x)) => chain instead of map
// chain => map / join

// saveToStorage:: String -> Future (string, string)
const getRefreshToken = (x) =>
  Future((rej, res) => {
    log.push("getting refresh token");
    if (!x) rej("Invalid token provided");
    else res(x);

    return () => {};
  });

// saveToStorage:: x -> Future (string, boolean)
const saveToStorage = (x) =>
  Future((rej, res) => {
    log.push("saving to storage");
    if (!x) rej("Invald data provided");
    else res(true);

    return () => {};
  });

// login :: Object -> Future(string, Object)
const login = (data) =>
  Future((rej, res) => {
    log.push(["Login user", !data?.username]);
    if (!data?.username) rej("No username present");
    else res({ ...data, accessToken: "e203an8nd239AB0.39a0Aan239A" });

    return function onCancel() {
      log.push("Cancelling login");
    };
  });

const onSuccess = (x) => {
  console.log("onSuccess", x);
  console.log(log);
};

const onError = (x) => {
  console.error("onError", x);
  console.log(log);
};

// login()
//     .then((user) => getRefreshToken(user.accessToken))
//     .then((token) => saveToStorage(token))
//     .catch(() => console.log("Login process failed"))

// loginAndSaveCredentials :: User -> Future(a b)
const loginAndSaveCredentials = r.compose(
  fork(onError)(onSuccess),
  r.chain(saveToStorage),
  r.chain(getRefreshToken),
  r.map(r.prop("accessToken")),
  r.chain(rejectAfter(5000)), // waits for 5 seconds
  login
);

const cancel = loginAndSaveCredentials({ username: "Joseph" });
