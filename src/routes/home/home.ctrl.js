"use strict";

const showHome = (req, res) => {
  if (req.session.isLoggedIn) {
    res.render('index');
  } else { 
    res.redirect('/login');
  }
};

const foo = (req, res) => {
  res.json({
    isLoggedIn: req.session.isLoggedIn,
  });
};


module.exports = {
  showHome,
  foo,
};