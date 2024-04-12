import Popup from './Popup';

export default class PopupEditTask extends Popup {
  constructor({ handleSubmit }, popupElement) {
    super({ handleSubmit }, popupElement);
  }

  _submitForm(e) {
    e.preventDefault();
    this._handleSubmit(e.target.querySelector('.popup__input').value, this._parentElement);
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

  open(taskText, parentElement) {
    super.open();
    this._parentElement = parentElement;
    this._form.querySelector('.popup__input').value = taskText;
  }
}
