"use strict";

const inputUsername = document.getElementById('inputUsername');
const inputPassword = document.getElementById('inputPassword');
const confirmPassword = document.getElementById('confirmPassword');

inputUsername.addEventListener('keyup', checkValidation);
inputPassword.addEventListener('keyup', checkValidation);
confirmPassword.addEventListener('keyup', checkValidation);

function isValid (resDataProp, validator) {
  if (resDataProp) {
    if ((validator.min <= resDataProp) && (resDataProp <= validator.max)) {
      validator.selector.innerHTML = `유효합니다.`;
    } else {
      validator.selector.innerHTML = `${validator.min} ~ ${validator.max}자이어야 합니다.`;
    }  
  }
}

function checkValidation () {
  const lengthValidator = {
    username: {
      selector: document.querySelector('.validator.username'),
      min: 2,
      max: 16,
    },
    password: {
      selector: document.querySelector('.validator.password'),
      min: 8,
      max: 20,
    },
  };
  let usernameLength = inputUsername.value.length;
  let ipw = inputPassword.value;
  let cpw = confirmPassword.value;
  let isSamePw = (ipw === cpw);

  fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: {
      "Access-Control-Origin": "*",
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "usernameLength": usernameLength,
      "pwlen": ipw.length,
      "isSamePw": isSamePw,
    }),
  }).then((res) => {
    return res.json();
  }).then((res) => {
    isValid(res.usernameLength, lengthValidator.username);
    isValid(res.pwlen, lengthValidator.password);
    
    if (cpw) {
      if (isSamePw) {
        document.querySelector('.validator.confirm').innerHTML = `비밀번호가 일치합니다.`;
      } else {
        document.querySelector('.validator.confirm').innerHTML = `비밀번호가 일치하지 않습니다.`;
      }
    }
  }).catch((error) => {
    console.log(error);
  });
}
