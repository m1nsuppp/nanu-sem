"use strict";

const { check, validationResult } = require('express-validator');

const showSignup = (req, res) => {
  res.render('signup');
};

function isValidEmail(email) {
	const reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

	return reg.test(email);
}

const isEmailInUse = (req, res) => {
  const connection = require('../../models/db/db').connection;
  const inputData = req.body.inputData;
  const invalidEmail = 2;
  const sql = `SELECT * FROM accounts WHERE email = '${inputData}';`;
  const responseData = { hasData: false, };

  connection.query(sql, (err, result, fields) => {
    if (err) throw err;
    
    responseData.hasData = isValidEmail(inputData) ? result.length : invalidEmail;
    res.json(responseData);
  });
}

const isUsernameInUse = (req, res) => {
  const connection = require('../../models/db/db').connection;
  const inputData = req.body.inputData;
  const isValidLength = (2 <= inputData.length) && (inputData.length <= 16);
  const invalidLength = 2;
  const sql = `SELECT * FROM accounts WHERE username = '${inputData}';`;
  const responseData = { hasData: false, };

  connection.query(sql, (err, result, fields) => {
    if (err) throw err;
    
    responseData.hasData = isValidLength ? result.length : invalidLength;
    res.json(responseData);
  });
}

const inputDataChecks = [
  check('email', 'Your email is not valid.').notEmpty().isEmail(),
  check('username').notEmpty().isLength({ min: 2, max: 16 }).withMessage('2~16자가 아님.'),
  check('password').notEmpty().isLength({ min: 8, max: 20 }).withMessage('8~20자가 아님.')
];

const errorProcessing = (req, res, next) => {
  const errors = validationResult(req).errors;
  let errorMsgs = errors.map(error => error.msg);
  
  errorMsgs.length ? res.json({ isConfirmSignUp: false }) : next();
};

const creatUser = (req, res) => {
  const connection = require('../../models/db/db').connection;
  const sql = `INSERT INTO accounts (email, username, password) VALUES (?, ?, ?);`;
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;

  connection.query(sql, [email, username, password], (err, result, field) => {
    if (err) throw err;
    res.json({ 
      isConfirmSignUp: true,
      email: email,
      username: username,
    });
  });
}

module.exports = {
  showSignup,
  inputDataChecks,
  errorProcessing,
  isEmailInUse,
  isUsernameInUse,
  creatUser,
};
