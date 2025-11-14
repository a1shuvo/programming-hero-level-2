// OOP: Class - Object

class Animal {
  name: string;
  species: string;
  sound: string;
  constructor(name: string, species: string, sound: string) {
    this.name = name;
    this.species = species;
    this.sound = sound;
  }

  makeSound() {
    console.log(`The ${this.name} is ${this.sound}`);
  }
}

const dog = new Animal("Kalu", "Dog", "Barking");

console.log(dog.name, dog.sound, dog.species);
dog.makeSound();

// Parameter properties

class Person {
  constructor(public name: string, public age: number) {}
}

const person1 = new Person("Shuvo Saha", 32);

console.log(person1.name);
