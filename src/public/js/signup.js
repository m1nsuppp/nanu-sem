"use strict";
import { inputEmail, inputUsername, inputPassword, confirmPassword, colors, msgs } from "./userFields.js";

function signup () {
  const validator = {
    password: {
      min: 8,
      max: 20,
      selector: document.querySelector('.validator.password'),
    },
    confirmPassword: {
      selector: document.querySelector('.validator.confirmPassword'),
    }
  };

  // 이메일, 닉네임 중복 확인
  inputEmail.addEventListener('change', isReduplicationEmail);
  inputUsername.addEventListener('change', isReduplicationUsername);

  // 닉네임, 비밀번호 길이 확인
  // inputUsername.addEventListener('keyup', () => {
  //   isValidLength(inputUsername.value.length, validator.username, colors);
  // });
  inputPassword.addEventListener('keyup', () => {
    isValidLength(inputPassword.value.length, validator.password, colors);
  });

  confirmPassword.addEventListener('keyup', () => {
    let isSamePassword = (inputPassword.value === confirmPassword.value);

    if (isSamePassword) {
      validator.confirmPassword.selector.innerHTML = '일치합니다.';
      validator.confirmPassword.selector.style.color = colors.correct;
    } else {
      validator.confirmPassword.selector.innerHTML = '일치하지 않습니다.';
      validator.confirmPassword.selector.style.color = colors.incorrect;
    }
  });
}

// 닉네임, 비밀번호 길이 확인
function isValidLength (resDataProp, validator, colors) {
  if (resDataProp) {
    if ((validator.min <= resDataProp) && (resDataProp <= validator.max)) {
      validator.selector.innerHTML = `유효합니다.`;
      validator.selector.style.color = colors.correct;
    } else {
      validator.selector.innerHTML = `${validator.min} ~ ${validator.max}자이어야 합니다.`;
      validator.selector.style.color = colors.incorrect;
    }  
  }
}

// 이메일 중복 확인
async function isReduplicationEmail () {
  const url = '/signup';
  const emailValidator = document.querySelector('.validator.email');
  let key = {
    inputEmail: inputEmail.value,
  };
  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Access-Control-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(key),
  })
  .catch((error) => console.log(error));

  // result: { hasEmail: Boolean, hasUsername: Boolean }
  let result = await response.json().catch((error) => console.log(error));

  emailValidator.innerHTML = `${msgs[result.hasEmail]} 이메일입니다.`;
  emailValidator.style.color = colors[result.hasEmail];
}

async function isReduplicationUsername () {
  const url = '/signup';
  let usernameValidator = document.querySelector('.validator.username');
  let key = {
    inputUsername: inputUsername.value,
  };
  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Access-Control-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(key),
  })
  .catch((error) => console.log(error));

  // result: { hasEmail: Boolean, hasUsername: Boolean }
  let result = await response.json().catch((error) => console.log(error));

  usernameValidator.innerHTML = `${msgs[result.hasUsername]} 닉네임입니다.`;
  usernameValidator.style.color = `${colors[result.hasUsername]}`;
}

signup();
