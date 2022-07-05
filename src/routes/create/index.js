"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require('./create.ctrl');

router.use('/create', (req, res, next) => {
  next();
});
router.get('/create', ctrl.showCreate);

module.exports = router;