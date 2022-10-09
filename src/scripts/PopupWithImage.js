import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._name = this._popup.querySelector(".popup__image-name");
    this._image = this._popup.querySelector(".popup__image");
  }

  open(cardName, cardImage) {
    this._name.textContent = cardName;
    this._image.setAttribute("src", cardImage);
    this._image.setAttribute("alt", cardName);
    super.open();
  }
}
