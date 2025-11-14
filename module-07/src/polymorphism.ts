// Polymorphism: Bohurupi

class Shape {
  getArea(): number {
    return 0;
  }
}

class Circle extends Shape {
  radius: number;
  constructor(radius: number) {
    super();
    this.radius = radius;
  }
  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  height: number;
  weight: number;
  constructor(height: number, weight: number) {
    super();
    this.height = height;
    this.weight = weight;
  }
  getArea(): number {
    return this.height * this.weight;
  }
}

const getArea = (param: Shape) => {
  console.log(param.getArea());
};

const shape = new Shape();
const circle = new Circle(10);
const rectangle = new Rectangle(10, 20);

getArea(shape);
getArea(circle);
getArea(rectangle);
