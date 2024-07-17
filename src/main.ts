// Intersection Types
// Intersection types allow us to combine multiple types into one. For example, if we have two types, we can combine them into one type that has all the members of both types. To do this, we use the & operator. For example, we can create a type that is a combination of two types, like this:

// type Admin = {
//     name: string;
//     privileges: string[];
// };

// type Employee = {
//     name: string;
//     startDate: Date;
// };

// type ElevatedEmployee = Admin & Employee;

interface Admin {
  name: string;
  privileges: string[];
}

interface Employee {
  name: string;
  startDate: Date;
}

interface ElevatedEmployee extends Employee, Admin {}

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};

// Intersections can be used with any types not just objects. For example, we can create a type that is a combination of two types, like this:

type Combinable = string | number;
type Numeric = number | boolean;

// TypeScript will see Unversal as type number since that is the only type that is common between Combinable and Numeric.
type Universal = Combinable & Numeric;

// Intersection of untion type will show what is common between the two types. While object types will show the combination of both types.

// Type Guards
// Type guards are some expressions that perform runtime checks that guarantee the type in some scope. For example, we can use the typeof operator to check the type of a variable. Here is an example:

// function add(a: Combinable, b: Combinable) {
//   // Type Guard using typeof
//   if (typeof a === "string" || typeof b === "string") {
//     return a.toString() + b.toString();
//   }

//   // a + b will be treated as numbers
//   return a + b;
// };

// Union types can be used with objects as well. For example, we can create a type that is a combination of two types, like this:
type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);

  // Type Guard using `in` operator built into JavaScript
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }

  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  }
}

printEmployeeInformation(e1);

// When working with classes, we can use the instanceof operator to check the type of an object. For example, we can create a class and check if an object is an instance of that class, like this:

// Constructor functions
class Car {
  // drive() method
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }

  loadCargo(amount: number) {
    console.log('Loading cargo...' + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

// Type guard using instanceof
function useVehicle(vehicle: Vehicle) {
  vehicle.drive();

  // Type Guard using instanceof provided by JavaScript
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

// Interfaces do not work with instanceof. We can use the in operator to check if a property exists on an object. We can also use the typeof operator to check the type of a variable. We can use the instanceof operator to check if an object is an instance of a class.

// Discriminated Unions are a special type of Type Guard
// With each interface we add a common property that is a type property that is a literal string. This is called a Discriminated Union.
// When working with objects and union types, we can use Discriminated Unions to create a type guard. Discriminated Unions are a pattern that helps to make type guards easier to implement. For example, we can create a type that is a combination of two types, like this:
interface Bird {
  type: "bird"; // This is not a value but a string literal, type assignment
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  // Could use the following if statements to check the type of the animal
  if ("flyingSpeed" in animal) {
    console.log("Moving at speed: " + animal.flyingSpeed);
  }

  // Discriminated Union
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
  }

  console.log("Moving at speed: " + speed);
}

// We use a property we know that exists on the object to check the type of the object. This is called a Discriminated Union. We can use a switch statement to check the type of the object.
moveAnimal({type: 'bird', flyingSpeed: 10});

// Type Casting
// Type casting is a way to tell TypeScript that a value is of a specific type where TypeScript is not able to detect it on it's own. A good example is if we have access to the DOM.

// TypeScript will know that the paragraph is an HTMLParagraphElement
// const paragraph = document.querySelector('p');
const paragraph = document.getElementById('message-output');

// What if we have an input element and we want to get the value of the input element. TypeScript will not know that the input element is an HTMLInputElement. We can use type casting to tell TypeScript that the input element is an HTMLInputElement.

// There are two ways to do type casting in TypeScript. We can use the as keyword or angle brackets. We can use the as keyword like this:
const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;
// An alternative way to do type casting in React for example is to use the as keyword like this:
// const userInputElement = document.getElementById('user-input')! as HTMLInputElement;

userInputElement.value = 'Hi there!';

// const userInputElement = document.getElementById('user-input');

// if (userInputElement) {
//   (userInputElement as HTMLInputElement).value = 'Hi there!';
// }

// Index Properties
// Index properties is a TypeScript feature that allows us to create objects which are more flexible regarding the properties they might hold. For example, we can create an object that can hold any number of properties with any name, like this:

// This should be flexible enough to hold any number of properties with any name
// I don't know in advance which properties I will have
interface ErrorContainer {
  // This is an index property
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: 'Not a valid email!',
  username: 'Must start with a capital character!'
};

// This is a flexible object that can hold any number of properties with any name. We can use an index property to create a flexible object.

// Function Overloads
// Function overloads allow us to define multiple functions with the same name and different function signatures. For example, we can create a function that takes a string or a number and returns a string, like this:

// This is a function overload
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: Combinable, b: Combinable) {
  // Type Guard using typeof
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }

  return a + b;
}

const result = add('Max', ' Schwarz');
result.split(' ');