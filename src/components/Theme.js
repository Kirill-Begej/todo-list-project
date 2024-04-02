export default class Theme {
  constructor({ setTheme, checkTheme }, button) {
    this._button = button;
    this._setTheme = setTheme;
    this._checkTheme = checkTheme;
  }

  _themeInLocalStorage() {
    this._theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : false;
  }

  _setEventListeners() {
    this._button.addEventListener('click', (e) => {
      this._setTheme(e.target);
    });
  }

  enableTheme() {
    this._themeInLocalStorage();
    this._setEventListeners();
    this._checkTheme(this._theme);
  }
}
