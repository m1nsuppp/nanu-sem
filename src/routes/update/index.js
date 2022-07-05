"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require('./update.ctrl');

router.use('/update', (req, res, next) => {
  next();
});

module.exports = router;