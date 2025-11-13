// Utility Types

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  color?: string;
};

type ProductSummary = Pick<Product, "id" | "name" | "price">;

type ProductWithoutStock = Omit<Product, "stock" | "color">;

type ProductWithColor = Required<Product>;

const product1: ProductWithColor = {
  id: 1,
  name: "Laptop",
  price: 199,
  stock: 10,
  color: "black",
};

type OptionProduct = Partial<Product>;

type ReadonlyProduct = Readonly<Product>;

const emptyObject: Record<string, unknown> = {};
