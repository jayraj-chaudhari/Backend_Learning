//If we creating our own errors in code then we need custom error class to create our own errors. For example, we can create a custom error class like this:
class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
//for example, we can create a custom error like this:
const notFoundError = new CustomError("Resource not found", 404);
const badRequestError = new CustomError("Bad request", 400);
const internalServerError = new CustomError("Internal server error", 500); //inside app.js

//Here we are creating a custom error handler middleware to handle errors in our application. This middleware will catch any errors that occur during the request-response cycle and send a proper response to the client.
//We will use this middleware in our Express application to handle errors globally.

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }
  console.error(err.stack); // Log the error stack trace for debugging purposes
  return res.status(500).json({
    message: "Internal Server Error",
  });
};
//Before express 5.0 we must use async wrappers to handle errors in async functions. But in express 5.0 we can use async functions directly and express will handle the errors automatically. Hence we can use async functions directly in our routes and controllers without using async wrappers. For example, we can use async functions like this:
