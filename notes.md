
# Notes



## TODO

Start fleshing out demos

Research generator functions
  Put together simple demo that shows how generator functions work




## Questions

Is it impossible to enable strict null checking when you're using third party libraries???
  Or at least until the type definition files are updated???






## Anders Hejlsberg on TypeScript 2

[https://channel9.msdn.com/Blogs/Seth-Juarez/Anders-Hejlsberg-on-TypeScript-2](https://channel9.msdn.com/Blogs/Seth-Juarez/Anders-Hejlsberg-on-TypeScript-2)

TypeScript 2.0 Features

`async`/`await` downlevel support
  This feature has since been cut from the 2.0 feature set
Improved support for aquiring type definition files
Support for non-nullable types
Support for control-flow analysis

`async`/`await`
  Complicate to rewrite when you don't have support generator functions
  Asynchronous code gets rewritten into state machines

Type Definition Aquisition
  Type definitions will be made available via npm packages

Non Nullable Types
  Forces you to be deliberate about where you allow nulls
  Opt-in via compiler option
  Ability to express that a variable cannot be null or undefined
  Currently null or undefined is a valid value for anything
  Null and undefined are being removed from all types
  Two new types... `null` and `undefined`
  To create a nullable type, you union `null` to the type
  Then you have to use a type guard to ensure that a variable is not `null` before performing an operation
  Types that aren't nullable initially have a state of `unassigned`

Control-Flow Based Type Analysis
  Necessary to keep non-nullable types from being a pain in the ass
  The compiler now understands how your control flow affects a variable's type
  The compiler will enforce that a non-nullable variable is assigned before it's used

## Announcing TypeScript 2.0 Beta - Daniel Rosenwasser

To install the beta run:

```
npm install -g typescript@beta
```

### Non-nullable Types

Previously, `null` and `undefined` were in the domain of EVERY type
The compiler now supports strict null checking `--strictNullChecks`

```
let foo: string = null; // Error!
```

`null` and `undefined` are two new types that can be unioned to other types.

```
let foo: string | null = null; // Okay!
```

There is an escape hatch available via the postfix operator `!`

```
declare let strs: string[] | undefined;

// Error! 'strs' is possibly undefined.
let upperCased = strs.map(s => s.toUpperCase());

// 'strs!' means we're sure it can't be 'undefined', so we can call 'map' on it.
let lowerCased = strs!.map(s => s.toLowerCase());
```

### Control Flow Analysis for Types

The compiler now does a better job of understanding how your app's control flow affects types
This was necessary in order to make non-nullable types work without being a pain in the ass

```
/**
 * @param recipients  An array of recipients, or a comma-separated list of recipients.
 * @param body        Primary content of the message.
 */
function sendMessage(recipients: string | string[], body: string) {
    if (typeof recipients === "string") {
        recipients = recipients.split(",");
    }

    // TypeScript knows that 'recipients' is a 'string[]' here.
    recipients = recipients.filter(isValidAddress);
    for (let r of recipients) {
        // ...
    }
}
```

or 

```
let bestItem: Item;
for (let item of items) {
    if (item.id === 42) bestItem = item;
}

// Error! 'bestItem' might not have been initialized if 'items' was empty.
let itemName = bestItem.name;
```

### Easier Module Declarations

If you want to tell the compiler that a module exists and you don't care about the shape of it, you used to have to do this.

```
declare module "foo" {
    var x: any;
    export = x;
}
```

You can now do this.

```
declare module "foo";
declare module "bar";
```

Wildcards are now also supported.

```
declare module "foo/*";
```

You can then import anything starting with the path `foo/`











