export default class Popup {
  constructor({ handleSubmit }, popupElement) {
    this._popup = popupElement;
    this._closeButton = this._popup.querySelector('.popup__button-close');
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.popup__form');
  }

  _handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      this.close();
    }
  }

  _submitForm(e) {
    e.preventDefault();
    this._handleSubmit(e.target.querySelector('.popup__input').value);
  }

  _addEventListeners() {
    this._clickCloseButton = this.close.bind(this);
    this._closeButton.addEventListener('click', this._clickCloseButton);
    this._clickOverlay = this._handleOverlayClick.bind(this);
    this._popup.addEventListener('mousedown', this._clickOverlay);
  }

  _removeEventListeners() {
    this._closeButton.removeEventListener('click', this._clickCloseButton);
    this._popup.removeEventListener('mousedown', this._clickOverlay);
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
