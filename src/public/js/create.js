"use strict";

function onCreate() {
  const btnSubmit = document.querySelector('.btn-submit');
  const container = document.querySelector('.container');
  const classNames = ['container', 'container-sm'];
  const isMobile = detectMobileDevice(window.navigator.userAgent);
  
  container.classList.replace('container', classNames[Number(isMobile)]);
  btnSubmit.addEventListener('click', sendData);
}

function detectMobileDevice(agent) {
  const mobileRegex = [
    /Android/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ];

  return mobileRegex.some(mobile => agent.match(mobile));
}

async function sendData() {
  const productsTitle = document.querySelector('#productsTitle');
  const productsCategory = document.querySelector('#productsCategory');
  const productsPrice = document.querySelector('#productsPrice');
  const productsDescription = document.querySelector('#productsDescription');
  const URL = '/create';
  const productsInfo = {
    title: productsTitle.value,
    category: productsCategory.value,
    price: productsPrice.value,
    content: productsDescription.value,
  };
  const missedInfo = [];

  for (const info in productsInfo) {
    if (isEmpty(productsInfo[info])) {
      missedInfo.push(toKorean(info));
    }
  }
  const warningMessage = missedInfo.join(', ');

  const isEmptyProductsInfo = Object.values(productsInfo).map(info => isEmpty(info));
  const isConfirmUpload = !isEmptyProductsInfo.includes(true);

  if (!isConfirmUpload) {
    Swal.fire(`입력하지 않은 정보가 있어요(${warningMessage}). `);
  } else {
    let response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productsInfo),
    })
    .catch(error => console.log(error));
  }
}

function isEmpty(str) {
  return (typeof str === 'undefined') || (str === null) || (str === '');
}

function toKorean(info) {
  const infos = ['title', 'category', 'price', 'content'];
  const koreanInfos = ['제목', '카테고리', '가격', '내용'];

  for (let idx = 0; idx < infos.length; idx++) {
    if (infos[idx] === info) {
      return koreanInfos[idx];
    }
  }
}

onCreate();