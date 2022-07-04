"use strict";

const mysql = require('mysql2');
const dbConfig = require('./db-config.json');
const connection = mysql.createConnection(dbConfig);

module.exports = {
  mysql,
  dbConfig,
  connection,
};