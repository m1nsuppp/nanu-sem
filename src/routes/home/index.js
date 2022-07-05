"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require('./home.ctrl');

router.use('/', (req, res, next) => {
  next();
});
router.get('/', ctrl.showHome);
router.post('/', ctrl.foo);

module.exports = router;
