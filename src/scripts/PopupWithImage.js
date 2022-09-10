import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popapSelector){
  super(popapSelector)
  this._name = this._popapSelector.querySelector(".popup__image-name");
  this._image = this._popapSelector.querySelector(".popup__image");
  }

  open(cardName, cardImage){
    this._name.textContent = cardName
    this._image.setAttribute ('src', cardImage)
    this._image.setAttribute ('alt', cardName)
    this._popapSelector.classList.add("popup_is-opened")

  }
}
