// conditional types
// if a type conditionally depends on another type

type A = null;
type B = undefined;

type C = A extends number ? true : B extends undefined ? true : false;

type RichPeoplesVehicle = {
  bike: string;
  car: string;
  ship: string;
};

type CheckVehicle<T> = T extends keyof RichPeoplesVehicle ? true : false;

type HasBike = CheckVehicle<"ship">;
