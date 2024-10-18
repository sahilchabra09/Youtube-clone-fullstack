# Await in Javascript
The `await` keyword in JavaScript is used to **pause** the execution of an **asynchronous** function until a **promise** is **resolved** or **rejected**. It is used inside an `async` function to wait for a **promise** to either return a value (when resolved) or throw an error (when rejected).

### Key Concepts:

1. **`await` is used with promises**:
   - A promise represents the result of an asynchronous operation, which can be **pending**, **fulfilled (resolved)**, or **rejected**.
   - The `await` keyword pauses the execution of the async function until the promise is settled (either resolved with a value or rejected with an error).

2. **`await` can only be used inside an `async` function**:
   - You can't use `await` outside of an `async` function. An `async` function is declared with the `async` keyword before the function name.

---

### Syntax of `await`:

```javascript
const result = await promise;
```

- **`promise`**: This is the asynchronous operation that returns a promise.
- **`result`**: The value returned by the resolved promise (or it throws an error if the promise is rejected).

---

### Example 1: Basic Example of `await`

Let’s say we have a function `fetchData()` that returns a promise that resolves after 2 seconds.

```javascript
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Data received');
    }, 2000);
  });
}

// Using async and await
async function getData() {
  console.log('Fetching data...');
  
  // Await pauses execution until the promise is resolved
  const result = await fetchData();
  
  console.log(result);  // Logs: 'Data received' after 2 seconds
}

getData();
```

#### How it works:
1. **`fetchData()`** returns a promise that resolves after 2 seconds.
2. **`await fetchData()`**: The execution of the `getData()` function is paused until `fetchData()` is resolved.
3. After 2 seconds, the promise resolves, and the result `'Data received'` is stored in the `result` variable.
4. Finally, `'Data received'` is logged to the console.

---

### Example 2: Using `await` for Error Handling

If the promise is **rejected** (throws an error), you can catch it using `try-catch`:

```javascript
function fetchDataWithError() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Error fetching data'));
    }, 2000);
  });
}

async function getDataWithError() {
  try {
    const result = await fetchDataWithError();
    console.log(result);  // This won't run if an error is thrown
  } catch (error) {
    console.error('Caught an error:', error.message);  // Logs: 'Caught an error: Error fetching data'
  }
}

getDataWithError();
```

#### How it works:
- The **`try-catch`** block is used to catch any errors that occur when awaiting the promise.
- If `fetchDataWithError()` rejects the promise with an error, the execution jumps to the `catch` block and logs the error message.

---

### When to Use `await`:

1. **Fetching data from APIs**:
   - When making HTTP requests to a server (using `fetch` or `axios`), `await` can be used to wait for the server’s response.
   
2. **Working with databases**:
   - In server-side applications (like with **MongoDB**, **PostgreSQL**, etc.), you might use `await` to pause the function until a query to the database completes.

3. **Any asynchronous operation**:
   - Any time you need to wait for a process to complete (like reading/writing files, interacting with external APIs, or querying a database), you can use `await` to handle the result when it's ready.

---

### Example 3: Fetching Data from an API with `await`

```javascript
const fetch = require('node-fetch');

async function getApiData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();  // Wait for the response to be parsed as JSON
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

getApiData();
```

#### Explanation:
- The `fetch()` function is an asynchronous operation that returns a promise. 
- **`await fetch(url)`**: Waits for the `fetch` operation to complete.
- **`await response.json()`**: Once the response is received, it waits for the data to be parsed into JSON format.
- If there’s an error (like a network issue), the `catch` block will handle it.

---

### How `await` is Different from `.then()`:

Before `async/await`, we used `.then()` to handle promises. Here’s the same API request example using `.then()` instead of `await`:

```javascript
fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error));
```

- `.then()` is used to handle the resolved value of the promise, and `.catch()` is used to handle errors.
- `async/await` makes the code more **readable** and **synchronous-looking**, reducing the need for chaining `.then()` callbacks, often referred to as **callback hell**.

---

### Summary of Key Points:
- **`await`** is used inside `async` functions to pause execution until a promise is settled (resolved or rejected).
- **`await`** simplifies working with asynchronous code and makes it more readable than using `.then()` and `.catch()`.
- You can handle errors with `await` by using a `try-catch` block.
- You can only use `await` inside functions that are marked as **`async`**.

### Final Example:

```javascript
async function processTask() {
  console.log('Starting task...');

  // Wait for an async task to complete
  const result = await new Promise((resolve) => setTimeout(() => resolve('Task done!'), 2000));
  
  console.log(result);  // After 2 seconds, logs: 'Task done!'
}

processTask();
```

This example demonstrates how `await` pauses the function execution for 2 seconds before logging the result.

