// Generics with interface

interface Developer<T, X = null> {
  name: string;
  salary: number;
  device: {
    brand: string;
    model: string;
    releasedYear: number;
  };
  smartWatch: T;
  bike?: X;
}

interface WatchWithoutBrand {
  heartRate: string;
  callSupport: boolean;
}

interface AppleWatch {
  heartRate: string;
  callSupport: boolean;
  aiFeature: boolean;
  calculator: boolean;
}

const poorDeveloper: Developer<WatchWithoutBrand> = {
  name: "Mr. Poor",
  salary: 10,
  device: {
    brand: "Lenevo",
    model: "A21",
    releasedYear: 2015,
  },
  smartWatch: {
    heartRate: "200",
    callSupport: false,
  },
  bike: null,
};

const richDeveloper: Developer<
  AppleWatch,
  {
    brand: string;
    engineCapacity: number;
  }
> = {
  name: "Mr. Rich",
  salary: 20,
  device: {
    brand: "HP",
    model: "X32",
    releasedYear: 2025,
  },
  smartWatch: {
    heartRate: "200",
    callSupport: true,
    aiFeature: true,
    calculator: true,
  },
  bike: {
    brand: "Yamaha",
    engineCapacity: 200,
  },
};
