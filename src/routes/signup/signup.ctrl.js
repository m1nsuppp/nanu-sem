"use strict";

const { check, validationResult } = require('express-validator');
const connection = require('../../models/db/db').connection;

const showSignup = (req, res) => {
  res.render('signup');
  res.end();
};

const inputDataChecks = [
  check('inputEmail', 'Your email is not valid.').not().isEmpty(),
  check('inputUsername').not().isEmpty().isLength({ min: 2, max: 16 }).withMessage('Username must have more than 2 characters.'),
  check('inputPassword', 'Your password must be at least 8 characters.').not().isEmpty().isLength({ min : 8, max: 20}),
];

const errorProcessing = (req, res) => {
  const sql = `INSERT INTO accounts (email, username, password) VALUES (?);`;
  const errors = validationResult(req).errors;
  let errorMsgs = errors.map(error => error.msg);
  let usernameLength = req.body.usernameLength;
  let pwlen = req.body.pwlen;
  let isSamePw = req.body.isSamePw;

  let resData = {
    usernameLength: usernameLength,
    pwlen: pwlen,
    isSamePw: isSamePw,
  };

  res.json(resData);

  if (!errorMsgs.length) {
    let inputEmail = req.body.inputEmail;
    let inputUsername = req.body.inputUsername;
    let inputPassword = req.body.inputPassword;
    let confirmPassword = req.body.confirmPassword;
    let accounts = [];

    if (inputPassword === confirmPassword) {
      accounts = [inputEmail, inputUsername, inputPassword];
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
