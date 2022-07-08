import { S } from "./sanctuary";
import * as R from "ramda";
import Future from "fluture";
import { Maybe } from "sanctuary";

// eitherToMaybe :: Either b a -> Maybe a
export const eitherToMaybe = S.either(R.always(S.Nothing))(S.of(Maybe));

// eitherToTask :: Either b a -> Task b a
export const eitherToTask = S.either(Future.reject)(S.of(Future));

// maybeToFuture :: Maybe a  -> Task Err a
export const maybeToFuture = (x) =>
  S.isJust(x) ? S.of(Future)(x) : Future.reject("None");
