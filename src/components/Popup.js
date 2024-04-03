export default class Popup {
  constructor(element) {
    this._popup = element;
    this._closeButton = this._popup.querySelector('.popup__button-close');
  }

  _handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      this.close();
    }
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  _addEventListeners() {
    this._closeButton.addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('mousedown', this._handleOverlayClick.bind(this));
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  _removeEventListeners() {
    this._closeButton.removeEventListener('click', this.close.bind(this));
    this._popup.removeEventListener('mousedown', this._handleOverlayClick.bind(this));
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._addEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._removeEventListeners();
  }
}
