import { $, $$ } from '@sciter';

globalThis.ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

adjustWindow();

function adjustWindow() {
  const w = 400;
  const h = 400;
  const [sw, sh] = Window.this.screenBox('frame', 'dimension');
  Window.this.move((sw - w) / 2, (sh - h) / 2, w, h, true);
}

document.on('dblclick', 'td:not(:first-child)', (_, td) => {
  const { attributes: { formula } } = td;
  td.textContent = '';
  td.append(<input value={formula} />);
  setTimeout(() => td.$('input').focus());
  td.$('input').on('keydown', ({ code }) => code === 'KeyRETURN' && submitValue(td));
  td.$('input').on('blur', () => resetValue(td));
});

function submitValue(td) {
  const input = td.$('input');
  const { value: submission } = input;
  td.attributes.formula = submission;
  const value = processValue(submission);
  input.remove();
  td.append(<center>{value}</center>);
  td.attributes.memory = value;
  updateDependentsOf(td);
}

function resetValue(td) {
  td.$('input').remove();
  td.append(<center>{td.attributes.memory}</center>);
}

function processValue(value) {
  if (!value.startsWith('=')) return value;
  // =A0
  const regexEquality = /^=([A-Z])(\d{1,2})$/;
  if (regexEquality.test(value)) {
    const [_, letter, number] = value.match(regexEquality);
    const { attributes: { formula: newValue } } = getCell(letter, number);
    return processValue(newValue);
  }
  // =sum(A0:Z99)
  // or sub / mul / div
  const regexOperation = /^=([a-z]{3})\(([A-Z]\d{1,2}):([A-Z]\d{1,2})\)$/;
  if (regexOperation.test(value)) {
    const [_, op, id1, id2] = value.match(regexOperation);
    const val1 = +$('#' + id1).textContent;
    const val2 = +$('#' + id2).textContent;
    switch (op) {
      case 'sum': {
        return val1 + val2;
      }
      case 'sub': {
        return val1 - val2;
      }
      case 'mul': {
        return val1 * val2;
      }
      case 'div': {
        return val1 / val2;
      }
    }
  }
}

function updateDependentsOf(cell) {
  const { id } = cell;
  const dependents = $$('td').filter(({ attributes: { formula } }) => new RegExp(`\\b${id}\\b`).test(formula));
  dependents.forEach((dependent) => {
    const value = processValue(dependent.attributes.formula);
    dependent.innerHTML = `<center>${value}</center>`;
    dependent.attributes.memory = value;
    updateDependentsOf(dependent);
  });
}

function getCell(letter, number) {
  const x = ALPHABET.indexOf(letter) + 2;
  const y = +number + 1;
  return $(`tbody > tr:nth-child(${y}) > td:nth-child(${x})`);
}

$('.container').append(<table>
  <thead>
    <tr>{(' ' + ALPHABET).split('').map((letter) => <th>{letter}</th>)}</tr>
  </thead>
  <tbody>
    {Array.from({ length: 100 }, (_, n) => n).map((n) =>
      <tr><td>{n}</td>
        {Array.from({ length: 26 }).map((_, i) => <td id={ALPHABET[i] + n} formula="" memory=""></td>)}
      </tr>)}
  </tbody>
</table>);