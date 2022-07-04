"use strict";

const { check, validationResult } = require('express-validator');
const connection = require('../../models/db/db').connection;

const showSignup = (req, res) => {
  res.render('signup');
  res.end();
};

const inputDataChecks = [
  check('email', 'Your email is not valid.').not().isEmpty(),
  check('username').not().isEmpty().isLength({ min: 4 }).withMessage('Username must have more than 4 characters.'),
  check('password', 'Your password must be at least 4 characters.').not().isEmpty().isLength({ min : 4}),
];

const errorProcessing = (req, res) => {
  const sql = `INSERT INTO accounts (username, password, email) values (?);`;
  const errors = validationResult(req).errors;
  let errorMsgs = errors.map(error => error.msg);

  if (!errorMsgs.length) {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let accounts = [username, password, email];
    
    connection.query(sql, [accounts], (err, result) => {
      if (err) throw err;
      res.send(`Welcome, ${username}!`);
    });
  } else {
    errorMsgs.forEach((errorMsg) => {
      console.log(errorMsg);
    });
  }
};

module.exports = {
  showSignup,
  inputDataChecks,
  errorProcessing,
};
