"use strict";

const express = require('express');
const session = require('express-session');
// const { check, validationResult } = require('express-validator');
const path = require('path');
const app = express();
const port = 3000;
const hostname = 'localhost';
const loginCtrl = require('./routes/login/login.ctrl');
const signupCtrl = require('./routes/signup/signup.ctrl');

// app setting
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
app.use(express.json()); // 들어오는 http request body가 json일 때도 parsing 가능하게 한다.
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + '/public'))); // express static file directory.

// http:localhost:3000/
app.get('/', loginCtrl.showLogin);
app.post('/', (req, res) => {
  console.log(req.body);
});

// http://localhost:3000/auth
app.post('/auth', loginCtrl.loginSucces);

// http://localhost:3000/home
app.get('/home', loginCtrl.goToHome);

// http://localhost:3000/signup
app.get('/signup', signupCtrl.showSignup);

// check validation.
app.post('/signup', 
        signupCtrl.inputDataChecks, 
        signupCtrl.errorProcessing
        );

app.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port}/`);
});
