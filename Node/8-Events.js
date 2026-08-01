//In server side programming, events are actions or occurrences that happen in the system you are programming,
//  which the system tells you about so your code can respond to them as needed.
//  Node.js has a built-in module, called "events", where you can create-fire-, and listen for- your own events.
//Heavily used in Node.js, the EventEmitter class is key to working with events. It allows you to create and handle custom events in your applications.

const EventEmitter = require("events");

// Create an instance of the EventEmitter class
const myEmitter = new EventEmitter();

myEmitter.on("response", (name) => {
  console.log(`Data received successfully for ${name}`);
});
myEmitter.on("response", (name) => {
  console.log(`Processing data for ${name}`);
});
myEmitter.emit("response", "Jayraj"); //we can also pass data to the event listener by providing additional arguments to the emit() method. In this case, we are passing the name "Jayraj" as an argument to the event listener.

//we first listen then emit the event , hence order matters in event handling. The order of event listeners matters because when an event is emitted, the listeners are called in the order they were registered. If you emit an event before registering a listener for it, that listener will not be called for that emission.

//server also extends the EventEmitter class, which means that all objects created by the HTTP server inherit the event-handling capabilities of the EventEmitter class. This allows you to listen for and respond to various events that occur during the lifecycle of an HTTP request and response.

//Making our own event emitter class by extending the EventEmitter class
class MyEmitter extends EventEmitter {
  constructor() {
    super();
  }
}
// Create an instance of the MyEmitter class
const myEmitterInstance = new MyEmitter();
// Register an event listener for the "customEvent" event
myEmitterInstance.on("customEvent", (message) => {
  console.log(`Custom event triggered: ${message}`);
});
// Emit the custom event
myEmitterInstance.emit("customEvent", "Hello, world!");
