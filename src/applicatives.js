import { S } from "./sanctuary";
import R from "ramda";
import IO from "fantasy-io";

const add = (x) => (y) => x + y;

console.log("Type", S.show(add(1)));

const value = S.lift2(add)(S.Left(14))(S.Left(12));

console.log("Value", S.show(value));

// safeAdd :: Maybe Number -> Maybe Number -> Maybe Number
// of/ap => map
// map => of/ap
const safeAdd = (a, b) => R.compose(R.ap(b), R.map(add))(a);

// chain => map/join => of/ap/join
// console.log("Bombs", safeAdd(S.Just(1), S.Just(12)));

const localStorage = {
  player1: { id: 1, name: "Albert" },
  player2: { id: 2, name: "Theresa" },
};

// getFromCache :: String -> IO User
const getFromCache = (x) => IO(() => localStorage[x]);

// game :: User -> User -> String
const game = R.curry((p1, p2) => `${p1.name} vs ${p2.name}`);

// startGame :: IO String
const startGame = R.liftN(2)(game)(getFromCache("player1"))(
  getFromCache("player2")
);

console.log(startGame.unsafePerform());
