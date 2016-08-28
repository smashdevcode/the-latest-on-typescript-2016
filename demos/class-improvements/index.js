// Optional properties and methods
// class MyClass {
//   a: number;
//   b?: number;
// }
// function f(a: MyClass) {
// }
// f({ a: 0 });
// Private and protected constructors
var Singleton = (function () {
    function Singleton() {
    }
    Singleton.getInstance = function () {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    };
    return Singleton;
}());
// let e = new Singleton(); // Error: constructor of 'Singleton' is private.
var v = Singleton.getInstance();
