"use strict";
const MySQL = require('mysql2');
const dbConfig = require('./../../db-config.json'); 
const connection = MySQL.createConnection(dbConfig);

const showLogin = (req, res) => {
  res.render('login');
};

const checkLoggedIn = (req, res, err, result) => {
  if (err) throw err;
  if (result.length > 0) {
    req.session.loggedin = true;
    req.session.username = username;
    res.redirect('/home');
  } else {
    res.send('사용자 이름 또는 비밀번호가 일치하지 않습니다.');
  }
  res.end();
};

const loginSucces = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  if (username && password) {
    const sql = `SELECT * FROM accounts WHERE username = ? AND password = ?`;
    connection.query(sql, [username, password], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        req.session.loggedin = true;
        req.session.username = username;
        res.redirect('/home');
      } else {
        res.send('사용자 이름 또는 비밀번호가 일치하지 않습니다.');
      }
      res.end();
    });
  } else {
    res.send('사용자 이름과 비밀번호를 입력하세요!');
    res.end();
  }
};

const goToHome = (req, res) => {
  if (req.session.loggedin) {
    res.send(`안녕하세요, ${req.session.username}!`);
  } else {
    res.send('로그인이 필요합니다.');
  }
  res.end();
};

module.exports = {
  showLogin,
  loginSucces,
  goToHome,
};
