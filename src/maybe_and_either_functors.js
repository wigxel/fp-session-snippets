import * as r from "ramda";
import { compose, pipe } from "ramda";
import Maybe from "folktale/maybe";
import Result from "folktale/result";

// Maybe -> Something or Nothing
// Either -> Left or Right
// Result -> Error or Ok

// Example 1: We want to compose a function that takes in a User object and returns the name of the User in this form
// "Hi, {USERNAME}". Below is an example of how we do that declaratively using FP.

// getUserName :: User -> Maybe
const getUserName = (user) => {
  if (!user?.name) return Maybe.Nothing();

  return Maybe.Just(user.name);
};

// greet :: String -> Maybe
const greet = (prefix) => (name) => {
  if (typeof name !== "string") return Maybe.Nothing();

  return Maybe.Just(prefix + name);
};

// User
const User = { name: "Peter", age: 30 };

// getAndGreet :: User -> Maybe (String)
const getAndGreet = pipe(getUserName, r.chain(greet("Hi ")), r.map(r.toUpper));

// getUserName(User).chain(greet).map(toUpper);
// const finalValue = getUserName(User).getOrElse('Invalid username provided');

// using pattern matching for control.
getAndGreet().matchWith({
  Just: ({ value }) => console.log(value),
  Nothing: () => console.error("Invalid username provided"),
});

// Rewriting our getAndGreet function in an imperative way.
function imperativeGetAndGreet(user, greetPrefix) {
  if (!(user?.name || greetPrefix)) return null;
  if (typeof user.name !== "string") return null;
  return greetPrefix + user.name.toUpperCase();
}

imperativeGetAndGreet(User, "Hi");

// map & join -> chain / flatMap
// Container (Maybe Either and IO) or simplify our flow

// Folktale api uses the Result instead of Either. Yet, they are used for the same thing purpose.
// Santuary | Folktale
// Either | Result
// Either.Right  | Result.Ok
// Either.Left | Result.Error

// In functional programming throwing of exceptions are not allowed.
// We use the Either Functor for that purpose.

// getFromDatabase :: String -> Object -> Result (string, UserDto)
const getFromDatabase = (table, payload) => {
  if (!table) return Result.Error("Table not specified");
  if (!payload) return Result.Error("Payload is required");

  return Result.Ok({ username: "owonwo", id: "23", status: "available" });
};

// debugging
const log = (title) => (x) => {
  console.log(title, x);
  return x;
};

// UserDto -> User
const resolveName = (obj) => ({ ...obj, name: obj.username });

// Result (err, ok)
const fetchUserNameFromDB = compose(
  r.chain(compose(getAndGreet, resolveName)), //  User -> Maybe (String)
  getFromDatabase // str -> obj -> Result(string, obj)
);

console.log(fetchUserNameFromDB("users", "select * from users"));

// The same logic rewritten in an Imperative / Procedural Paradigm
function imperativeGetAndGreet2(table, payload1) {
  if (!table) throw new Error("Table not specified");
  if (!payload) throw new Error("Payload is required");

  return { username: "owonwo", id: "23", status: "available" };
}

const imperativeGetFromDatabase = (table, payload) => {
  try {
    const data = imperativeGetFromDatabase(table, payload);
    return imperativeGetAndGreet2({ ...data, name: data.name });
  } catch (err) {
    if (err.code === 23000) logToSentry();
    throw err;
  }
};
