export class Popup {
  constructor(popapSelector) {
this._popapSelector = popapSelector
this._buttonClosePopup = this._popapSelector.querySelector(".popup__close");
  }

  open() {
    this._popapSelector.classList.add("popup_is-opened")
  }

  close(){
    this._popapSelector.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape"){
      this.close(this._popapSelector);
    }
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

  }
}
