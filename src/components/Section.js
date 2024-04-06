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

  _setInLocalStorage() {
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
    this._renderedTask.push(taskText);
    this._setInLocalStorage();
    this._container.append(task);
  }

  deleteTask(taskText, taskElement) {
    const tasks = this._renderedTask.filter((item) => item !== taskText);
    this._renderedTask = tasks;
    this._setInLocalStorage();
    taskElement.remove();
  }

  editTask(taskText, taskElement) {
    const oldTaskValue = taskElement.querySelector('.tasks__item-title').textContent;
    const tasks = this._renderedTask.map((item) => (item === oldTaskValue ? taskText : item));
    this._renderedTask = tasks;
    this._setInLocalStorage();
    taskElement.querySelector('.tasks__item-title').textContent = taskText;
  }
}
