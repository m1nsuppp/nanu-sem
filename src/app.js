"use strict";

const express = require('express');
const session = require('express-session');
const memoryStore = require('memorystore')(session);
const maxAge = 5 * 60 * 1000;
const path = require('path');
const app = express();
const homeRouter = require('./routes/home');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const createRouter = require('./routes/create');

// app setting
let views = path.join(__dirname, 'views');
app.set('views', views);
app.set('view engine', 'ejs');

app.use(session({
  secret: 'qwer1234',
  resave: false,
  saveUninitialized: true,
  store: new memoryStore({ checkPeriod: maxAge}),
  cookie: {
    maxAge,
  },
}));
app.use(express.json()); // 들어오는 http request body가 json일 때도 parsing 가능하게 한다.
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + '/public'))); // express static file directory.
app.use('/', homeRouter, loginRouter, signupRouter, createRouter);

module.exports = app;