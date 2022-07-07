"use strict";

const showHome = (req, res) => {
  if (req.session.isLoggedIn) {
    res.render('index');
  } else { 
    res.redirect('/login');
  }
};

const logout = (req, res) => {
  if (req.session.isLoggedIn) {
    req.session.isLoggedIn = false;
    res.redirect('/login');
  } else {
    res.redirect('/login');
  }
}

const sendResData = (req, res) => {
  res.json({
    isLoggedIn: req.session.isLoggedIn,
  });
};

module.exports = {
  showHome,
  logout,
  sendResData,
};