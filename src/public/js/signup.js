"use strict";

const inputEmail = document.getElementById('inputEmail');
inputEmail.addEventListener('keyup', isDuplicated);

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

function isDuplicated () {
  fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: {
      "Access-Control-Origin": "*",
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "inputEmail": inputEmail.value,
      "inputUsername": inputUsername.value,
    }),
  }).then((res) => {
    return res.json();
  }).then((res) => {
    /**
     * res = { hasEmail: Boolean }
     */
    
    // 가입된 이메일인지 확인.
    if (res.hasEmail) {
      document.querySelector('.validator.email').innerHTML = `이미 가입한 이메일입니다.`;
    } else {
      document.querySelector('.validator.email').innerHTML = `가입 가능한 이메일입니다.`;      
    }
  }).catch((error) => {
    console.log(error);
  });
}

// 닉네임, 비밀번호 길이 확인

function isValidLength () {
  
}