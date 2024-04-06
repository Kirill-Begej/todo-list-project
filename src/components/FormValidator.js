export default class FormValidator {
  constructor(
    {
      formSelector,
      inputSelector,
      inputErrorClass,
      errorClass,
      inactiveButtonClass,
    },
    formElement,
  ) {
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._inactiveButtonClass = inactiveButtonClass;
    this._formElement = formElement;
    this._input = formElement.querySelector(inputSelector);
    this._buttonSave = formElement.elements.popupSave;
  }

  _selectionErrorMessage(formInput) {
    if (formInput.value.length === 0) {
      return 'Введите название задачи.';
    } else if (formInput.value.length >= 1 && formInput.value.length < formInput.getAttribute('minlength')) {
      return `Минимальное количество символов: ${formInput.getAttribute('minlength')}. Длина текста сейчас: ${formInput.value.length} символ.`;
    }
  }

  _selectionError(formInput) {
    this._inputError = this._formElement.querySelector('.popup__input-error');
    this._inputMessage = this._selectionErrorMessage(formInput);
  }

  _showInputError(element) {
    element.classList.add(this._inputErrorClass);
    this._inputError.textContent = this._inputMessage;
    this._inputError.classList.add(this._errorClass);
  }

  _hideInputError(element) {
    element.classList.remove(this._inputErrorClass);
    if (this._inputError) {
      this._inputError.textContent = '';
      this._inputError.classList.remove(this._errorClass);
    }
  }

  _isValid(formInput) {
    if (!formInput.validity.valid) {
      this._showInputError(formInput);
    } else {
      this._hideInputError(formInput);
    }
  }

  _hasInvalidInput() {
    let invalidInput;
    if (!this._input.validity.valid) {
      invalidInput = true;
    }
    return invalidInput;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonSave.disabled = true;
      this._buttonSave.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonSave.disabled = false;
      this._buttonSave.classList.remove(this._inactiveButtonClass);
    }
  }

  _setEventListener() {
    this._input.addEventListener('input', (e) => {
      this._selectionError(e.target);
      this._isValid(e.target);
      this._toggleButtonState();
    });
  }

  enableValidation() {
    this._setEventListener();
  }

  resetValidation() {
    this._hideInputError(this._input);
    this._toggleButtonState();
  }
}
