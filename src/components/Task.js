export class Task {
  constructor({ text }, container) {
    this._text = text;
    this._container = container;
  }

  _getElement() {
    const taskElement = this._container.content.querySelector('.tasks__item').cloneNode(true);

    return taskElement;
  }

  generate() {
    this._element = this._getElement();

    this._element.querySelector('.tasks__item-title').textContent = this._text;

    return this._element;
  }
}
