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

  _setEventListeners = () => {
    this.toggleButtonState ()
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', ()=> {
        this._checkInputValidity(this._form, inputElement);
        this.toggleButtonState(this._inputList, this._buttonElement)
      });
    });
    return this._buttonElement
  };

  enableValidation = () => {
    this._setEventListeners ()
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  toggleButtonState (){
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute('disabled', 'disabled');
      this._buttonElement.classList.remove(this._classes.inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.add(this._classes.inactiveButtonClass);
    }
  };

  deleteErrors (){
    this._inputList.forEach((inputElement) => {
    this._hideInputError(this._form, inputElement)
    })
  }

}
