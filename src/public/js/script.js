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
      validator.selector.style.color = `rgba(90 187 83)`
    } else {
      validator.selector.innerHTML = `${validator.min} ~ ${validator.max}자이어야 합니다.`;
      validator.selector.style.color = `rgba(233 50 35)`;
    }  
  }
}

function checkValidation () {
  /* 현재 기능 외에 구현해야할 것들
   * 1. email validation check(아래 코드들 참고).
   * 2. username, password, isSamePw(비밀번호가 일치하는지 확인하는 변수)가 모두 AND 조건을 만족할 때만 
   * '동의하고 시작하기'버튼이 활성화 될 수 있게 하기.
  */
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
      // "email": email,
      "usernameLength": usernameLength,
      "pwlen": ipw.length,
      "isSamePw": isSamePw,
    }),
  }).then((res) => {
    return res.json();
  }).then((res) => {
    // isEmailForm(res.email, );
    isValid(res.usernameLength, lengthValidator.username);
    isValid(res.pwlen, lengthValidator.password);
    const validText = document.querySelector('.validator.confirm');
    if (cpw) {
      if (isSamePw) {
        validText.innerHTML = `비밀번호가 일치합니다.`;
        validText.style.color = `rgba(90 187 83)`;
      } else {
        validText.innerHTML = `비밀번호가 일치하지 않습니다.`;
        validText.style.color = `rgba(233 50 35)`;
      }
    }
  }).catch((error) => {
    console.log(error);
  });
}
