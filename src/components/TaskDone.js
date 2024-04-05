import TaskInProgress from './TaskInProgress';

export default class TaskDone extends TaskInProgress {
  constructor({ text }, container) {
    super({ text }, container);
  }

  _deleteDoneButton() {
    this._taskElement.querySelector('#buttonDone').remove();
  }

  _getElement() {
    super._getElement();
    this._deleteDoneButton();
  }
}
