"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require('./login.ctrl');

router.get('/', ctrl.showLogin);
router.post('/auth', ctrl.loginSucces);
router.get('/home', ctrl.goToHome);

module.exports = router;