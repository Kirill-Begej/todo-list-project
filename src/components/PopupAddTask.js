import Popup from './Popup';

export default class PopupAddTask extends Popup {
  constructor({ handleSubmit }, popupElement) {
    super({ handleSubmit }, popupElement);
  }

  _handleEscOrEnter(e) {
    if (e.key === 'Escape') {
      this.close();
    } else if (e.key === 'Enter') {
      this._handleSubmit(e.target.value);
    }
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

  close() {
    super.close();
    this._form.reset();
  }
}
