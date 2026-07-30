// Event Loop in Node.js
// The event loop is a fundamental concept in Node.js that allows it to handle asynchronous operations efficiently.
// It's a single-threaded loop that continuously checks for tasks to execute, such as I/O operations, timers, and callbacks.
// The event loop enables Node.js to perform non-blocking I/O operations, making it highly efficient for handling multiple concurrent requests.
//js is single threaded, but it can handle multiple concurrent requests because of the event loop and non-blocking I/O operations.
//offloading operations to the system kernel whenever possible, which allows Node.js to handle multiple requests without blocking the main thread.

//server.listen() and request.on() are asynchronous operations that are handled by the event loop.
