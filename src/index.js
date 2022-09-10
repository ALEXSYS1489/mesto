import './pages/index.css'
import { Card } from "./scripts/card.js";
import {FormValidator} from "./scripts/FormValidator.js"
import { Section } from "./scripts/Section.js";
import { PopupWithImage } from "./scripts/PopupWithImage.js";
import { PopupWithForm } from "./scripts/PopupWithForm.js";
import { UserInfo } from "./scripts/UserInfo.js";

const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const blockPopupProfile = document.querySelector(".popup_type_edit");
const formPopupProfile = blockPopupProfile.querySelector(".popup__form");

const namePopupProfile = blockPopupProfile.querySelector(".popup__input_value_name");
const aboutPopupProfile = blockPopupProfile.querySelector(".popup__input_value_about");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const elements = document.querySelector('.elements')
const elementTemplete = document.querySelector("#element-template").content.querySelector(".element")

const buttonOpenPopupAdd = document.querySelector(".profile__add-button");
const blockPopupAdd = document.querySelector(".popup_type_add");
const formPopupAdd = blockPopupAdd.querySelector(".popup__form");

const blockPopupImage = document.querySelector(".popup_type_image");

const classes = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_active',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_active'
}

import aleksandrgrekov from './images/elements/aleksandr-grekov-9OCd1cApeH4-unsplash(1).jpg';
import gillestrenson from './images/elements/gilles-trenson-t9MP5ZyTxlI-unsplash.jpg';
import julienriedel from './images/elements/julien-riedel-9QFd5NlZG8M-unsplash.jpg';
import kevinstaub from './images/elements/kevin-staub-CQKbIM0OeCc-unsplash.jpg';
import sharadbhat from './images/elements/sharad-bhat-Z4s2K8GQ5QE-unsplash.jpg';
import tingfengxia from './images/elements/tingfeng-xia-Z96hjT7XuMM-unsplash.jpg';

const initialCards = [
  {
    name: 'Водопад',
    link: aleksandrgrekov
  },
  {
    name: 'Скала',
    link: gillestrenson
  },
  {
    name: 'Часовня',
    link: julienriedel
  },
  {
    name: 'Лес',
    link: kevinstaub
  },
  {
    name: 'Туман',
    link: sharadbhat
  },
  {
    name: 'Берег',
    link: tingfengxia
  }
];

const addValidator = new FormValidator(classes, formPopupAdd)
const profileValidator = new FormValidator(classes, formPopupProfile)

const section = new Section({
  items: initialCards,
  renderer: (element)=>{
    const card = addElement(element.name, element.link)
    section.addItem(card)
  }
},
elements
)

function openEditPopup() {
  namePopupProfile.value = profileName.textContent;
  aboutPopupProfile.value = profileAbout.textContent;
  profileValidator.deleteErrors()
  const popup = new PopupWithForm (blockPopupProfile, (evt)=>{
    evt.preventDefault();
    popup.getInputValues()
    const user = new UserInfo({userName: profileName, userAbout: profileAbout})
    user.setUserInfo(popup.values.name, popup.values.about)
    popup.close()
    profileValidator.toggleButtonState()
  })
  popup.open()
  popup.setEventListeners()
};

function addElement(name, link,){
  const card = new Card (name, link, elementTemplete, ()=>{
    const image = new PopupWithImage(blockPopupImage)
    image.open(name, link)
    image.setEventListeners()
    })
  const element = card.createElement(name, link)

  return element
}

function openAddPopup() {
  addValidator.deleteErrors()
  const popup = new PopupWithForm (blockPopupAdd, (evt)=>{
    evt.preventDefault();
    popup.getInputValues()
    elements.prepend (addElement (popup.values.name, popup.values.about))
    popup.close()
    profileValidator.toggleButtonState()
  })
  popup.open()
  popup.setEventListeners()
};

buttonOpenPopupAdd.addEventListener("click", openAddPopup);

buttonOpenPopupProfile.addEventListener("click", openEditPopup);

addValidator.enableValidation()
profileValidator.enableValidation()
section.renderItems()
