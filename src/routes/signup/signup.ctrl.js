"use strict";

const { check, validationResult } = require('express-validator');
const connection = require('../../models/db/db').connection;

const showSignup = (req, res) => {
  res.render('signup');
  res.end();
};

const inputDataChecks = [
  check('inputEmail', 'Your email is not valid.').not().isEmpty(),
  // check('username').not().isEmpty().isLength({ min: 2 }).withMessage('Username must have more than 4 characters.'),
  check('inputPassword', 'Your password must be at least 8 characters.').not().isEmpty().isLength({ min : 8, max: 20}),
];

const errorProcessing = (req, res) => {
  const sql = `INSERT INTO accounts (email, password, username) VALUES (?);`;
  const errors = validationResult(req).errors;
  let errorMsgs = errors.map(error => error.msg);

  if (!errorMsgs.length) {
    let username = 'Rude Gulit';
    let inputEmail = req.body.inputEmail;
    let inputPassword = req.body.inputPassword;
    let confirmPassword = req.body.confirmPassword;
    let accounts = [inputEmail, inputPassword, username];

    if (inputPassword === confirmPassword) {
      connection.query(sql, [accounts], (err, result) => {
        if (err) throw err;
      });
    }
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
