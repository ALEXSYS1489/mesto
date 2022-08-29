export class Card {

  constructor(name, link, templete){
  this._name = name
  this._link = link
  this._templete = templete
  }

  createElement(_name, _link) {
    this.card = this._templete.cloneNode(true);
    const elementImage = this.card.querySelector(".element__image");
    const elementName = this.card.querySelector(".element__name");

    elementName.textContent = _name;
    elementImage.setAttribute ('src', _link)
    elementImage.setAttribute ('alt', _name)

    const elementButtonDel = this.card.querySelector(".element__remove")
    elementButtonDel.addEventListener('click', ()=>{
      this.card.remove();
    })

    const elementButtonLike = this.card.querySelector(".element__like")

    function _like() {
      elementButtonLike.classList.toggle("element__like_active")
    }

    elementButtonLike.addEventListener('click', _like)

    return this.card

  }

}
