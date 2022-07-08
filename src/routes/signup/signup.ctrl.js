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
  const sql = {
    hasEmail: (email) => `SELECT * FROM accounts WHERE email = '${email}';`,
    hasUsername: (username) => `SELECT * FROM accounts WHERE username = '${username}';`,
    confirmSignup: () => `INSERT INTO accounts (email, username, password) VALUES (?);`,
  };
  const errors = validationResult(req).errors;
  let errorMsgs = errors.map(error => error.msg);
  let inputEmail = req.body.inputEmail;
  let inputUsername = req.body.inputUsername;
  let resData = {
    hasEmail: false,
    hasUsername: false,
  };

  // email 있는지 확인.
  connection.query(sql.hasEmail(inputEmail), (err, result, fields) => {
    if (err) throw err;
    if (result.length) {
      resData.hasEmail = true;
    }
    res.json(resData);
  });
};

module.exports = {
  showSignup,
  inputDataChecks,
  errorProcessing,
};
