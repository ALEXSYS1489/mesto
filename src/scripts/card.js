export class Card {

  constructor(data, templete, handleCardClick, handleClickDelete, handleClickLike){
  this._data = data  
  this._name = data.name
  this._link = data.link
  this._likes = data.likes
  this._templete = templete
  this._handleCardClick = handleCardClick
  this._handleClickDelete = handleClickDelete
  this._handleClickLike = handleClickLike
  }

  createElement(_name, _link, _likes) {
    this.card = this._templete.cloneNode(true);
    this._elementImage = this.card.querySelector(".element__image");
    this._elementName = this.card.querySelector(".element__name");
    this._elementLikes = this.card.querySelector(".element__likes");

    this._elementName.textContent = _name;
    this._elementImage.setAttribute ('src', _link)
    this._elementImage.setAttribute ('alt', _name)

    this._elementButtonDel = this.card.querySelector(".element__remove")
    this._elementButtonLike = this.card.querySelector(".element__like")

    this._deleteElement()
    this._likeElement()
    this._openElement()
    this.getLikes(this._likes)

    if(this._data.owner._id === "0f2889fc2dee7ccf79c08c35"){
      this._elementButtonDel.classList.remove("element__remove_inactive")
    }

    if(this._likes.some((owner)=>{return owner._id === "0f2889fc2dee7ccf79c08c35"})){
      this._elementButtonLike.classList.toggle("element__like_active")
    }

    return this.card

  }

  _deleteElement(){
    this._elementButtonDel.addEventListener('click', ()=>{
      this._handleClickDelete(this)
    })
  }

  _likeElement() {
    this._elementButtonLike.addEventListener('click', ()=>{
      this._elementButtonLike.classList.toggle("element__like_active")
      this._handleClickLike()
    })
  }

  _openElement(){
    this._elementImage.addEventListener("click", this._handleCardClick);
  }

  getId(){
    return this._data._id
  }

  removeCard(){
    this.card.remove();
    this.card = null;
  }

  getLike(){
    if(this._elementButtonLike.classList.contains("element__like_active")){
      return false;
    }
    else{
      return true}
  }

  getLikes(likes){
    this._elementLikes.textContent = likes.length
  }
}
