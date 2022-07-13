"use strict";
import { inputEmail, inputUsername, inputPassword, confirmPassword, colors } from "./userFields.js";

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
  const url = 'http://localhost:3000/signup';
  let emailValidator = document.querySelector('.validator.email');
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
  console.log(result);
  console.log(typeof result);

  // if (result.hasEmail) {
  //   emailValidator.innerHTML = `이미 사용중인 이메일입니다.`;
  // } else if (inputEmail.value === '') {
  //   emailValidator.innerHTML = `필수 입력 조건입니다.`;
  // } else {
  //   emailValidator.innerHTML = `가입 가능한 이메일입니다.`;
  // }
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

  // if (result.hasUsername) {
  //   usernameValidator.innerHTML = `이미 등록된 닉네임입니다.`;
  // } else if (inputUsername.value === '') {
  //   usernameValidator.innerHTML = `필수 입력 조건입니다.`;
  // } else if (2 > inputUsername.value.length || inputUsername.value.length > 20) {
  //   usernameValidator.innerHTML = `2 ~ 16자이어야 합니다.`;
  // } else if (!result.hasUsername && (2 <= inputUsername.value.length && inputUsername.value.length <= 20)) {
  //   usernameValidator.innerHTML = `사용 가능한 닉네임입니다.`;
  // } 
}

signup();
