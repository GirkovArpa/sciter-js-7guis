import { $ } from '@sciter';

$('input').on('change', resizeCircle);

function resizeCircle() {
  const { this: { parameters: { circle, circle: { parentElement: svg } } } } = Window;
  circle.attributes.r = (this.value / 2) - 2;
}