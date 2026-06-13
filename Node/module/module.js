// console.log(__dirname);
// console.log(__filename);
console.log(module.exports);
// console.log(require);
// console.log(exports);
// console.log(process);

//Node uses CommonJS module system, which is different from the ES6 module system used in browsers.
//  In CommonJS, each file is treated as a separate module, and you can export values using `module.exports` or `exports`.
//  You can also import other modules using `require()`.
//every file in Node is treated as a module, and the variables defined in one module are not accessible in another module unless they are explicitly exported and imported. 
// This allows for better encapsulation and modularity in Node applications.
//export is a js object which we can see in module property(module.exports)

//EXPORTING
const name = "John";
const age = 30;

module.exports = {
  name,
  age,
  sayHello: () => console.log("Hello from the module!"),
};
//OR
module.exports.type = "person";
//IMPORTING

//const {namee , agee , fn} = require("./module"); wwhile destructuring with require names must be same.
const { name: namee, age: agee, sayHello: fn } = require("./module");
const type = require("./module").type;
console.log(namee, agee);
fn();
console.log(type);
console.log(module.exports);

//in single file - circular dependency

const autosay = ()=> console.log("Auto saying hello!");

autosay();
