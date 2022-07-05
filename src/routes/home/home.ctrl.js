"use strict";

const showHome = (req, res) => {
  if (req.session.isLoggedIn) {
    res.render('index');
  } else { 
    res.redirect('/login');
  }
};

const foo = (req, res) => {
  console.log(req.body);
};


module.exports = {
  showHome,
  foo,
};