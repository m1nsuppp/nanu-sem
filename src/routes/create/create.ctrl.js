"use strict";

const showCreate = (req, res) => {
  if (req.session.isSignedIn) {
    res.render('create');
  } else {
    res.redirect('/signin');
  }
};

const onCreate = (req, res) => {
  const connection = require('../../models/db/db').connection;
  const sql = `
  INSERT INTO boards 
  (email, username, title, category, price, content)
  VALUES (?, ?, ?, ?, ?, ?);
  `;
  const username = req.session.username;
  const email = req.session.email;
  let title = req.body.title;
  let category = req.body.category;
  let price = req.body.price;
  let content = req.body.content;
  let data = [username, email, title, category, price, content];

  if (data.includes('')) {
    res.json({ success: false, });
  }

  connection.query(sql, data, (err, result, fields) => {
    if (err) throw (err);
    res.json({ success: true, });
  });
}

module.exports = {
  showCreate,
  onCreate,
};