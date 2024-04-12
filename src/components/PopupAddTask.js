import Popup from './Popup';

export default class PopupAddTask extends Popup {
  constructor({ handleSubmit }, popupElement) {
    super({ handleSubmit }, popupElement);
  }

  close() {
    super.close();
    this._form.reset();
  }
}
