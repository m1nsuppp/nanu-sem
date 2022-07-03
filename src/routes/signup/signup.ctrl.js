"use strict";

const { check, validationResult } = require('express-validator');

const showSignup = (req, res) => {
  res.render('signup');
};

const inputDataChecks = [
  check('email', 'Your email is not valid.').not().isEmpty(),
  check('username').not().isEmpty().isLength({ min: 4 }).withMessage('Username must have more than 4 characters.'),
  check('password', 'Your password must be at least 4 characters.').not().isEmpty().isLength({ min : 4}),
];

const errorProcessing = (req, res) => {
  const errors = validationResult(req).errors;
  console.log(req.body);

  let errorMsgs = errors.map(error => error.msg);

  if (errorMsgs.length) {
    errorMsgs.forEach((errorMsg) => {
      console.log(errorMsg);
    });
  }
  // 유효성 검사를 통과하지 못했다면
  // if (!errors.isEmpty()) {
  //   return res.status(422).jsonp(errors.array());
  // } else {
  //   res.send({});
  // }
};

module.exports = {
  showSignup,
  inputDataChecks,
  errorProcessing,
};
