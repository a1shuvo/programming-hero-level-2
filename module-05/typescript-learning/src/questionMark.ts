// ? : ternary operator : decesion making
// ?? : nullish coalescing operator (only works if null or undefined)
// ?. : optional chaining

const eligibleForMarrige = (age: number) => {
  const result = age >= 21 ? "Eligible" : "Not eligible";
  console.log(result);
};

eligibleForMarrige(21);

const userTheme = undefined;
const selectedTheme = userTheme ?? "Light Theme";
console.log(selectedTheme);

const user: {
  address: {
    city: string;
    town: string;
    postalCode?: number;
  };
} = {
  address: {
    city: "Mymensingh",
    town: "Phulpur",
  },
};

const postalCode = user?.address?.postalCode;
console.log(postalCode);
