import * as R from "ramda";
import { S } from "sanctuary";
import Future, { fork } from "fluture";
import { eitherToMaybe, eitherToTask, maybeToFuture } from "./nt";
import { trace } from "./utils";

R.compose(
  Future.fork(trace("Reject"))(trace("Resolve")),
  maybeToFuture,
  eitherToMaybe
)(S.Left("Something"));

const findUserById = (userId) => {
  if (userId === "00") return S.Right({ name: "John Carter" });
  return S.Left("User doesn't exist");
};

// findNameById :: Number -> Task Error (Either Error User)
const findNameById = R.compose(
  S.map(S.prop("name")),
  eitherToTask,
  findUserById
);

fork(trace("User not found"))(trace("Found User"))(findNameById("00"));

const intercalate = R.curry(function intercalate(str, xs) {
  return xs.join(str);
});

// strToList :: String -> [Char]
const strToList = R.split("");

// listToStr :: [Char] -> String
const listToStr = intercalate("");

trace("Test1")(R.compose(strToList)("Hello"));
trace("Test2")(R.compose(listToStr)(["J", "o", "h", "n"]));

const sortLetters = R.compose(listToStr, R.sortBy(R.identity), strToList);
console.assert(
  sortLetters("sortme") === "emorst",
  "The function gives incorrect results"
);
