import { create, env } from "sanctuary";
import $ from "sanctuary-def";
import { default as type } from "sanctuary-type-identifiers";
import * as r from "ramda";
import { Just } from "folktale/maybe";

//    Identity :: a -> Identity a
const Identity = (x) => {
  const identity = Object.create(Identity$prototype);
  identity.value = x;
  return identity;
};

//    identityTypeIdent :: String
const identityTypeIdent = "sanctuary/Identity@1";

const Identity$prototype = {
  "@@type": identityTypeIdent,
  "@@show": function () {
    return `Identity (${S.show(this.value)})`;
  },
  "fantasy-land/empty": function () {
    return `Identity()`;
  },
  "fantasy-land/invert": function () {
    return this.value * -1;
  },
  "fantasy-land/map": function (f) {
    return Identity(f(this.value));
  },
};

//    IdentityType :: Type -> Type
const IdentityType = $.UnaryType("Identity")(
  "http://example.com/my-package#Identity"
)([])((x) => type(x) === identityTypeIdent)((identity) => [identity.value]);

const S = create({
  checkTypes: true,
  env: env.concat([IdentityType($.Unknown)]),
});

const value = S.map(S.sub(23))(Identity(90));

console.log(S.type(Identity(23)), S.type([1, 2, 3]));
console.log(S.type($.Identity($.Unknown)));
console.log(S.is(IdentityType($.Number))(Identity(3)));

console.log(S.show(Identity(S.Right(S.Left(30)))));

const Z = create({
  checkTypes: false,
  env: env.concat([IdentityType($.Unknown)]),
});

console.log("Z", Z.equals(3)(3), S.equals(3)(3));
console.log("Z", Z.equals(NaN)(NaN), S.equals(NaN)(NaN));

// const associative = S.equals(S.Just([1, 1, 3, 4]))(S.Just(["a", "b", "c"]));
// console.log("associative", associative);

const even = r.compose(r.equals(0), r.modulo(r.__, 2));

console.log("isEmpty", S.empty(Identity(3)));
console.log("filter", type(S.filter(even)([1, 2, 3, 4])));
console.log("filterMaybe", S.reject(even)(S.Just(11)));

console.log(".map on Object", S.map(r.multiply(3))({ x: 1, b: 3 }));
console.log(".map on a number", S.map(r.add(1))(r.add(1))(9));

const namePair = S.Pair(1)("Hello");

console.log(".map on a Pair", S.map(r.repeat(r.__, 2))(namePair));

console.log(
  ".flip on array of fns",
  S.flip({ addOne: S.map(r.add(1)), multiplyBy2: S.map(r.multiply(2)) })([
    12, 24, 1,
  ])
);

// Object.entries(2).map(bimap(fn, fn2)); // => binary map
// A bimap is basically attach to a type with 2 types. Either(Left/Right) Pair(1,2),
const getName = () => S.Left("Sam");
const replaceName = r.flip(r.replace("{name}"));

console.log(
  "Trying out BiFunctors",
  S.flip({
    bimap: S.bimap(replaceName("We are sorry {name}"))(
      replaceName("Welcome {name}")
    ),
    mapLeft: S.mapLeft(replaceName("Hello {name}")),
  })(getName())
);
const getJuice = (index) => {
  if (index === 0) return S.Nothing;
  return S.Just("Mango");
};

console.log("Testing out alt", S.alt(S.Just("Water"))(getJuice(1)));
console.log("Testing out alt", S.alt(S.Just("Water"))(getJuice(0)));

// console.log(S.add(1)(S.Just(2)));
