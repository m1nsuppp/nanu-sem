"use strict";

const showHomePage = (req, res) => {
  res.render('index');
};

const isSignedIn = (req, res) => {
  res.json({
    isSignedIn: req.session.isSignedIn,
    email: req.session.email,
    username: req.session.username,
  });
};

const onSignOut = (req, res) => {
  req.session.destroy(() => req.session);
  res.redirect('/');
};

module.exports = {
  showHomePage,
  isSignedIn,
  onSignOut,
};