"use strict";

const inputEmail = document.getElementById('inputEmail');
const inputUsername = document.getElementById('inputUsername');
const inputPassword = document.getElementById('inputPassword');
const confirmPassword = document.getElementById('confirmPassword');
const correct = '#03c75a';
const incorrect = '#ff003e';
const colors = [correct, incorrect];
const msgs = [
  '사용 가능한',
  '이미 등록된'
];

export { inputEmail, inputUsername, inputPassword, confirmPassword, colors, msgs };