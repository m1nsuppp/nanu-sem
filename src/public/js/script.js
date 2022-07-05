"use strict";

function foo () {
  const loginBtn = document.querySelector('.btn-block');
  loginBtn.addEventListener('click', bar);
}

function bar () {
  const inputEmail = document.querySelector('#inputEmail');
  fetch('http://localhost:3000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: inputEmail.value,
    })
  });
}

foo();
