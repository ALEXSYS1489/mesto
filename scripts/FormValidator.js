export class FormValidator {

  constructor(classes, form) {
    this._classes = classes
    this._form = form
    this._inputList = Array.from(this._form.querySelectorAll(this._classes.inputSelector))
    this._buttonElement = this._form.querySelector(this._classes.submitButtonSelector);
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

  setEventListeners = () => {
    this._toggleButtonState (this._inputList, this._buttonElement)
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', ()=> {
        this._checkInputValidity(this._form, inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement)
      });
    });
    return this._buttonElement
  };

  enableValidation = () => {
    this.setEventListeners ()
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

  deleteErrors (){
    this._inputList.forEach((inputElement) => {
    this._hideInputError(this._form, inputElement)
    })
  }

}
