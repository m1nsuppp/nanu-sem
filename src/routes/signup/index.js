"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require('./signup.ctrl');

router.use('/signup', (req, res, next) => {
  next();
});
router.get('/signup', ctrl.showSignup);
router.post('/signup',
  ctrl.inputDataChecks,
  ctrl.errorProcessing
);

module.exports = router;
