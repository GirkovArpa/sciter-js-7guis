'use strict';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const inputPrefix = $('#prefix');
const list = $('[type=list]');
inputPrefix.addEventListener('change', () => {
  const options = $$('option');
  options.forEach((option) => {
    const { textContent } = option;
    if (!textContent.startsWith(inputPrefix.value)) {
      option.style.opacity = 0; // cannot set property 'opacity' of undefined
    }
  });
}); 