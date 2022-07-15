"use strict";

function home() {
  isSignedIn();
}

async function isSignedIn() {
  const loginIcon = document.querySelector('.login-icons');
  const signStates = ['로그인', '로그아웃'];
  const urls = ['/signin', '/signout'];
  const url = '/';
  let response = await fetch(url, {
    method: 'POST',
  })
  .catch(error => console.log(error));

  let result = await response.json().catch(error => console.log(error));
  
  loginIcon.innerHTML = signStates[Number(Boolean(result.isSignedIn))];
  loginIcon.addEventListener('click', () => window.location.href = urls[Number(Boolean(result.isSignedIn))]);
}

home();
