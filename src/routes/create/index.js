"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require('./create.ctrl');

router.use('/create', (req, res, next) => next());
router.get('/create', ctrl.showCreate);
router.post('/create', ctrl.onCreate);

module.exports = router;