import Popup from './Popup';

export default class PopupAddTask extends Popup {
  constructor({ handleSubmit }, popupElement) {
    super({ handleSubmit }, popupElement);
  }

  // _addEventListeners() {
  //   super._addEventListeners();
  //   this._clickSubmit = this._submitForm.bind(this);
  //   this._popup.addEventListener('submit', this._clickSubmit);
  // }

  // _removeEventListeners() {
  //   super._removeEventListeners();
  //   this._popup.removeEventListener('submit', this._clickSubmit);
  // }

  close() {
    super.close();
    this._form.reset();
  }
}
