"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require('./signup.ctrl');

router.use('/signup', (req, res, next) => next());
router.get('/signup', ctrl.showSignup);
router.post('/signup', ctrl.inputDataChecks, ctrl.errorProcessing, ctrl.creatUser);

// 이메일, 닉네임 중복 체크
router.post('/signup/email', ctrl.isEmailInUse);
router.post('/signup/username', ctrl.isUsernameInUse);

module.exports = router;
