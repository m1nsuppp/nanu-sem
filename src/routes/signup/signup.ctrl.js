"use strict";

const { check, validationResult } = require('express-validator');

const showSignup = (req, res) => {
  res.render('signup');
  res.end();
};

const inputDataChecks = [
  check('inputEmail', 'Your email is not valid.').not().isEmpty(),
  check('inputUsername').not().isEmpty().isLength({ min: 2, max: 16 }).withMessage('Username must have more than 2 characters.'),
  check('inputPassword', 'Your password must be at least 8 characters.').not().isEmpty().isLength({ min : 8, max: 20}),
];

const isEmailInUse = (email) => {
  const connection = require('../../models/db/db').connection;
  const sql = `SELECT * FROM accounts WHERE email = '${email}';`;
  
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, result, fields) => {
      let hasEmail;
      if (error) reject(new Error('error'));

      hasEmail = result.length ? 1 : 0;

      return resolve(hasEmail);
    })
  });
}

const isUsernameInUse = (username) => {
  const connection = require('../../models/db/db').connection;
  const sql = `SELECT * FROM accounts WHERE username = '${username}';`;
  
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, result, fields) => {
      let hasUsername;
      if (error) reject(new Error('error'));
      
      hasUsername = result.length ? 1 : 0;

      return resolve(hasUsername);
    })
  });
}

const errorProcessing = async (req, res, next) => {
  const errors = validationResult(req).errors;
  let errorMsgs = errors.map(error => error.msg);
  let inputEmail = req.body.inputEmail;
  let inputUsername = req.body.inputUsername;
  let resData = {
    hasEmail: false,
    hasUsername: false,
  };

  // email 있는지 확인.
  resData.hasEmail = await isEmailInUse(inputEmail);
  resData.hasUsername = await isUsernameInUse(inputUsername);
  res.json(resData);
};

module.exports = {
  showSignup,
  inputDataChecks,
  errorProcessing,
};
