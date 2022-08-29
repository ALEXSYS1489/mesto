export class FormValidator {

  constructor(classes, form) {
    this._classes = classes
    this._form = form
  }

  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.id}`);
    inputElement.classList.add(this._classes.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._classes.errorClass);
    };

  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.id}`);
    inputElement.classList.remove(this._classes.inputErrorClass);
    errorElement.classList.remove(this._classes.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  _setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(this._classes.inputSelector));
    const buttonElement = formElement.querySelector(this._classes.submitButtonSelector);
    this._toggleButtonState (inputList, buttonElement)
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', ()=> {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement)
      });
    });
    return buttonElement
  };

  enableValidation = () => {
    this._setEventListeners (this._form)
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _toggleButtonState (inputList, buttonElement){
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', 'disabled');
      buttonElement.classList.remove(this._classes.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.add(this._classes.inactiveButtonClass);
    }
  };
}
