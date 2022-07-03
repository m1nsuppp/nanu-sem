"use strict";

const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');

// app setting
let views = path.join(__dirname, 'views');
app.set('views', views);
app.set('view engine', 'ejs');

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
app.use(express.json()); // 들어오는 http request body가 json일 때도 parsing 가능하게 한다.
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + '/public'))); // express static file directory.
app.use('/', loginRouter, signupRouter);
// app.use('/', signupRouter);
// localhost:3000/signup/signup
// app.use('/signup', signupRouter);

// http:localhost:3000/
app.post('/', (req, res) => {
  console.log(req.body);
});


module.exports = app;