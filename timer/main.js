import { $ } from '@sciter';

globalThis.DECASECONDS = 0;

setInterval(update, 100);
$('[type=hslider]').on('change', () => update(false));
$('button.reset').on('click', reset);

function update(increment = true) {
  const hslider = $('[type=hslider]');
  const progress = $('[type=progress]');
  const { attributes: { min: a }, value: b } = hslider;
  const { attributes: { min: y, max: z } } = progress;
  if (increment && (DECASECONDS / 10) < +b) DECASECONDS++;
  const seconds = (DECASECONDS / 10).toFixed(1);
  const percentage = mapRange(+seconds, +a, +b, +y, +z);
  progress.value = percentage;
  $('label.label').textContent = `${seconds}s / ${b}s`;
}

function reset() {
  DECASECONDS = 0;
  update(false);
}

function mapRange(n, a, b, y, z) {
  return Math.round((n - a) * (z - y) / (b - a) + y);
}