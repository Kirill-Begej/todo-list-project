import TaskInProgress from './TaskInProgress';

export default class TaskDone extends TaskInProgress {
  constructor({ text, deleteTask }, container) {
    super({ text, deleteTask }, container);
  }

  _deleteDoneButton() {
    this._taskElement.querySelector('#buttonDone').remove();
  }

  _getElement() {
    super._getElement();
    this._deleteDoneButton();
  }
}
