// nullable type

const getUser = (input: string | null) => {
  if (input) {
    console.log(`From DB: ${input}`);
  } else {
    console.log("From DB: All User");
  }
};

getUser(null);

// unknown types
const discountCalculator = (input: unknown) => {
  if (typeof input === "number") {
    const discountedPrice = input * 0.1;
    console.log(discountedPrice);
  } else if (typeof input === "string") {
    const [discountedPrice] = input.split(" ");
    console.log(Number(discountedPrice) * 0.1);
  } else {
    console.log("Wrong Input");
  }
};

discountCalculator(100);
discountCalculator("100 TK");
discountCalculator(null);

// void or never
const throwError = (msg: string): never => {
  throw new Error(msg);
};

throwError("Error...");
