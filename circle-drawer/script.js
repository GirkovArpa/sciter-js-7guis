'use strict';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const canvas = $('#canvas');
canvas.addEventListener('click', function (event) {
  const window = new Window({
    type: Window.TOOL_WINDOW,
    state: Window.WINDOW_SHOWN,
    parent: Window.this,
    width: 300,
    height: 100,
    caption: ''
  });
});