"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require('./signin.ctrl');

router.use('/signin', (req, res, next) => next());
router.get('/signin', ctrl.showSignInPage);
router.post('/signin', ctrl.onSignIn);

module.exports = router;