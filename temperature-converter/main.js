import { $, $$ } from '@sciter';

document.on('input', 'input', (_, textbox) => {
  const { id, value } = textbox;
  convert(id, value);
});

function convert(id, value) {
  if ($$('input').find(({ value }) => isNaN(+value))) {
    return;
  }
  if (id === 'farenheight') {
    $('#celsius').value = parseFloat(f2c(value));
  } else {
    $('#farenheight').value = parseFloat(c2f(value));
  }
}

function f2c(f) {
  return (f - 32) * 5 / 9;
}

function c2f(c) {
  return c * 9 / 5 + 32;
}