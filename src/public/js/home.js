"use strict";

async function home() {
  const url = '/';
  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Access-Control-Origin': '*',
      'Content-Type': 'application/json',
    },
  })
  .catch((error) => console.log(error));
  let result = await response.json().catch((error) => console.log(error));
  console.log(result);
}

home();