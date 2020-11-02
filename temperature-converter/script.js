'use strict';

const inputCelsius = document.querySelector('[name=celsius]');
const inputFarenheight = document.querySelector('[name=farenheight]');

function fToC(F) {
  return (F - 32) * (5 / 9);
}

function cToF(C) {
  return C * (9 / 5) + 32;
}

inputCelsius.addEventListener('change', () => {
  inputFarenheight.value = cToF(inputCelsius.value);
});

inputFarenheight.addEventListener('change', () => {
  inputCelsius.value = fToC(inputFarenheight.value);
});