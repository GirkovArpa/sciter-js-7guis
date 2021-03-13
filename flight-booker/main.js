import { $, $$ } from '@sciter';

$('form').on('change', validate);
$('button.book').on('click', book);

function validate(evt, el) {
  if (el.tag === 'form') return;
  const regex = /^\d{2}\.\d{2}\.\d{4}$/;
  $$('input').forEach((input, index) => {
    const { value, state: { disabled } } = input;
    const isValid = regex.test(value);
    if (!isValid) {
      input.classList.add('ill-formatted');
    } else {
      input.classList.remove('ill-formatted');
    }
  });
  if ($('select').value === 'one-way flight') {
    $('button.book').state.disabled = $$('input')[0].classList.contains('ill-formatted');
    $$('input')[1].state.disabled = true;
    $$('input')[1].style.color = 'rgb(168, 136, 136)';
  } else if ($('select').value === 'return flight') {
    $('button.book').state.disabled = !!$('.ill-formatted') || !datesAreSorted();
    $$('input')[1].state.disabled = false;
    $$('input')[1].style.color = 'black';
  }
}

function datesAreSorted() {
  const [{ value: a }, { value: b }] = $$('input');
  const numbers = [a, b].map((x) => x.match(/^(\d{2})\.(\d{2})\.(\d{4})$/).slice(1));
  const dates = numbers.map(([day, month, year]) => new Date(year, month - 1, day));
  return dates[0] <= dates[1];
}

function book() {
  const dates = $$('input').map(({ value }) => value);
  switch ($('select').value) {
    case 'one-way flight': {
      const info = `You have booked a one-way flight on ${dates[0]}.`;
      Window.this.modal(<info>{info}</info>);
      break;
    }
    case 'return flight': {
      const info = `You have booked a return flight from ${dates[0]} to ${dates[1]}.`;
      Window.this.modal(<info>{info}</info>);
      break;
    }
  }

}