"use strict";

const connection = require('../src/models/db/db').connection;
const sql = {
  hasEmail: (email) => `SELECT * FROM accounts WHERE email = '${email}';`,
  hasUsername: (username) => `SELECT * FROM accounts WHERE username = '${username}';`,
  confirmSignup: () => `INSERT INTO accounts (email, username, password) VALUES (?);`,
};

let email = '20171041@gwnu.ac.kr';
connection.query(sql.hasEmail(email), (err, result, fields) => {
  if (err) throw err;
  if (result.length) {
    console.log(result);
  }
});

connection.end();