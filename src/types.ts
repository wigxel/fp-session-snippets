type Distinct<T, DistinctName> = T & { __TYPE__: DistinctName };
type CustomerId = Distinct<number, "CustomerId">;
type RiderId = Distinct<number, "RiderId">;

const rider_id = 24 as RiderId;
const customerId = 26 as CustomerId;
