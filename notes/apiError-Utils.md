# ApiError
```
class ApiError extends Error {
    constructor(
        statusCode,
        message= "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export {ApiError}
```

This code defines a custom error class called ApiError that extends JavaScript's built-in Error class. It's designed to handle API-specific errors in a more structured way, with additional properties like statusCode, errors, and success. Let’s break it down step by step and also provide a real-world analogy.

## 1. Class Declaration:
```
class ApiError extends Error {}
```
This is how you define a class in JavaScript. The ApiError class extends the built-in Error class, meaning it inherits all the behavior of JavaScript's Error class but allows for customization.

Think of Error as the "default" error in JavaScript. By extending it, you're creating a specialized type of error with more specific information.

# 2. Constructor Method:
```
constructor(
  statusCode,
  message = "Something went wrong",
  errors = [],
  stack = ""
) {}
```
The constructor method is used to initialize new objects created from the ApiError class.

**It takes four parameters:**
1. **statusCode:** A number representing the HTTP status code (e.g., 404, 500) related to the error.

2. **message:** A string that describes the error (defaults to "Something went wrong" if not provided).

3. **errors:** An array of specific error details (e.g., validation errors), defaulting to an empty array.
4. **stack:** The stack trace, which is the chain of function calls that led to the error (useful for debugging).

# 3. Calling the Parent Class (super):
javascript
Copy code
super(message);
This calls the constructor of the parent class (Error) and passes the message parameter to it.
The super() function initializes the properties from the parent Error class, including setting the message property on the ApiError instance.
4. Defining Custom Properties:
javascript
Copy code
this.statusCode = statusCode;
this.data = null;
this.message = message;
this.success = false;
this.errors = errors;
this.statusCode: Stores the HTTP status code (e.g., 404 for "Not Found", 500 for "Internal Server Error"). This is useful in APIs to provide clients with meaningful HTTP status responses.
this.data = null: Sets a default value for any data that could be associated with the error (though this example doesn't use it).
this.message: Stores the error message (already handled by the parent class but being reset here for clarity).
this.success = false: Sets a success flag to false. This is useful in APIs where a typical response includes a success/failure indicator.
this.errors = errors: Stores any specific error details (e.g., validation errors, detailed causes of the failure). It’s an array by default.
5. Stack Trace Handling:
javascript
Copy code
if (stack) {
    this.stack = stack;
} else {
    Error.captureStackTrace(this, this.constructor);
}
stack: This refers to the stack trace, which helps developers understand where the error occurred in the code. If a stack is provided, it’s used; otherwise, the method Error.captureStackTrace() is called.

Error.captureStackTrace(): This is a built-in Node.js method that captures the current stack trace and associates it with the error. This helps developers debug by showing where the error originated.

Real-World Analogy:
Imagine you run a shipping company, and every once in a while, something goes wrong with a package delivery (like a wrong address, or the package getting lost). Normally, if something goes wrong, you just say, "Oops, something went wrong!" (this is like a regular Error).

However, you realize it’s more helpful to provide specific information about what went wrong, so you create a detailed error report:

Error Code (statusCode): You assign a specific error code to every issue (e.g., 404 for "address not found", 500 for "internal system failure").
Error Message (message): A brief description of what went wrong (e.g., "Address not found" or "Package lost").
Additional Details (errors): You might also want to include more specific information (e.g., "Street number is missing", "Recipient unreachable").
Is this a success? (success): This will always be false because errors are failures, not successes.
You also keep track of how the error happened (like tracking the package’s history and finding out at what point it was lost). This is the stack trace, which helps figure out the exact cause of the issue.

In this analogy, the ApiError is your detailed error report—more informative than just saying "something went wrong."

Example of how ApiError might be used in an API:
Here’s an example of how you could use ApiError in an API route handler:

javascript
Copy code
import { ApiError } from './ApiError';  // Assuming ApiError is in a separate file

app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);  // Fetch user from the database
    if (!user) {
      // If the user isn't found, throw an ApiError
      throw new ApiError(404, "User not found", ["User with this ID does not exist"]);
    }
    res.json(user);
  } catch (err) {
    next(err);  // Pass the error to the error-handling middleware
  }
});
throw new ApiError(404, "User not found"): If the user isn’t found, this creates a new ApiError with a 404 status code and the message "User not found."
next(err): Passes the error to Express’s built-in error-handling middleware, which can respond with an appropriate status code and message.
Summary of the ApiError Class:
Custom Error Handling: ApiError allows you to define custom error messages, HTTP status codes, and additional error details.
Inherits from Error: It extends the built-in Error class, so it behaves like any regular error but with more context.
Useful in APIs: Designed for use in APIs where you need to send back detailed error information (e.g., HTTP status codes, messages, and extra details) to clients.
Stack Trace for Debugging: Automatically captures the stack trace, which is helpful for debugging by showing where the error occurred in the code.
Real-World Analogy Recap:
The ApiError is like a detailed error report in a shipping company. Instead of just saying "something went wrong," it provides:

Error code (like "address not found" or "package lost").
Message (a simple description of the error).
Details (extra information about what caused the issue).
Success flag (false, since it's an error).
Tracking information (stack trace) to help figure out where and why things went wrong.
This makes it easier to understand and fix the problem, just like a detailed error makes it easier for developers to identify issues in an API.