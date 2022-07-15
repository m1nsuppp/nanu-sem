"use strict";

const showSignInPage = (req, res) => {
  res.render('signin');
};

const onSignIn = (req, res) => {
  const connection = require('./../../models/db/db').connection;
  const sql = `SELECT * FROM accounts WHERE email = ? AND password = ?;`;
  const emailAndPassword = [req.body.inputEmail, req.body.inputPassword];
  let responseData = {
    hasAccount: false,
  };

  connection.query(sql, emailAndPassword, (err, result, fields) => {
    if (err) throw err;
    responseData.hasAccount = Boolean(result.length);
    req.session.isSignedIn = Boolean(result.length);
    res.json(responseData);
  });
};

module.exports = {
  showSignInPage,
  onSignIn,
};