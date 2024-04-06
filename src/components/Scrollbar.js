export default class Scrollbar {
  constructor() {
    this._sectionsScrollbar = document.querySelectorAll('.tasks__list-wrap');
    this._popupInputScrollbar = document.querySelectorAll('.popup__input');
  }

  _checkBrowser() {
    return window.navigator.userAgent.indexOf('Firefox') >= 0;
  }

  setClass() {
    if (this._checkBrowser()) {
      this._sectionsScrollbar.forEach((element) => element.classList.add('tasks__list-wrap_scrollbar_gecko'));
      this._popupInputScrollbar.forEach((element) => element.classList.add('popup__input_scrollbar_gecko'));
    } else {
      this._sectionsScrollbar.forEach((element) => element.classList.add('tasks__list-wrap_scrollbar_webkit'));
      this._popupInputScrollbar.forEach((element) => element.classList.add('popup__input_scrollbar_webkit'));
    }
  }
}
