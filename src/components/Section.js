export default class Section {
  constructor({ keyInLocalStorage, renderer }, container) {
    this._keyInLocalStorage = keyInLocalStorage;
    this._renderer = renderer;
    this._container = container;
    this._renderedTask = [];
  }

  _checkInLocalStorage() {
    this._tasksInLocalStorage = localStorage.getItem(this._keyInLocalStorage)
      ? JSON.parse(localStorage.getItem(this._keyInLocalStorage))
      : [];
  }

  _setInLocalStorage(taskText) {
    this._renderedTask.push(taskText);
    localStorage.setItem(this._keyInLocalStorage, JSON.stringify(this._renderedTask));
  }

  _renderTasks() {
    this._tasksInLocalStorage.forEach((task) => this._renderer(task));
  }

  setAppLoadListener() {
    window.addEventListener('load', () => {
      this._checkInLocalStorage();
      this._renderTasks();
    });
  }

  setTask(task, taskText) {
    this._setInLocalStorage(taskText);
    this._container.append(task);
  }
}
