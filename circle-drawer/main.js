import { $, $$ } from '@sciter';
import Action from './action.js';

globalThis.DIALOG = null;
globalThis.CIRCLE = null;
globalThis.HISTORY = { UNDO: [], REDO: [] };

$('svg').on('click', onCanvasClick);
$('#undo').on('click', undoClicked);
$('#redo').on('click', redoClicked);
document.on('click', 'circle', onCircleClick);
document.on('click', 'li', openDialog);

function onCanvasClick({ x: cx, y: cy }) {
  if (closeDialog()) return;
  if ($('circle:hover')) return;
  createCircle(cx, cy);
}

function createCircle(cx, cy) {
  const r = 10;
  const stroke = 'black';
  const strokeWidth = 1;
  const fill = 'transparent';
  const id = String(Math.random()).replace('.', '');
  const circle = <circle id={id} cx={cx} cy={cy} r={r} stroke={stroke} stroke-width={strokeWidth} fill={fill} />;
  $('svg').append(circle);
  const undo = () => $('#' + id).style.display = 'none';
  const redo = () => $('#' + id).style.display = 'block';
  const action = new Action(undo, redo);
  HISTORY.UNDO.push(action);
  HISTORY.REDO.length = 0;
  updateButtons();
}

function onCircleClick({ clientX: mouseX, clientY: mouseY }, circle) {
  CIRCLE = circle;
  CIRCLE.rPrev = CIRCLE.attributes.r;
  circle.classList.add('hover');
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
    const { attributes: { id, r }, rPrev } = CIRCLE;
    const undo = () => $('#' + id).attributes.r = rPrev;
    const redo = () => $('#' + id).attributes.r = r;
    const action = new Action(undo, redo);
    HISTORY.UNDO.push(action);
    HISTORY.REDO.length = 0;
    updateButtons();
    return true;
  } else {
    return false;
  }
}

function undoClicked() {
  const { UNDO, REDO } = HISTORY;
  REDO.push(UNDO.pop().execute());
  updateButtons();
}

function redoClicked() {
  const { UNDO, REDO } = HISTORY;
  UNDO.push(REDO.pop().execute());
  updateButtons();
}

function updateButtons() {
  $('#undo').state.disabled = !HISTORY.UNDO.length;
  $('#redo').state.disabled = !HISTORY.REDO.length;
}