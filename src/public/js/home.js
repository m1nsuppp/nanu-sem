"use strict";

function home() {
  isSignedIn();
}

async function isSignedIn() {
  const linkSignIn = document.querySelector('#link-signin');
  const linkCreate = document.querySelector('#link-create');
  const signStates = ['로그인', '로그아웃'];
  const signUrls = ['/signin', '/signout'];
  const createUrls = ['/signin', '/create'];
  const url = '/';
 
  let response = await fetch(url, {
    method: 'POST',
  })
  .catch(error => console.log(error));

  let result = await response.json().catch(error => console.log(error));
  
  linkSignIn.innerHTML = signStates[Number(result.isSignedIn)];
  linkSignIn.href = signUrls[Number(result.isSignedIn)];
  linkCreate.href = createUrls[Number(result.isSignedIn)];
}

home();
