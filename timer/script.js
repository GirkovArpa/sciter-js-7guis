'use strict';

const $ = document.querySelector.bind(document);
const slider = $('[type=hslider]');
const label = $('.wide');
const progress = $('[type=progress]');

let TEXT = '0.0s / 0s';
let duration = 0;

slider.addEventListener('change', () => {
  let [match, n1, n2] = TEXT.match(/([\d\.]+)s \/ (\d+)s/) || [];
  if (n1 == undefined) return;
  TEXT = `${n1}s / ${slider.value}s`;
});

setInterval(() => {
  const max = Number(slider.value);
  if (duration / 10 >= max) return;
  duration += 1;
  TEXT = TEXT.replace(/[\d\.]+/, duration / 10);
}, 100);

const reset = $('button.reset');
reset.addEventListener('click', () => duration = 0);

setInterval(() => {
  if (label.textContent != TEXT) {
    label.textContent = TEXT;
    const max = Number(slider.value);
    const fraction = ((duration / 10) / max);
    if (fraction >= 0 && fraction <= 1) {
      progress.value = fraction;
    }
  }
});