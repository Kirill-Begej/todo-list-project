export default class Task {
  constructor({ text }, container) {
    this._text = text;
    this._container = container;
  }

  _getElement() {
    this._taskElement = this._container.content.querySelector('.tasks__item').cloneNode(true);
  }

  generate() {
    this._getElement();

    this._taskElement.querySelector('.tasks__item-title').textContent = this._text;

    return this._taskElement;
  }
}
