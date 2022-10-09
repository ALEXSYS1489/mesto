export class Popup {
  constructor(popup) {
    this._popup = popup;
    this._buttonClosePopup = this._popup.querySelector(".popup__close");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._buttonClosePopup.addEventListener("click", (event) => {
      this.close(this._popup);
    });

    this._popup.addEventListener("click", (event) => {
      if (event.target === event.currentTarget) {
        this.close(this._popup);
      }
    });
  }
}
