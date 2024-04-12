import TaskInProgress from './TaskInProgress';

export default class TaskCompleted extends TaskInProgress {
  constructor({ text, editTask, deleteTask }, container) {
    super({ text, editTask, deleteTask }, container);
  }

  _deleteCompletedButton() {
    this._taskElement.querySelector('#buttonCompleted').remove();
  }

  _deleteCursorGrab() {
    this._taskElement.style.cursor = 'default';
  }

  _deleteAttributeDraggable() {
    this._taskElement.removeAttribute('draggable');
  }

  _getElement() {
    super._getElement();
    this._deleteCompletedButton();
    this._deleteCursorGrab();
    this._deleteAttributeDraggable();
  }
}
