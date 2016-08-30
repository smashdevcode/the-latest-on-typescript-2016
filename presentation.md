
# Presentation

## Setup

### Demo: Installation

#### Official TypeScript NuGet package (1.8)

Official NuGet packages are available for the Typescript Compiler (tsc.exe) as well as the MSBuild integration (Microsoft.TypeScript.targets and Microsoft.TypeScript.Tasks.dll).

This is helpful when you're using TypeScript within an ASP.NET project and you aren't already using NPM.

Stable packages are available here:

* [Microsoft.TypeScript.Compiler](https://www.nuget.org/packages/Microsoft.TypeScript.Compiler/)
* [Microsoft.TypeScript.MSBuild](https://www.nuget.org/packages/Microsoft.TypeScript.MSBuild/)

Nightly builds are available here:

* [TypeScript-Preview](https://www.myget.org/gallery/typescript-preview)

#### Nightly builds (1.6)

You can now install nightly builds using NPM.

```
npm install -g typescript@next
```

You can also install beta releases using NPM.

```
npm install -g typescript@beta
```

### Demo: Type Acquisition

To verify the version that you have installed, run the following command.

```
tsc -v
```

Install the beta build of TypeScript.

```
npm install -g typescript@beta
```

Update your Visual Studio Code user setttings in order to make the editor happy.

```
// Specifies the folder path containing the tsserver and lib*.d.ts files to use.
"typescript.tsdk": "/usr/local/lib/node_modules/typescript/lib"
```

Install your dependencies and your declaration file(s)!

```
npm install --save lodash
npm install --save-dev @types/lodash
```

_Note: There doesn't appear to be a way to restrict usage of the global variable._

## Data Typing and Code Analysis

### Demo: Strict Null Checking

#### `null` and `undefined` aware types and strict null checks (2.0)

TypeScript 2.0 introduces two new types, `null` and `undefined`.

Previously, `null` and `undefined` were assignable to anything. The new `strictNullChecks` compiler option removes `null` and `undefined` from very type. This forces you to be explicit and deliberate with where `null` and `undefined` are expected or allowed.

```
// Compiled with --strictNullChecks
let x: number;
let y: number | undefined;
let z: number | null | undefined;
x = 1;  // Ok
y = 1;  // Ok
z = 1;  // Ok
x = undefined;  // Error
y = undefined;  // Ok
z = undefined;  // Ok
x = null;  // Error
y = null;  // Error
z = null;  // Ok
x = y;  // Error
x = z;  // Error
y = x;  // Ok
y = z;  // Error
z = x;  // Ok
z = y;  // Ok
```

Types that don't include `undefined` must be assigned a value before they can be used.

```
// Compiled with --strictNullChecks
let x: number;
let y: number | null;
let z: number | undefined;
x;  // Error, reference not preceded by assignment
y;  // Error, reference not preceded by assignment
z;  // Ok
x = 1;
y = null;
x;  // Ok
y;  // Ok
```

Optional parameters and properties automatically have `undefined` added to their types.

```
// Compiled with --strictNullChecks
type T1 = (x?: number) => string;              // x has type number | undefined
type T2 = (x?: number | undefined) => string;  // x has type number | undefined
```

Non-null and non-undefined type guards

```
function f(x: number): string {
  return x.toString();
}
const x: number | null | undefined;

// f(x); // error

// if (x) {
//   f(x); // okay... x is a number
// }

// const a = x != null ? f(x) : ''; // a is a string
// const a = x && f(x); // a is a string?
```

Expression operators

Expression operators allow operand types to include `null` and/or `undefined` but always produce non-null and non-undefined types.

```
function sum(a: number | null, b: number | null) {
  return a + b;  // Produces value of type number
}
```

The `&&` operator adds `null` and/or `undefined` depending on what's present in the type of the left operand. The `||` operator removes both `null` and `undefined` from the type of the left operand.

```
interface Entity {
  name: string;
}
let x: Entity | null;
let s = x && x.name;  // s is of type string | null
let y = x || { name: "test" };  // y is of type Entity
```

Type widening

The `null` and `undefined` types are not widened to `any` as they were in previous versions of TypeScript.

```
let z = null; // z is of type null
```

Non-null assertion operator

In case the compiler cannot determine if your type doesn't contain null or defined, you can explicitly tell the compiler that it doesn't.

```
interface Entity {
    name: string;
}

function validateEntity(e: Entity | null) {
  if (e === null) {
    throw new Error('e is null');
  }
}

function processEntity(e: Entity | null = null) {
    validateEntity(e);
    let s = e!.name;  // Assert that e is non-null and access name
}
```

### Demo: Type Analysis

#### Control flow based type analysis (2.0)

TypeScript 2.0 implements a control flow based type analysis for local variables and parameters. Previously the type analysis was limited to `if` statements and `?:` conditional expressions and didn't include the effects of assignments and control flow constructs such as `return` and `break`.

```
function foo(x: string | number | boolean) {
    if (typeof x === "string") {
        x; // type of x is string here
        x = 1;
        x; // type of x is number here
    }
    x; // type of x is number | boolean here
}

function bar(x: string | number) {
    if (typeof x === "number") {
        return;
    }
    x; // type of x is string here
}
```

Control flow based type analysis plays an important role when strict null checking is enabled. This allows you to allow `null` or `undefined` and then write a type guard to eliminate those types.

```
function test(x: string | null) {
    if (x === null) {
        return;
    }
    x; // type of x is string in remainder of function
}
```

It also allows the compiler to know definitely when a parameter or local has been assigned a value and is safe to use.

```
function mumble(check: boolean) {
    let x: number; // Type doesn't permit undefined
    x; // Error, x is undefined
    if (check) {
        x = 1;
        x; // Ok
    }
    x; // Error, x is possibly undefined
    x = 2;
    x; // Ok
}
```

### Demo: Maintaining Clean Code

#### Flag unused declarations with --noUnusedParameters and --noUnusedLocals (2.0)

Two new compiler options help you keep a clean code base by not allowing unused parameters or locals.

```
{
  "compilerOptions": {
    "noUnusedParameters": true,
    "noUnusedLocals": true
  }
}
```

### Demo: Type Enhancements

#### String literal types (1.8)

String literal types make it easy to restrict a variable or parameter to a set of strings.

```
let a: 'Red' | 'Blue' | 'Green';

a = 'Red';
// a = 'Yellow';
```

## Classes

### Demo: Class Improvements

#### Optional class properties (2.0)

Optional properties and methods can now be declared in classes, similar to what is already permitted in interfaces.

```
class MyClass {
  a: number;
  b?: number;
}

function f(a: MyClass) {

}

f({ a: 0 });
```

#### Private and Protected Constructors (2.0)

A class constructor may be marked private or protected. A class with private constructor cannot be instantiated outside the class body, and cannot be extended. A class with protected constructor cannot be instantiated outside the class body, but can be extended.

```
class Singleton {
    private static instance: Singleton;

    private constructor() { }

    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    } 
}

let e = new Singleton(); // Error: constructor of 'Singleton' is private.
let v = Singleton.getInstance();
```

#### Abstract properties and accessors (2.0)

TypeScript 1.6 added support for abstract classes and methods but not properties and accessors. An abstract class now can declare abstract properties and/or accessors.

```
abstract class MyClass {
  abstract name: string;
  abstract temp();
  anotherMethod() {
    return 'Hello world!';
  }
}

class ExtendedClass extends MyClass {
  name: string;
  temp() {
    return 0;
  }
}

// Can't instantiate an abstract class
// let a = new MyClass();

let a = new ExtendedClass();
a.anotherMethod();
```

#### Read-only properties (2.0)

Properties can be marked as readonly which will prevent any mutations.

```
class MyClass {
  readonly name: string;

  constructor() {
    this.name = 'asdf'; // Okay to set readonly properties within the constructor
  }
}

let a = new MyClass();
a.name = 'asdf'; // Error... property is readonly
```

TypeScript also ships with a `ReadonlyArray` interface which provides an immutable array.

```
let foo: ReadonlyArray<number> = [1, 2, 3];
console.log(foo[0]);   // Okay
foo.push(4);           // Error: `push` does not exist on ReadonlyArray as it mutates the array
foo = foo.concat([4]); // Okay: create a copy
```

## ES6/ES++ support

### Demo: Async/Await

#### async/await support in ES6 targets (Node v4+) (1.7)

TypeScript supports asynchronous functions for engines that have native support for ES6 generators, e.g. Node v4 and above.

_Note: Support for compiling down to ES5 and ES3 has been pushed out to TypeScript 2.1._

```
'use strict';

// Example 1

function f(throwError: boolean = false) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (throwError) {
        console.log('f() threw an error!');
        reject(Error('Error from f()'));
      } else {
        console.log('f() done!');
        resolve();
      }
    }, 2000);
  });
}

function x() {
  f();
  console.log('After call to f()');
}

// function x() {
//   f().then(() => {
//     console.log('After call to f()');
//   }).catch(error => {
//     console.error(error);
//   });
// }

// async function x() {
//   try {
//     await f();
//     console.log('After call to f()');    
//   } catch (error) {
//     console.error(error);
//   }
// }

x();

// Example 2

// function f(value: string, throwError: boolean = false) {
//   return new Promise<void>((resolve, reject) => {
//     setTimeout(() => {
//       if (throwError) {
//         console.log(`f() threw an error processing value '${value}'!`);
//         reject(Error('Error from f()'));
//       } else {
//         console.log(value);
//         resolve();
//       }
//     }, 2000);
//   });
// }

// // This doesn't work

// function x(values: string[]) {
//   for (let value of values) {
//     f(value);
//   }
//   console.log('All done!');
// }

// // Using recursion

// // function x(values: string[], index: number = 0) {
// //   if (index < values.length) {
// //     f(values[index], true).then(() => {
// //       x(values, index + 1);
// //     }).catch(error => {
// //       x(values, index + 1);      
// //     });
// //   } else {
// //     console.log('All done!');
// //   }
// // }

// // Use reduce

// // function x(values: string[]) {
// //   let sequence = values.reduce((sequence, value) => {
// //     return sequence.then(() => {
// //       return f(value);
// //     }).catch(error => {
// //       // Do nothing... just handle the error.
// //     });
// //   }, Promise.resolve());
// //   sequence.then(() => console.log('All done!'));
// // }

// // Using async/await

// // async function x(values: string[]) {
// //   for (let value of values) {
// //     try {
// //       await f(value);      
// //     } catch (error) {
// //       // Do nothing... just handle the error.      
// //     }
// //   }
// //   console.log('All done!');
// // }

// x(['One','Two','Three','Four']);
```

## Modules

### Demo: Module Declaration Improvements

#### Shorthand ambient module declarations (2.0)

If you don't want to take the time to write out declarations before using a new module, you can now just use a shorthand declaration to get started quickly.

```
declare module "hot-new-module";
```

#### Wildcard character in module names (2.0)

TypeScript 2.0 supports the use of the wildcard character (*) to declare a "family" of module names.

```
declare module "myLibrary/*";
```

All imports to any module under myLibrary would be considered to have the type any by the compiler; thus, shutting down any checking on the shapes or types of these modules.

```
import {x} from 'myLibrary/coolModule';

let a = x.someAwesomeMethod();
```

## Compiler Configuration

### Demo: New Compiler Options

#### Including .js files with --allowJs (1.8)

Sometimes you have .js files in your TypeScript projects. .js files are now allowed as input to tsc. The TypeScript compiler checks the input .js files for syntax errors, and emits valid output based on the --target and --module flags. The output can be combined with other .ts files as well. Source maps are still generated for .js files just like with .ts files.

```
{
  "compilerOptions": {
    "outFile": "./dist/bundle.js",
    "allowJs": true,
    "sourceMap": true
  },
  "exclude": [
    "dist"
  ]
}
```

_Note: Type information is not allowed in .js files._

#### Glob support in tsconfig.json (2.0)

Glob-like file patterns are supported two properties "include" and "exclude".

```
{
    "compilerOptions": {
        "module": "commonjs",
        "noImplicitAny": true,
        "removeComments": true,
        "outFile": "dist/bundle.js",
        "sourceMap": true
    },
    "include": [
        "src/**/*"
    ],
    "exclude": [
        "node_modules",
        "**/*.spec.ts"
    ]
}
```

#### Including built-in type declarations with --lib (2.0)

Getting to ES6/ES2015 built-in API declarations were only limited to target: ES6. Enter --lib; with --lib you can specify a list of built-in API declaration groups that you can chose to include in your project.

For instance, if you wanted to target ES5 but knew your target platform support Promises, you could add just the Promises part of the ES2015 API.

```
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "es5",
      "es2015.promise"
    ]
  }
}
```

#### New --skipLibCheck (2.0)

TypeScript 2.0 adds a new --skipLibCheck compiler option that causes type checking of declaration files (files with extension .d.ts) to be skipped. When a program includes large declaration files, the compiler spends a lot of time type checking declarations that are already known to not contain errors, and compile times may be significantly shortened by skipping declaration file type checks.

#### New --declarationDir (2.0)

`--declarationDir` allows for generating declaration files in a different location than JavaScript files.

## React Support

### Demo: React & TypeScript

Our React project has the following files.

```
src/
  components/
    Hello.tsx -- This is a simple example of a React component
  index.tsx -- This renders our component to our DOM element
index.html -- Includes our DOM element and script includes
package.json -- We're using the new type acquisition story using NPM
tsconfig.json -- We're specifying `react` as the JSX mode
webpack.config.js -- We're using webpack to compile our TypeScript and create a bundle
```

In our component, we're defining an interface for our component properties.

```
interface HelloProps { 
  compiler: string; 
  framework: string;
  version: number;
}
```

Our class extends the `React.Component` generic base class.

```
export class Hello extends React.Component<HelloProps, {}> {
  render() {
    return <h1>
      Hello from {this.props.compiler} and {this.props.framework} v{this.props.version}!
    </h1>;
  }
}
```

TypeScript gives us intellisense inside of the JSX template! Notice that we can't specify elements that don't exist. If we needed to use custom elements, we can extend the `JSX.IntrinsicElements` interface.

```
declare global {
  namespace JSX {
    interface IntrinsicElements {
      foo: any;
    }
  }
}
```

This isn't something that you'd need to do very often, but it's nice to know that it's possible.

We can also leverage stateless function components.

```
const Greeter = ({name = 'world'}) => <div>Hello, {name}!</div>;
```

Notice how we're using parameter destructuring and defaults for easy definition of 'props' type. Then we can update our template to include our stateless function component.

```
export class Hello extends React.Component<HelloProps, {}> {
  render() {
    return <h1>
      Hello from {this.props.compiler} and {this.props.framework} v{this.props.version}!
      <Greeter name="TypeScript 1.8" />
    </h1>;
  }
}
```

We also get auto completion and type checking when consuming our component.

```

import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";

ReactDOM.render(
  <Hello compiler="TypeScript" framework="React" version={2.0} />,
  document.getElementById("example")
);
```

#### JSX support (1.6)

New .tsx file extension and as operator

TypeScript 1.6 introduces a new .tsx file extension. This extension does two things: it enables JSX inside of TypeScript files, and it makes the new as operator the default way to cast (removing any ambiguity between JSX expressions and the TypeScript prefix cast operator).

**JSX Modes**

TypeScript supports two JSX modes: `preserve` and `react`. The `preserve` mode will keep JSX as part of the output so that it can be consumed by another transformation step (i.e. Babel). The `react` mode will output `React.createElement` statements and does not need to go through another transformation step.

**`as` Operator**

Type assertions can be written as:

```
var foo = <foo>bar;
```

JSX uses angle brackets, so the `as` operator was introduced to provide an alternative syntax.

```
var foo = bar as foo;
```

**Using React**

To use JSX-support with React you should use the React typings. These typings define the JSX namespace so that TypeScript can correctly check JSX expressions for React.

#### Stateless Function Components in React (1.8)

TypeScript now supports Stateless Function components. These are lightweight components that easily compose other components:

```
// Use parameter destructuring and defaults for easy definition of 'props' type
const Greeter = ({name = 'world'}) => <div>Hello, {name}!</div>;

// Properties get validated
let example = <Greeter name="TypeScript 1.8" />;
```

#### Simplified props type management in React (1.8)

In TypeScript 1.8 with the latest version of react.d.ts (see above), we've also greatly simplified the declaration of props types.

#### Custom JSX factories using --reactNamespace (1.8)

Passing --reactNamespace <JSX factory Name> along with --jsx react allows for using a different JSX factory from the default React.

[https://github.com/Microsoft/TypeScript/issues/3788](https://github.com/Microsoft/TypeScript/issues/3788)
