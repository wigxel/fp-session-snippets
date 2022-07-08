import { curry } from "ramda";

export const trace = curry((msg) => (x) => {
  console.log(msg, x);
  return x;
});
