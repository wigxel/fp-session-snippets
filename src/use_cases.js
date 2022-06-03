import Maybe from "folktale/maybe";
import * as ramda from "ramda";
import { compose } from "ramda";
import Result from "folktale/result"; // Either
import IO from "fantasy-io";

const value = Maybe.of(12);

// incrF :: Functor f => f Int -> f Int
const incrF = ramda.map(ramda.add(1));

console.log("map increment ->", incrF(value));

const user = { id: 2, name: "Albert", active: true };
const safeProp = (prop) => (obj) =>
  prop in obj ? Maybe.of(obj[prop]) : Maybe.Nothing();

// initial :: User -> Maybe String
const initial = compose(ramda.map(ramda.head), safeProp("name"));

// showWelcome :: User -> String
const showWelcome = compose(ramda.concat("Welcome "), ramda.prop("name"));

// checkActive :: User -> Either String User
const checkActive = function checkActive(user) {
  return user.active
    ? Result.Ok(user)
    : Result.Error("Your account is not active");
};

// eitherWelcome :: User -> Either String String
const eitherWelcome = compose(ramda.map(showWelcome), checkActive);

// validateUser :: (User -> Either String ()) -> User -> Either String User
const validateUser = ramda.curry((validate, user) =>
  validate(user).map((_) => user)
);

// save :: User -> IO User
const save = (user) => new IO(() => ({ ...user, saved: true }));

const charGreaterThan3 = (str) =>
  str?.length > 3 ? Result.Ok(str) : Result.Error("Name is less than 3");

// validateName :: User -> Either String ()
const validateName = compose(charGreaterThan3, ramda.prop("name"));

// register :: User -> IO String
const register = compose(
  ramda.map(save),
  ramda.map(showWelcome),
  validateUser(validateName)
);

console.log("Register", register({}));

const userWithAddress = {
  id: 1,
  name: "Albert",
  address: {
    street: {
      number: 22,
      name: "Walnut St",
    },
  },
};

const getStreetName = compose(
  ramda.chain(safeProp("name")),
  ramda.chain(safeProp("street")),
  safeProp("address")
);

// console.log('Street Name', getStreetName(userWithAddress));

// getFile :: IO String
const getFile = IO.of("/home/mostly-adequate/ch09.md");

// pureLog :: String -> IO ()
const pureLog = (str) => new IO(() => console.log("The filename", str));

const getFilename = compose(ramda.last, ramda.split("/"));

const logFilename = getFile.map(getFilename).chain(pureLog);

logFilename.unsafePerform();

let emails = ["kelvin@brother.com", "peter@fredrick"];

// validateEmail :: Email -> Either String Email
const validateEmail = (email) =>
  email.includes("@")
    ? Result.Ok(email)
    : Result.Error("Invalid email provided");

// addToMailingList :: Email -> IO([Email])
const addToMailingList = (email) => IO.of(emails.concat([email]));

// emailBlast :: [Email] -> IO ()
const emailBlast = (emails) =>
  new IO(() => {
    console.log("Blasting all emails", emails);
    emails = [];
  });

const resultEither = (onError, onOk) => (result) =>
  result.matchWith({
    Ok: onOk,
    Error: onError,
  });

const joinMailingList = compose(
  resultEither(console.error, ({ value }) => console.info),
  ramda.map(compose(ramda.chain(emailBlast), addToMailingList)),
  validateEmail
);

joinMailingList("owonwo@live.com");