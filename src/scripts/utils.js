export const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
export const blockPopupProfile = document.querySelector(".popup_type_edit");
export const formPopupProfile = blockPopupProfile.querySelector(".popup__form");

export const namePopupProfile = blockPopupProfile.querySelector(".popup__input_value_name");
export const aboutPopupProfile = blockPopupProfile.querySelector(".popup__input_value_about");
export const profileName = document.querySelector(".profile__name");
export const profileAbout = document.querySelector(".profile__about");

export const elements = document.querySelector('.elements')
export const elementTemplete = document.querySelector("#element-template").content.querySelector(".element")

export const buttonOpenPopupAdd = document.querySelector(".profile__add-button");
export const blockPopupAdd = document.querySelector(".popup_type_add");
export const formPopupAdd = blockPopupAdd.querySelector(".popup__form");

export const blockPopupImage = document.querySelector(".popup_type_image");

export const classes = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_active',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_active'
}

import aleksandrgrekov from '../images/elements/aleksandr-grekov-9OCd1cApeH4-unsplash(1).jpg';
import gillestrenson from '../images/elements/gilles-trenson-t9MP5ZyTxlI-unsplash.jpg';
import julienriedel from '../images/elements/julien-riedel-9QFd5NlZG8M-unsplash.jpg';
import kevinstaub from '../images/elements/kevin-staub-CQKbIM0OeCc-unsplash.jpg';
import sharadbhat from '../images/elements/sharad-bhat-Z4s2K8GQ5QE-unsplash.jpg';
import tingfengxia from '../images/elements/tingfeng-xia-Z96hjT7XuMM-unsplash.jpg';

export const initialCards = [
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