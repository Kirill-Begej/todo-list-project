export default class Section {
  constructor(
    {
      keyInLocalStorage,
      renderer,
      rendererOnDrop,
      dragoverEventListener,
      dragenterEventListener,
      dragleaveEventListener,
      dropEventListener,
    },
    container,
  ) {
    this._keyInLocalStorage = keyInLocalStorage;
    this._renderer = renderer;
    this._rendererOnDrop = rendererOnDrop;
    this._dragoverEventListener = dragoverEventListener;
    this._dragenterEventListener = dragenterEventListener;
    this._dragleaveEventListener = dragleaveEventListener;
    this._dropEventListener = dropEventListener;
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

  _setSectionsInLocalStorage() {
    const toDoTasks = [...document.querySelector('#toDo').querySelectorAll('.tasks__item-title')].map((item) => item.textContent);
    const inProgressTasks = [...document.querySelector('#inProgress').querySelectorAll('.tasks__item-title')].map((item) => item.textContent);
    const completedTasks = [...document.querySelector('#completed').querySelectorAll('.tasks__item-title')].map((item) => item.textContent);
    localStorage.setItem('toDo', JSON.stringify(toDoTasks));
    localStorage.setItem('inProgress', JSON.stringify(inProgressTasks));
    localStorage.setItem('completed', JSON.stringify(completedTasks));
  }

  _renderTasks() {
    this._tasksInLocalStorage.forEach((task) => this._renderer(task));
  }

  _renderTaskOnDrop() {
    this._tasksInLocalStorage.forEach((task) => this._rendererOnDrop(task));
  }

  addEventListeners() {
    window.addEventListener('load', () => {
      this._checkInLocalStorage();
      this._renderTasks();
    });
    this._dragoverEventListener(this._container);
    this._dragenterEventListener(this._container);
    this._dragleaveEventListener(this._container);
    this._dropEventListener(this._container);
  }

  setTask(task, taskText) {
    this._renderedTask.push(taskText);
    this._setInLocalStorage();
    this._container.append(task);
  }

  setTaskOnDrop(task) {
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
