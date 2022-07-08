import * as R from "ramda";
import { S } from "./sanctuary";
import Future, { fork } from "fluture";
import { eitherToMaybe, eitherToTask, maybeToFuture } from "./nt";
import { trace } from "./utils";
import { Map } from "./Map";

// readFile :: FileName -> Task Error String
const readFile = (filename) => {
  const value = { "bob.js": "Wizard of Oz", "fire.js": "Dragon Fire and Ice" }[
    filename
  ];
  if (value) return S.of(Future)(value);
  return Future.reject(value);
};

// firstWords :: String -> String
const firstWords = R.compose(R.join(" "), R.take(3), R.split(" "));

// tldr :: FileName -> Task Error String
const tldr = R.compose(R.map(firstWords), readFile);

// trace("Payload")(R.map(tldr)(["bob.js", "fire.js"]));

fork(trace("onError"))(trace("onSuccess"))(
  R.traverse(S.of(Future), tldr, ["bob.js", "fire.js"])
);

// httpGet :: Route -> Task Error JSON
const httpGet = (route) =>
  Future((rej, res) => {
    setTimeout(() => {
      res({ message: "The expected JSON message", route });
    }, 2000);

    return () => {};
  });

// routes :: Map Route Route
const routes = new Map({ "/": "/", "/about": "/about" });
// getJsons :: Map Route Route -> Map Route (Task Error JSON)
const getJsons = R.map(httpGet);
trace("Bummer")(S.of(Future)(1));

const value = R.traverse(S.of(Future))(getJsons)(routes);
trace("OOO")(value);

// fork(trace("onError"))(trace("onSuccess"))(httpGet(routes.get("/")));
