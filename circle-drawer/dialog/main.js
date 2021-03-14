import { $ } from '@sciter';

$('input').on('input', resizeCircle);
adjustSlider();

function adjustSlider() {
  $('input').value = (Window.this.parameters.circle.attributes.r * 2) + 2;
}

function resizeCircle() {
  const { this: { parameters: { circle } } } = Window;
  circle.attributes.r = (this.value / 2) - 2;
}