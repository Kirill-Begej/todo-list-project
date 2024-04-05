import Task from './Task';

export default class TaskInProgress extends Task {
  constructor({ text }, container) {
    super({ text }, container);
  }

  _deleteProgressButton() {
    this._taskElement.querySelector('#buttonProgress').remove();
  }

  _getElement() {
    super._getElement();
    this._deleteProgressButton();
  }
}
