import { Card } from "./card.js";
import {FormValidator} from "./FormValidator.js"

const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const blockPopupProfile = document.querySelector(".popup_type_edit");
const buttonClosePopupProfile = blockPopupProfile.querySelector(".popup__close");
const formPopupProfile = blockPopupProfile.querySelector(".popup__form");

const namePopupProfile = blockPopupProfile.querySelector(".popup__input_value_name");
const aboutPopupProfile = blockPopupProfile.querySelector(".popup__input_value_about");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const elements = document.querySelector('.elements')
const elementTemplete = document.querySelector("#element-template").content.querySelector(".element")

const buttonOpenPopupAdd = document.querySelector(".profile__add-button");
const blockPopupAdd = document.querySelector(".popup_type_add");
const buttonClosePopupAdd = blockPopupAdd.querySelector(".popup__close");
const formPopupAdd = blockPopupAdd.querySelector(".popup__form");

const addName = blockPopupAdd.querySelector(".popup__input_value_name");
const addAbout = blockPopupAdd.querySelector(".popup__input_value_about");

export const blockPopupImage = document.querySelector(".popup_type_image");
export const imagePopupImage = blockPopupImage.querySelector(".popup__image");
export const namePopupImage = blockPopupImage.querySelector(".popup__image-name");
const buttonClosePopupImage = blockPopupImage.querySelector(".popup__close");

const classes = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_active',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_active'
}

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

const addValidator = new FormValidator(classes, formPopupAdd)
const profileValidator = new FormValidator(classes, formPopupProfile)

function closeListener(evt){
  if (evt.key === "Escape"){
    closePopup (document.querySelector(".popup_is-opened"));
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_is-opened")
  document.addEventListener("keydown", closeListener);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeListener);
}

function openEditPopup() {
  namePopupProfile.value = profileName.textContent;
  aboutPopupProfile.value = profileAbout.textContent;
  profileValidator.deleteErrors()
  openPopup (blockPopupProfile);
};

function saveEditPopup (evt) {
  evt.preventDefault();
  profileName.textContent = namePopupProfile.value;
  profileAbout.textContent = aboutPopupProfile.value;
  closePopup (blockPopupProfile);
  formPopupProfile.reset()
  profileValidator.toggleButtonState()
};

function addElement(name, link,){
  const card = new Card (name, link, elementTemplete)
  const element = card.createElement(name, link)

  return element
}

function openAddPopup() {
  formPopupAdd.reset()
  addValidator.deleteErrors()
  openPopup(blockPopupAdd)
};

function saveAddPopup (evt) {
  evt.preventDefault();
  elements.prepend (addElement (addName.value, addAbout.value))
  closePopup(blockPopupAdd);
  formPopupAdd.reset()
  addValidator.toggleButtonState()
};

buttonOpenPopupAdd.addEventListener("click", openAddPopup);

buttonClosePopupAdd.addEventListener("click", (event) => {
  closePopup (blockPopupAdd);
});
formPopupAdd.addEventListener("submit", saveAddPopup);

blockPopupAdd.addEventListener("click", (event) => {
  if (event.target === event.currentTarget){
    closePopup (blockPopupAdd);
  }
});

buttonOpenPopupProfile.addEventListener("click", openEditPopup);

buttonClosePopupProfile.addEventListener("click", (event) => {
  closePopup (blockPopupProfile);
});
formPopupProfile.addEventListener("submit", saveEditPopup);

blockPopupProfile.addEventListener("click", (event) => {
  if (event.target === event.currentTarget){
    closePopup (blockPopupProfile);
  }
});

buttonClosePopupImage.addEventListener("click", (event) => {
  closePopup (blockPopupImage);
});

blockPopupImage.addEventListener("click", (event) => {
  if (event.target === event.currentTarget){
    closePopup (blockPopupImage);
  }
});

for (let i = 0; i < initialCards.length; i += 1) {
  elements.prepend(addElement(initialCards[i].name, initialCards[i].link))
}

addValidator.enableValidation()
profileValidator.enableValidation()
