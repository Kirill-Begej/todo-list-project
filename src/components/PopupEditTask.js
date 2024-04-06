import Popup from './Popup';

export default class PopupEditTask extends Popup {
  constructor({ handleSubmit }, popupElement) {
    super({ handleSubmit }, popupElement);
  }

  _handleEscOrEnter(e) {
    if (e.key === 'Escape') {
      this.close();
    } else if (e.key === 'Enter') {
      this._handleSubmit(e.target.value, this._parentElement);
    }
  }

  _submitForm(e) {
    e.preventDefault();
    this._handleSubmit(e.target.querySelector('.popup__input').value, this._parentElement);
  }

  _addEventListeners() {
    super._addEventListeners();
    this._clickEscOrEnter = this._handleEscOrEnter.bind(this);
    document.addEventListener('keydown', this._clickEscOrEnter);
    this._clickSubmit = this._submitForm.bind(this);
    this._popup.addEventListener('submit', this._clickSubmit);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    document.removeEventListener('keydown', this._clickEscOrEnter);
    this._popup.removeEventListener('submit', this._clickSubmit);
  }

  open(taskText, parentElement) {
    super.open();
    this._parentElement = parentElement;
    this._form.querySelector('.popup__input').value = taskText;
  }
}
