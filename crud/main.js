import { $, $$ } from '@sciter';

$('#filter').on('input', filter);
$('select').on('change', onSelect);
$('#create').on('click', create);
$('#update').on('click', update);
$('#delete').on('click', onDelete);

function filter() {
  $$('option').forEach((option) => {
    const [surname] = option.textContent.split(',');
    option.style.display = surname.startsWith(this.value) ? 'block' : 'none';
  });
}

function onSelect() {
  enable();
  const { value } = this;
  const [_, surname, name] = value.match(/(.+), (.+)/) || [];
  $('#surname').value = surname;
  $('#name').value = name;
}

function create() {
  const { value: name } = $('#name');
  const { value: surname } = $('#surname');
  $('select').append(<option>{surname}, {name}</option>);
}

function update() {
  const { value: name } = $('#name');
  const { value: surname } = $('#surname');
  $('option:current').textContent = `${surname}, ${name}`;
}

function onDelete() {
  $('option:current').remove();
  disable();
}

function disable() {
  $('#update').state.disabled = true;
  $('#delete').state.disabled = true;
}

function enable() {
  $('#update').state.disabled = false;
  $('#delete').state.disabled = false;
}