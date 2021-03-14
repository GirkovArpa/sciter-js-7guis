export default class Action {
  #undo;
  #redo;
  #action;
  constructor(undo, redo) {
    this.#undo = undo;
    this.#redo = redo;
    this.#action = 'undo';
  }
  execute() {
    if (this.#action === 'undo') {
      this.#undo();
    } else if (this.#action === 'redo') {
      this.#redo();
    }
    this.#action = this.#action === 'undo' ? 'redo' : 'undo';
    return this;
  }
}