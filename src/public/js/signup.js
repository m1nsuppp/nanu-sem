"use strict";

function signUp() {
  const inputEmail = document.querySelector('#email');
  const inputUsername = document.querySelector('#username');
  const inputPassword = document.querySelector('#password');
  const confirmPassword = document.querySelector('#confirm-password');
  const signUpBtn = document.querySelector('#signup');
  const formSign = document.querySelector('.form-sign');

  let responseData = {
    isValidEmail: false,
    isValidUsername: false,
    isValidPassword: false,
    isSamePassword: false,
  };

  inputEmail.addEventListener('keyup', async () => {
    responseData.isValidEmail = await isSomethingInUse('email')
  });
  inputUsername.addEventListener('keyup', async () => {
    responseData.isValidUsername = await isSomethingInUse('username');
  });
  inputPassword.addEventListener('keyup', () => {
    responseData.isValidPassword = isValidPasswordLength();
  });
  confirmPassword.addEventListener('keyup', () => {
    responseData.isSamePassword = isSamePassword();
  });

  formSign.addEventListener('keyup', () => {
    signUpBtn.disabled = !isValidAccount(responseData);
  });

  signUpBtn.addEventListener('click', () => {
    createUserWithEmailAndPassword(inputEmail.value, inputUsername.value, inputPassword.value);
  });
}

async function isSomethingInUse(field) {
  const red = 'rgba(255 0 0)';
  const green = 'rgba(0 192 0)';
  const colors = [green, red];
  const msgs = {
    email: ['사용 가능한 이메일입니다.', '이미 등록된 이메일입니다.', '형식에 맞지 않는 이메일입니다.'],
    username: ['사용 가능한 닉네임입니다.', '이미 등록된 닉네임입니다.', '닉네임은 2~16자이어야만 합니다.'],
  };
  const URL = `signup/${field}`;
  const inputData = document.querySelector(`#${field}`).value;
  const requestBody = {
    inputData: inputData,
  };
  const msgField = document.querySelector(`.msg.${field}`);

  let response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
  .catch(error => console.log(error));

  let result = await response.json().catch(error => console.log(error));

  msgField.innerHTML = msgs[field][result.hasData];
  msgField.style.color = colors[Number(Boolean(result.hasData))];

  return result.hasData;
}

function isValidPasswordLength() {
  const red = 'rgba(255 0 0)';
  const green = 'rgba(0 192 0)';
  const colors = [red, green];
  const validLength = { min: 8, max: 20 };
  const inputPassword = document.querySelector('#password').value;
  const isValidLength = (validLength.min <= inputPassword.length) && (inputPassword.length <= validLength.max);
  const msgField = document.querySelector(`.msg.password`);
  const msg = ['비밀번호는 8~20자이어야만 합니다.', '조건을 만족하는 비밀번호입니다.'];

  msgField.innerHTML = msg[Number(isValidLength)];
  msgField.style.color = colors[Number(isValidLength)];

  return isValidLength;
}

function isSamePassword() {
  const red = 'rgba(255 0 0)';
  const green = 'rgba(0 192 0)';
  const colors = [red, green];
  const inputPassword = document.querySelector('#password').value;
  const confirmPassword = document.querySelector('#confirm-password').value;
  const isSame = inputPassword === confirmPassword;
  const msgField = document.querySelector(`.msg.confirm-password`);
  const msg = ['비밀번호가 일치하지 않습니다.', '비밀번호가 일치합니다.'];

  msgField.innerHTML = msg[Number(isSame)];
  msgField.style.color = colors[Number(isSame)];

  return isSame;
}

function isValidAccount(responseData) {
  return !responseData.isValidEmail && !responseData.isValidUsername && responseData.isSamePassword && responseData.isValidPassword;
}

async function createUserWithEmailAndPassword(email, username, password) {
  const URL = '/signup';
  
  let userAccountInfo = {
    email: email,
    username: username,
    password: password,
  };
  
  let response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userAccountInfo),
  })
  .catch(error => console.log(error));

  let result = await response.json().catch(error => console.log(error));

  result.isConfirmSignUp ? welcomeSignUp(result.email, result.username) : alert('비정상적인 접근입니다.');
}

function welcomeSignUp (email, username) {
  const container = document.querySelector('.container-sign');
  const formSign = document.querySelector('.form-sign');
  let template = `
  <h1 class='container-headline'>환영합니다!</h1>
  <p class="form-headline">${username}님, 회원가입을 축하합니다.</p>
  <p class="form-headline">
  나눗셈의 로그인 이메일은 
    <span style="color: #00C040;">${email}</span>
  입니다.
  </p>
  <a href="/signin"><button class="btn btn-block btn-primary">시작하기</button></a>
  `;

  container.removeChild(formSign);
  container.insertAdjacentHTML('beforeend', template);
}

signUp();