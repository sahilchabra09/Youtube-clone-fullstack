# What is cookie-parser in simple words?
cookie-parser is a small tool (middleware) in Node.js that helps you read cookies sent by a browser to your server.

# What are cookies?
A cookie is a small piece of data that a server sends to a user's browser. The browser saves it and sends it back to the server with every request. This is useful for things like:

### Storing user sessions: 
Keeping a user logged in as they browse different pages.
Tracking preferences: Remembering a user's choices, like language settings.
### Why do we need cookie-parser?
When the browser sends cookies to your server, they come as part of the request. However, they are in a special format, and you can't directly use them in your app. That's where cookie-parser comes in. It reads (or "parses") the cookies for you and makes them easy to work with in your Node.js app.

# How to use cookie-parser in Node.js?
Here's how to set it up in an Express app:

Install cookie-parser:

In your project folder, run this command to install it:

`npm install cookie-parser`

Use cookie-parser in your app:

In your Express app, add cookie-parser as middleware:

```
const express = require('express');
const cookieParser = require('cookie-parser');  // Import cookie-parser

const app = express();

app.use(cookieParser());  // Tell your app to use cookie-parser

app.get('/', (req, res) => {
  // Read cookies sent by the browser
  console.log(req.cookies);

  res.send('Cookies are being parsed!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```
In this example:

The req.cookies object will contain all the cookies sent by the browser. You can easily access them in your route handlers.
Setting a cookie from the server:

You can also set cookies in your response:

```
app.get('/setcookie', (req, res) => {
  // Set a cookie called 'username' with a value of 'JohnDoe'
  res.cookie('username', 'JohnDoe');

  res.send('Cookie has been set!');
});
```
The browser will now save this cookie, and in future requests, it will send this cookie back to the server.
## Summary:
Cookies are small pieces of data stored by the browser.
cookie-parser is a tool in Node.js that makes it easy to read and work with cookies.
You can use it to both read cookies from requests and set cookies in responses.