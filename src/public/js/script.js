"use strict";

const inputPassword = document.getElementById('inputPassword');
inputPassword.addEventListener('keyup', pwCheck);


function pwCheck() {
  let pw = inputPassword.value.length;

  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      "Access-Control-Origin": "*",
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "pwlen": pw,
    }),
  }).then((res) => {
    return res.json();
  }).then((res) => {
      console.log(res.pwlen);
      if (res.pwlen < 8) {
        document.getElementById('foo').innerHTML = 'your password must be at least 8 characters.';
      } else {
        document.getElementById('foo').innerHTML = 'possible';
      }
  }).catch((error) => {
    console.log(error);
  });
}
