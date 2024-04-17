import TaskInProgress from './TaskInProgress';

export default class TaskCompleted extends TaskInProgress {
  constructor({
    text,
    editTask,
    deleteTask,
    dragEventListener,
  }, container) {
    super({
      text,
      editTask,
      deleteTask,
      dragEventListener,
    }, container);
  }

  _deleteCompletedButton() {
    this._taskElement.querySelector('#buttonCompleted').remove();
  }

  _getElement() {
    super._getElement();
    this._deleteCompletedButton();
  }
}
