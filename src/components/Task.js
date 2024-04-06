export default class Task {
  constructor({
    text,
    editTask,
    deleteTask,
    inProgressTask,
  }, container) {
    this._text = text;
    this._editTask = editTask;
    this._deleteTask = deleteTask;
    this._inProgressTask = inProgressTask;
    this._container = container;
  }

  _getElement() {
    this._taskElement = this._container.content.querySelector('.tasks__item').cloneNode(true);
  }

  _addEventListeners() {
    this._taskElement.querySelector('#buttonEdit').addEventListener('click', () => {
      this._editTask(this._taskElement.querySelector('.tasks__item-title').textContent, this._taskElement);
    });
    this._taskElement.querySelector('#buttonRemove').addEventListener('click', () => {
      this._deleteTask(this._text, this._taskElement);
    });
    if (this._taskElement.querySelector('#buttonProgress')) {
      this._taskElement.querySelector('#buttonProgress').addEventListener('click', () => {
        this._inProgressTask(this._text, this._taskElement);
      });
    }
  }

  generate() {
    this._getElement();
    this._addEventListeners();
    this._taskElement.querySelector('.tasks__item-title').textContent = this._text;
    return this._taskElement;
  }
}
