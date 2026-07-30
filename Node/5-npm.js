// npm - Node Package Manager
// npm is a package manager for Node.js that allows you to easily install, manage, and
// share packages (libraries or modules) of code.
// npm is included with Node.js, so you don't need to install it separately.
// npm allows you to install packages from the npm registry,
//  which is a large collection of open-source packages that can be used in your Node.js applications.

// NPM COMMANDS
// npm install <package-name> - installs a package
// npm install <package-name> --save - installs a package and adds it to your package.json file
// npm install - installs all dependencies listed in your package.json file
// npm uninstall <package-name> - removes a package
// npm update - updates all packages to their latest versions
// npm list - shows all installed packages
// npm init - creates a new package.json file
// npm start - runs the start script defined in your package.json file
// npm test - runs the test script defined in your package.json file

// local packages - can only be used in the project that they are installed in
// npm i <package-name> - installs a package locally in the current project

// global packages - can be used in any project on your system
// npm i -g <package-name> - installs a package globally on your system (npm<=>sudo npm in mac/linux)

// package.json - a file that contains metadata about your project and its dependencies
// create in root directory of your project using npm init or npm init -y
// (-y flag skips the questions and creates a default package.json file)

const _ = require("lodash"); //lodash is a popular utility library that provides many useful functions for working with arrays, objects, and other data types.
const items = [1, [2, [3, [4]]]];
const newItems = _.flattenDeep(items);
console.log(newItems); // [1, 2, 3, 4]

//we dont push node_modules folder to github because it is a large folder and can be easily recreated by running npm install.
// Instead, we push package.json and package-lock.json files to github, which contain the information about the dependencies of the project.
// When someone else clones the project, they can run npm install to install all the dependencies listed in package.json and package-lock.json files.

//npm install <package-name> -D or --save-dev - installs a package as a development dependency,
// which means it is only needed during development and not in production.

//in package.json file, we can define scripts that can be run using npm run <script-name> command.
// For example, we can define a script called "start" that runs the command "node 5-npm.js".

//npx - npx is a package runner that comes with npm 5.2+ and higher.
// It allows you to run packages without having to install them globally on your system.
// For example, we can run the command "npx create-react-app my-app" to create a new React app
// without having to install create-react-app globally on our system.
//Better because it ensures that you are always using the latest version of the package,
// and it avoids potential conflicts with other packages that may be installed globally on your system.
