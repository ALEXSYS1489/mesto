export class Card {
  constructor(
    data,
    user,
    template,
    handleCardClick,
    handleClickDelete,
    handleClickLike
  ) {
    this._data = data;
    this._user = user;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._handleClickDelete = handleClickDelete;
    this._handleClickLike = handleClickLike;
  }

  createElement() {
    this.card = this._template.cloneNode(true);
    this._elementImage = this.card.querySelector(".element__image");
    this._elementName = this.card.querySelector(".element__name");
    this._elementLikes = this.card.querySelector(".element__likes");

    this._elementName.textContent = this._name;
    this._elementImage.setAttribute("src", this._link);
    this._elementImage.setAttribute("alt", this._name);

    this._elementButtonDel = this.card.querySelector(".element__remove");
    this._elementButtonLike = this.card.querySelector(".element__like");

    this._bindDeleteHandler();
    this._bindLikeHandler();
    this._bindOpenHandler();
    this.setLikes(this._likes);

    if (this._data.owner._id === this._user._id) {
      this._elementButtonDel.classList.remove("element__remove_inactive");
    }

    if (
      this._likes.some((owner) => {
        return owner._id === this._user._id;
      })
    ) {
      this._elementButtonLike.classList.toggle("element__like_active");
    }

    return this.card;
  }

  _bindDeleteHandler() {
    this._elementButtonDel.addEventListener("click", () => {
      this._handleClickDelete(this);
    });
  }

  _bindLikeHandler() {
    this._elementButtonLike.addEventListener("click", () => {
      this._handleClickLike();
    });
  }

  _bindOpenHandler() {
    this._elementImage.addEventListener("click", this._handleCardClick);
  }

  getId() {
    return this._data._id;
  }

  removeCard() {
    this.card.remove();
    this.card = null;
  }

  getLike() {
    if (this._elementButtonLike.classList.contains("element__like_active")) {
      return true;
    } else {
      return false;
    }
  }

  setLikes(likes) {
    this._elementLikes.textContent = likes.length;
  }

  updateLikes() {
    this._elementButtonLike.classList.toggle("element__like_active");
  }
}
