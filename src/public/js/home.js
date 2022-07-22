"use strict";

function home() {
  isSignedIn();
}

async function isSignedIn() {
  const linkSignIn = document.querySelector('#link-signin');
  const linkCreate = document.querySelector('#link-create');
  const signStates = ['로그인', '로그아웃'];
  const signURLs = ['/signin', '/signout'];
  const createURLs = ['/signin', '/create'];
  const URL = '/';
 
  let response = await fetch(URL, {
    method: 'POST',
  })
  .catch(error => console.log(error));

  let result = await response.json().catch(error => console.log(error));
  
  linkSignIn.innerHTML = signStates[Number(result.isSignedIn)];
  linkSignIn.href = signURLs[Number(result.isSignedIn)];
  linkCreate.href = createURLs[Number(result.isSignedIn)];
}

home();
