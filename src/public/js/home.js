"use strict";

fetch('/', {
  method: 'POST',
  headers: {
    'Access-Control-Origin': '*',
    'Content-Type': 'application/json',
  },
})
.then((res) => res.json())
.then((res) => {
  if (res.isLoggedIn) {
    document.querySelector('.login-icons').innerHTML = '로그아웃';
    document.querySelector('.login-icons').addEventListener('click', () => {
      window.location.href = '/logout';
    });
  }
}).catch((error) => console.log(error));