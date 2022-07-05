"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require('./login.ctrl');

router.use('/', (req, res, next) => {
  next();
});
router.get('/login', ctrl.showLogin);
router.post('/login', ctrl.loginSucces);

module.exports = router;