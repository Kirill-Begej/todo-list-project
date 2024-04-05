export default class Popup {
  constructor(popupElement) {
    this._popup = popupElement;
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
    this._clickCloseButton = this.close.bind(this);
    this._closeButton.addEventListener('click', this._clickCloseButton);
    this._clickOverlay = this._handleOverlayClick.bind(this);
    this._popup.addEventListener('mousedown', this._clickOverlay);
    this._clickEsc = this._handleEscClose.bind(this);
    document.addEventListener('keydown', this._clickEsc);
  }

  _removeEventListeners() {
    this._closeButton.removeEventListener('click', this._clickCloseButton);
    this._popup.removeEventListener('mousedown', this._clickOverlay);
    document.removeEventListener('keydown', this._clickEsc);
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
