"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require('./home.ctrl');

router.use('/', (req, res, next) => {
  next();
});
router.get('/', ctrl.showHome);
router.get('/logout', (req, res) => {
  if (req.session.isLoggedIn) {
    req.session.isLoggedIn = false;
    res.render('login');
  } else {
    res.redirect('/login');
  }
});
router.post('/', ctrl.foo);

module.exports = router;
