import * as R from "ramda";
import { S } from "./sanctuary";

export class Map {
  constructor(x) {
    console.assert(
      typeof x === "object" && x !== null,
      "tried to create `Map` with non object-like"
    );

    this.$value = x;
  }

  inspect() {
    return `Map(${inspect(this.$value)})`;
  }

  getType() {
    const sample = this.$value[Object.keys(this.$value)[0]];

    return `(Map String ${sample ? getType(sample) : "?"})`;
  }

  insert(k, v) {
    const singleton = {};
    singleton[k] = v;
    return new Map(Object.assign({}, this.$value, singleton));
  }

  reduce(fn, zero) {
    return this.reduceWithKeys((acc, _, k) => fn(acc, k), zero);
  }

  reduceWithKeys(fn, zero) {
    return Object.keys(this.$value).reduce(
      (acc, k) => fn(acc, this.$value[k], k),
      zero
    );
  }

  map(fn) {
    return new Map(
      this.reduceWithKeys((obj, v, k) => {
        obj[k] = fn(v); // eslint-disable-line no-param-reassign
        return obj;
      }, {})
    );
  }

  sequence(of) {
    return this.traverse(of, (x) => x);
  }

  traverse(of, fn) {
    return this.reduceWithKeys(
      (f, a, k) =>
        R.compose(
          R.ap(f),
          S.map((b) => (m) => m.insert(k, b))
        )(fn(a)),
      of(new Map({}))
    );
  }
}
