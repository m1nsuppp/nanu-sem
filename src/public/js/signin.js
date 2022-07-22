"use strict";

function onSignIn() {
  const btnPrimary = document.querySelector('.btn-primary');
  const errorMsg = document.querySelector('#error-msg');
  btnPrimary.addEventListener('click', async (result) => {
    result = await hasAccount().catch(error => console.log(error));

    if (result.hasAccount) {
      window.location.href = '/';
    } else {
      errorMsg.innerHTML = '이메일 또는 비밀번호가 일치하지 않습니다.';
    }
  });
}

async function hasAccount() {
  const URL = '/signin';
  let inputEmail = document.querySelector('#email').value;
  let inputPassword = document.querySelector('#password').value;
  let response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputEmail: inputEmail,
      inputPassword: inputPassword,
    }),
  })
  .catch(error => console.log(error));

  let result = await response.json().catch(error => console.log(error));

  return result;
}

onSignIn();