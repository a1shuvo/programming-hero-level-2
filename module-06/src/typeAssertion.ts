// Type assertion

let anything: any;
anything = 123;
(anything as number).toString(); // type assertion
console.log(anything);

const KgToGmConverter = (
  input: number | string
): string | number | undefined => {
  if (typeof input === "number") {
    return input * 1000;
  } else if (typeof input === "string") {
    const [value] = input.split(" ");
    return `Converted output is: ${Number(value) * 1000}`;
  }
};

const result1 = KgToGmConverter(2) as number; // type assertion
console.log(result1);
const result2 = KgToGmConverter("2 KG") as string; // type assertion
console.log(result2);

type CustomError = {
  message: string;
};
try {
} catch (error) {
  console.log((error as CustomError).message); // type assertion
}
