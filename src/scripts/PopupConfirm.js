import { Popup } from "./Popup.js";

export class PopupConfirm extends Popup {
    constructor(popap, callback) {
    super(popap)
    this._callback = callback
    this._confirmButtom = this._popap.querySelector(".popup__confirm");
    }

    setEventListeners(){
        super.setEventListeners();
        this._confirmButtom.addEventListener("click", (event) => {
          this._callback(this.element)
        });
    
      }

      getElement(element){
        this.element = element
      }
}