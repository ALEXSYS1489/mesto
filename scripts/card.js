import * as data from './index.js'
export class Card {

  constructor(name, link, templete){
  this._name = name
  this._link = link
  this._templete = templete
  }

  createElement(_name, _link) {
    this.card = this._templete.cloneNode(true);
    this._elementImage = this.card.querySelector(".element__image");
    this._elementName = this.card.querySelector(".element__name");

    this._elementName.textContent = _name;
    this._elementImage.setAttribute ('src', _link)
    this._elementImage.setAttribute ('alt', _name)

    this._elementButtonDel = this.card.querySelector(".element__remove")
    this._elementButtonLike = this.card.querySelector(".element__like")

    this._deleteElement()
    this._likeElement()
    this._openElement()

    return this.card

  }

  _deleteElement(){
    this._elementButtonDel.addEventListener('click', ()=>{
      this.card.remove();
      this.card = null;
    })
  }

  _likeElement() {
    this._elementButtonLike.addEventListener('click', ()=>{
      this._elementButtonLike.classList.toggle("element__like_active")})
  }

  _openPopupImage =()=>{

    data.namePopupImage.textContent = this._name
    data.imagePopupImage.setAttribute ('src', this._link)
    data.imagePopupImage.setAttribute ('alt', this._name)

    data.openPopup(data.blockPopupImage);
  }

  _openElement(){
    this._elementImage.addEventListener("click", this._openPopupImage);
  }
}
