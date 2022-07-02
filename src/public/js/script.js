"use strict";

function foo() {
  const h1 = document.querySelector('body > div > h1');

  h1.addEventListener('click', bar);
}

// How to use fetch() API?
function bar() {
  const string = {
    foo: 'skrrrt~',
  }
  console.log(string.foo);
  console.log(JSON.stringify(string));

  fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(string),
  });
}

foo();