import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popapSelector, callback) {
  super(popapSelector)
  this._callback = callback
  this._form = this._popapSelector.querySelector(".popup__form");
  this._name = this._popapSelector.querySelector(".popup__input_value_name");
  this._about = this._popapSelector.querySelector(".popup__input_value_about");
  }

  getInputValues(){
  this.values = {name: this._name.value, about:this._about.value}
  return this.values
  }

  setEventListeners = () => {
    document.addEventListener("keydown", this._handleEscClose);

    this._buttonClosePopup.addEventListener("click", (event) => {
      this.close (this._popapSelector);
    });

    this._popapSelector.addEventListener("click", (event) => {
      if (event.target === event.currentTarget){
        this.close (this._popapSelector);
      }
    });

    this._form.addEventListener("submit", this._callback);
  }

  close(){
    this._popapSelector.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this._form.removeEventListener("submit", this._callback);
    this._form.reset()
  }
}
