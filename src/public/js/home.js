"use strict";

async function home() {
  const logIcon = document.querySelector('.login-icons');
  const url = '/';
  const msgs = [
    '로그인',
    '로그아웃',
  ];
  const logHrefs = [
    '/login',
    'logout'
  ];
  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Access-Control-Origin': '*',
      'Content-Type': 'application/json',
    },
  })
  .catch((error) => console.log(error));
  let result = await response.json().catch((error) => console.log(error));

  logIcon.innerHTML = msgs[result.isLoggedIn];
  logIcon.addEventListener('click', () => window.location.href = logHrefs[result.isLoggedIn]);
}

home();