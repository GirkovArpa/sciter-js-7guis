'use strict';

const inputs = [...document.querySelectorAll('input[type=text]')];
const [inputStart, inputReturn] = inputs;

inputs.forEach((input) => {
  input.addEventListener('change', () => {
    const [day, month, year] = input.value.split('.');
    const date = new Date(year, month, day);
  
    if (date == 'Invalid Date') {
      // trying to change background color to red

      //input.style.backgroundColor = 'red'; // cannot set property 'backgroundColor' of undefined
      //input.classList.add('invalid'); // cannot read property 'add' of undefined
      //input.setAttribute('style', 'background-color: red'); // not a function
    } else {

    }
  });
});