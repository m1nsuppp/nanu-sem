"use strict";
import { inputEmail, inputUsername, inputPassword, confirmPassword, colors } from "./userFields.js";

function signup () {
  const validator = {
    username: {
      min: 2,
      max: 16,
      selector: document.querySelector('.validator.username'),
    },
    password: {
      min: 8,
      max: 20,
      selector: document.querySelector('.validator.password'),
    },
    confirmPassword: {
      selector: document.querySelector('.validator.confirmPassword'),
    }
  };

  // 이메일 가입 여부 확인
  inputEmail.addEventListener('keyup', isDuplicated);

  // 닉네임, 비밀번호 길이 확인
  inputUsername.addEventListener('keyup', () => {
    isValidLength(inputUsername.value.length, validator.username, colors);
  });
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
async function isDuplicated () {
  const url = 'http://localhost:3000/signup';
  let emailValidator = document.querySelector('.validator.email');
  let email = {
    inputEmail: inputEmail.value,
  };

  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Access-Control-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(email),
  })
  .catch((error) => console.log(error));

  let result = await response.json().catch((error) => console.log(error));
  
  if (result.hasEmail) {
    emailValidator.innerHTML = `이미 가입한 이메일입니다.`;
    emailValidator.style.color = colors.incorrect;
  } else {
    emailValidator.innerHTML = `가입 가능한 이메일입니다.`;
    emailValidator.style.color = colors.correct;
  }
}

signup();
