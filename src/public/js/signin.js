"use strict";

function onSignIn() {
  const btnPrimary = document.querySelector('.btn-primary');
  const errorMsg = document.querySelector('#error-msg');
  btnPrimary.addEventListener('click', async () => {
    let result = await hasAccount().catch(error => console.log(error));

    if (result.hasAccount) {
      window.location.href = '/';
    } else {
      errorMsg.innerHTML = '이메일 또는 비밀번호가 일치하지 않습니다.';
    }
  });
}

async function hasAccount() {
  const url = '/signin';
  let inputEmail = document.querySelector('#inputEmail').value;
  let inputPassword = document.querySelector('#inputPassword').value;
  let response = await fetch(url, {
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