import * as R from "ramda";
import Future, { fork } from "fluture";

// Problem: We want to fetch a script object via the `getScript` function and generate a script tag from the date
const getScript = (scriptName, callback) => {
  setTimeout(() => {
    if (typeof scriptName !== "string")
      return callback(new Error("Invalid script name"));
    callback(null, { src: "/script/" + scriptName });
  }, 2000);
};

const renderScriptTag = ({ src }) =>
  `<script src="${src}" type="text/javascript" />`;

const of = Future["fantasy-land/of"];
const all = (arrayOfFuture) => R.sequence(of, arrayOfFuture); // [Future(1), Future(2), Future(3)] => Future([1,2,3])

const getScriptF = (script) =>
  Future((rej, res) => {
    getScript(script, (err, data) => (err ? rej(err) : res(data)));
    return () => {};
  });

const onSuccess = (x) => {
  console.log("onSuccess", x);
  return x;
};

const onError = (x) => {
  console.error("onError", x);
  return x;
};

const handle = fork(onError)(onSuccess);

all([
  getScriptF("chunk-0.js"),
  getScriptF("chunk-2.js"),
  getScriptF("chunk-3.js"),
])
  .pipe(R.map(R.map(renderScriptTag)))
  .pipe(handle);

// Solving the same problem using Promise
const getScriptP = (script) =>
  new Promise((res, rej) => {
    getScript(script, (err, data) => (err ? rej(err) : res(data)));
    return () => {};
  });

Promise.all([
  getScriptP("chunk-1.js"),
  getScriptP("chunk-2.js"),
  getScriptP("chunk-3.js"),
])
  .then(R.map(renderScriptTag))
  .then(onSuccess)
  .catch(onError);
