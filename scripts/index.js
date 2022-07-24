const editPopupOpenButton = document.querySelector(".profile__edit-button");
const editPopupBlock = document.querySelector(".popup_type_edit");
const editPopupClose = editPopupBlock.querySelector(".popup__close");
const editPopupSave = editPopupBlock.querySelector(".popup__form");

let editPopupName = editPopupBlock.querySelector(".popup__input_value_name");
let editPopupAbout = editPopupBlock.querySelector(".popup__input_value_about");
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");

function openEditPopup() {
  editPopupBlock.classList.add("popup_is-opened");
  editPopupName.value = profileName.textContent;
  editPopupAbout.value = profileAbout.textContent;
};

function closeEditPopup () {
  editPopupBlock.classList.remove("popup_is-opened");
}

function saveEditPopup (evt) {
  evt.preventDefault();
  profileName.textContent = editPopupName.value;
  profileAbout.textContent = editPopupAbout.value;
  closeEditPopup();
};

editPopupOpenButton.addEventListener("click", openEditPopup);
editPopupClose.addEventListener("click", closeEditPopup);
editPopupSave.addEventListener("submit", saveEditPopup);

const elements = document.querySelector('.elements')
const templete = document.querySelector("#element-template").content.querySelector(".element")

const initialCards = [
  {
    name: 'Водопад',
    link: "./images/elements/aleksandr-grekov-9OCd1cApeH4-unsplash(1).jpg"
  },
  {
    name: 'Скала',
    link: "./images/elements/gilles-trenson-t9MP5ZyTxlI-unsplash.jpg"
  },
  {
    name: 'Часовня',
    link: "./images/elements/julien-riedel-9QFd5NlZG8M-unsplash.jpg"
  },
  {
    name: 'Лес',
    link: "./images/elements/kevin-staub-CQKbIM0OeCc-unsplash.jpg"
  },
  {
    name: 'Туман',
    link: "./images/elements/sharad-bhat-Z4s2K8GQ5QE-unsplash.jpg"
  },
  {
    name: 'Берег',
    link: "./images/elements/tingfeng-xia-Z96hjT7XuMM-unsplash.jpg"
  }
];

const initialCardsNames = initialCards.map(function (el) {
  return el.name;
})
const initialCardsLinks = initialCards.map(function (el) {
  return el.link;
})

function createElement(name, link) {
  const element = templete.cloneNode(true);
  const elementImage = element.querySelector(".element__image");
  const elementName = element.querySelector(".element__name");

  elementName.textContent = name;
  elementImage.setAttribute ('src', link)
  elementImage.setAttribute ('alt', name)

  const elementButtonDel = element.querySelector(".element__remove")
  elementButtonDel.addEventListener('click', function(){
    element.remove();})

  function openPopupImage() {
    const imagePopupBlock = document.querySelector(".popup_type_image");
    const imagePopupClose = imagePopupBlock.querySelector(".popup__close");

    let imagePopupImg = imagePopupBlock.querySelector(".popup__image");
    let imagePopupName = imagePopupBlock.querySelector(".popup__image-name");

    imagePopupName.textContent = name
    imagePopupImg.setAttribute ('src', link)
    imagePopupImg.setAttribute ('alt', name)

    imagePopupBlock.classList.add("popup_is-opened");

    function closePopupImage () {
      imagePopupBlock.classList.remove("popup_is-opened");
    }

    imagePopupClose.addEventListener("click", closePopupImage);

  }

  elementImage.addEventListener("click", openPopupImage);

  elements.prepend(element);

  const elementButtonLike = element.querySelector(".element__like")
  function like() {
    elementButtonLike.classList.toggle("element__like_active")
  }

  elementButtonLike.addEventListener('click', like)

}

for (let i = 0; i < initialCards.length; i += 1) {
 createElement(initialCards[i].name, initialCards[i].link)
}

const addPopupOpenButton = document.querySelector(".profile__add-button");
const addPopupBlock = document.querySelector(".popup_type_add");
const addPopupClose = addPopupBlock.querySelector(".popup__close");
const addPopupSave = addPopupBlock.querySelector(".popup__form");

let addPopupName = addPopupBlock.querySelector(".popup__input_value_name");
let addPopupAbout = addPopupBlock.querySelector(".popup__input_value_about");

function openAddPopup() {
  addPopupBlock.classList.add("popup_is-opened");
  addPopupName.value = ''
  addPopupAbout.value =''
};

function closeAddPopup () {
  addPopupBlock.classList.remove("popup_is-opened");
}

function saveAddPopup (evt) {
  evt.preventDefault();
  createElement(addPopupName.value, addPopupAbout.value)
  closeAddPopup();
};

addPopupOpenButton.addEventListener("click", openAddPopup);
addPopupClose.addEventListener("click", closeAddPopup);
addPopupSave.addEventListener("submit", saveAddPopup);

