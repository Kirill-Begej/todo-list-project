export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = container;
  }

  _checkInLocalStorage() {
    this._renderedTask = localStorage.getItem('toDo')
      ? JSON.parse(localStorage.getItem('toDo'))
      : false;
  }

  setAppLoadListener() {
    this._checkInLocalStorage();
    if (this._renderedTask) {
      window.addEventListener('load', () => {
        this._renderTasks();
      });
    }
  }

  _renderTasks() {
    this._renderedTask.forEach((item) => this._renderer(item));
  }

  setTask(element) {
    this._container.append(element);
  }
}
