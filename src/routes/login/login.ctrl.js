"use strict";

const connection = require('../../models/db/db').connection;

const showLogin = (req, res) => {
  if (req.session.isLoggedIn) {
    res.send('이미 로그인 되어있습니다.');
  } else {
    res.render('login');
  }
};

const loginSucces = (req, res) => {
  let inputEmail = req.body.inputEmail; // HTML form에서 name이 inputEmail으로 정해진 element의 값.
  let inputPassword = req.body.inputPassword;

  if (inputEmail && inputPassword) {
    const sql = `SELECT * FROM accounts WHERE email = ? AND password = ?`;
    connection.query(sql, [inputEmail, inputPassword], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        req.session.isLoggedIn = true;
        req.session.email = inputEmail;
        res.redirect('/');
      }
    });
  }
};


module.exports = {
  showLogin,
  loginSucces,
};