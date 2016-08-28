
// Optional properties and methods

// class MyClass {
//   a: number;
//   b?: number;
// }

// function f(a: MyClass) {

// }

// f({ a: 0 });

// Private and protected constructors

// class Singleton {
//     private static instance: Singleton;

//     private constructor() { }

//     static getInstance() {
//         if (!Singleton.instance) {
//             Singleton.instance = new Singleton();
//         }
//         return Singleton.instance;
//     } 
// }

// let e = new Singleton(); // Error: constructor of 'Singleton' is private.
// let v = Singleton.getInstance();

// Abstract properties and accessors

// abstract class MyClass {
//   abstract name: string;
//   abstract temp();
//   anotherMethod() {
//     return 'Hello world!';
//   }
// }

// class ExtendedClass extends MyClass {
//   name: string;
//   temp() {
//     return 0;
//   }
// }

// // Can't instantiate an abstract class
// // let a = new MyClass();

// let a = new ExtendedClass();
// a.anotherMethod();

// Read-only properties

// class MyClass {
//   readonly name: string;

//   constructor() {
//     this.name = 'asdf'; // Okay to set readonly properties within the constructor
//   }
// }

// let a = new MyClass();
// a.name = 'asdf'; // Error... property is readonly

// Read-only array example

// let foo: ReadonlyArray<number> = [1, 2, 3];
// console.log(foo[0]);   // Okay
// foo.push(4);           // Error: `push` does not exist on ReadonlyArray as it mutates the array
// foo = foo.concat([4]); // Okay: create a copy
// foo[0] = null;         // Error: cannot assign to an index of a readonly array
