import Popup from './Popup';

export default class PopupAddTask extends Popup {
  constructor({ handleSubmit }, popupElement) {
    super(popupElement);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.popup__form');
  }

  _submitForm(e) {
    e.preventDefault();
    this._handleSubmit(e.target.querySelector('.popup__input').value);
  }

  _addEventListeners() {
    super._addEventListeners();
    this._clickSubmit = this._submitForm.bind(this);
    this._popup.addEventListener('submit', this._clickSubmit);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._popup.removeEventListener('submit', this._clickSubmit);
  }

  close() {
    super.close();
    this._form.reset();
  }
}
