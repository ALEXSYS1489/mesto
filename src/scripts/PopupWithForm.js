import * as utils from "../scripts/utils.js";
import * as index from "../index.js";
import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popap, callback) {
  super(popap)
  this._callback = callback
  this._form = this._popap.querySelector(".popup__form");
  this.inputs = this._form.querySelectorAll(".popup__input");
  this._submit = this._submit.bind(this)
  }

  _getInputValues(){
  this._values = {}
  this.inputs.forEach((input)=>{
    this._values[input.name] = input.value
  })
  return this._values
  }

  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener("submit", this._submit);
  }

  close(){
    super.close();
    this._form.reset();
  }

  _submit(evt){
    evt.preventDefault();
    this._getInputValues()
    this._callback()
    this.close()
    index.profileValidator.toggleButtonState()
    index.addValidator.toggleButtonState()
  }

  editProfile() {
    index.user.setUserInfo(this._values.name, this._values.about)
  }

  addCard() {
    utils.elements.prepend (index.addElement (this._values.name, this._values.link))
  }
}