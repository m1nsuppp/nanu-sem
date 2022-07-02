"use strict";

const MySQL = require('mysql2');
const express = require('express');
const session = require('express-session');
const { check, validationResult } = require('express-validator');
const path = require('path');
const dbConfig = require('./'); 
const app = express();
const port = 3000;
const hostname = 'localhost';
const connection = MySQL.createConnection(dbConfig);

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + './public')));

// http:localhost:3000/
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + './public/login.html'));
});

app.post('/', (req, res) => {
  console.log(req.body);
});

// http://localhost:3000/auth
app.post('/auth', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  if (username && password) {
    const sql = `SELECT * FROM accounts WHERE username = ? AND password = ?`;

    connection.query(sql, [username, password], (err, result) => {
      if (err) throw err;
      // if the account exists.
      if (result.length > 0) {
        req.session.loggedin = true;
        req.session.username = username;
        // redirect to home page.
        res.redirect('/home');
      } else {
        res.send('Incorrect Username and(or) Password!');
      }
      res.end();
    });

    connection.end();
  } else {
    res.send('Please enter Username and Password!');
    res.end();
  }
});

// http://localhost:3000/home
app.get('/home', (req, res) => {
  if (req.session.loggedin) {
    res.send(`Welcome back, ${req.session.username}!`);
  } else {
    // Not logged in.
    res.send('Please login to view this page.');
  }
  res.end();
});

// http://localhost:3000/signup
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname + '../../../public/signup.html'));
});

// check validation.
app.post('/signup', [
  check('email', 'Your email is not valid.').not().isEmpty(),
  check('username').not().isEmpty().isLength({ min: 4 }).withMessage('Username must have more than 4 characters.'),
  check('password', 'Your password must be at least 4 characters.').not().isEmpty().isLength({ min : 4}),
  ],
  (req, res) => {
    const errors = validationResult(req).errors;
    console.log(req.body);

    let errorMsgs = errors.map(error => error.msg);

    if (errorMsgs.length) {
      // errorMsgs.forEach((errorMsg) => {
      //   res.send(errorMsg);
      // });
    }
    // 유효성 검사를 통과하지 못했다면
    // if (!errors.isEmpty()) {
    //   return res.status(422).jsonp(errors.array());
    // } else {
    //   res.send({});
    // }
});

app.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port}/`);
});
