export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = container;
    this._renderedTask = [];
  }

  _checkInLocalStorage() {
    this._tasksInLocalStorage = localStorage.getItem('toDo')
      ? JSON.parse(localStorage.getItem('toDo'))
      : [];
  }

  _setInLocalStorage(taskText) {
    this._renderedTask.push(taskText);
    localStorage.setItem('toDo', JSON.stringify(this._renderedTask));
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
