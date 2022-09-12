import * as utils from "../scripts/utils.js";
import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popap, callback) {
  super(popap)
  this._callback = callback
  this._form = this._popap.querySelector(".popup__form");
  this.inputs = this._form.querySelectorAll(".popup__input");
  }

  _getInputValues(){
  this.values = {name: this.inputs[0].value, about: this.inputs[1].value}
  return this.values
  }

  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener("submit", this._submit.bind(this));
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
    
  }
}
