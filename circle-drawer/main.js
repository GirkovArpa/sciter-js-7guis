import { $, $$ } from '@sciter';

globalThis.DIALOG = null;
globalThis.CIRCLE = null

$('.canvas').on('click', onCanvasClick);
document.on('click', 'circle', onCircleClick);
document.on('click', 'li', openDialog);

function onCanvasClick({ clientX: mouseX, clientY: mouseY }) {
  if (closeDialog()) return;
  if ($('circle:hover')) return;
  const { x: canvasX, y: canvasY } = this.getBoundingClientRect();
  const x = mouseX - canvasX;
  const y = mouseY - canvasY;
  const r = 15;
  const d = r * 2;

  const max = 100;
  const style = `width: ${max}; height: ${max}; left: ${x - (max / 2)}; top: ${y - (max / 2)};`;
  $('.canvas').append(<svg style={style}>
    <circle cx={(max / 2) + 0} cy={(max / 2) + 0} r={r - 4} stroke="black" stroke-width="1" fill="transparent" />
  </svg>);
}

function onCircleClick({ clientX: mouseX, clientY: mouseY }, circle) {
  CIRCLE = circle;
  const [windowX, windowY] = Window.this.box('position');
  const x = windowX + mouseX;
  const y = windowY + mouseY;
  $('menu').popupAt(x, y, 7);
}

function openDialog() {
  DIALOG = new Window({
    alignment: 5,
    url: 'dialog/main.html',
    state: Window.WINDOW_SHOWN,
    parameters: {
      circle: CIRCLE
    }
  });
}

function closeDialog() {
  if (DIALOG) {
    DIALOG.close();
    DIALOG = null;
    return true;
  } else {
    return false;
  }
}