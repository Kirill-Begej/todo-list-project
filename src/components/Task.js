export default class Task {
  constructor({ text, deleteTask }, container) {
    this._text = text;
    this._deleteTask = deleteTask;
    this._container = container;
  }

  _getElement() {
    this._taskElement = this._container.content.querySelector('.tasks__item').cloneNode(true);
  }

  _addEventListeners() {
    this._taskElement.querySelector('#buttonRemove').addEventListener('click', () => {
      this._deleteTask(this._text, this._taskElement);
    });
  }

  generate() {
    this._getElement();
    this._addEventListeners();
    this._taskElement.querySelector('.tasks__item-title').textContent = this._text;
    return this._taskElement;
  }
}
