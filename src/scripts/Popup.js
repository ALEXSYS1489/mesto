export class Popup {
  constructor(popap) {
this._popap = popap
this._buttonClosePopup = this._popap.querySelector(".popup__close");
  }

  open(){
    this._popap.classList.add("popup_is-opened")
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  close(){
    this._popap.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt){
    if (evt.key === "Escape"){
      this.close(this._popap);
    }
  }

  setEventListeners(){

    this._buttonClosePopup.addEventListener("click", (event) => {
      this.close (this._popap);
    });

    this._popap.addEventListener("click", (event) => {
      if (event.target === event.currentTarget){
        this.close (this._popap);
      }
    });

  }
}

