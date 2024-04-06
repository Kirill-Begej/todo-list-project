import Task from './Task';

export default class TaskInProgress extends Task {
  constructor({
    text,
    editTask,
    deleteTask,
    doneTask,
  }, container) {
    super({
      text,
      editTask,
      deleteTask,
      doneTask,
    }, container);
  }

  _deleteProgressButton() {
    this._taskElement.querySelector('#buttonProgress').remove();
  }

  _getElement() {
    super._getElement();
    this._deleteProgressButton();
  }
}
