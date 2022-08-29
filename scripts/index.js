import { Card } from "./card.js";
import {FormValidator} from "./FormValidator.js"


const editPopupOpenButton = document.querySelector(".profile__edit-button");
const editPopupBlock = document.querySelector(".popup_type_edit");
const editPopupCloseButton = editPopupBlock.querySelector(".popup__close");
const editPopupForm = editPopupBlock.querySelector(".popup__form");

const editPopupName = editPopupBlock.querySelector(".popup__input_value_name");
const editPopupAbout = editPopupBlock.querySelector(".popup__input_value_about");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const imagePopupBlock = document.querySelector(".popup_type_image");

const classes = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_active',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_active'
}

function closeListener(evt){
  if (evt.key === "Escape"){
    closePopup (editPopupBlock);
    closePopup (addPopupBlock);
    closePopup (imagePopupBlock);
  }
}

function openPopup(popup) {
  popup.classList.add("popup_is-opened")
  document.addEventListener("keydown", closeListener);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeListener);
}

function openEditPopup() {
  openPopup (editPopupBlock);
  editPopupName.value = profileName.textContent;
  editPopupAbout.value = profileAbout.textContent;
  delErrors(editPopupBlock)
  const formValidator = new FormValidator(classes, editPopupForm)
  formValidator.enableValidation()
};

function saveEditPopup (evt) {
  evt.preventDefault();
  const saveButton = editPopupBlock.querySelector(".popup__save_active");
  saveButton.classList.remove("popup__save_active");
  profileName.textContent = editPopupName.value;
  profileAbout.textContent = editPopupAbout.value;
  editPopupForm.reset()
  closePopup (editPopupBlock);
};

editPopupOpenButton.addEventListener("click", openEditPopup);
editPopupCloseButton.addEventListener("click", (event) => {
  closePopup (editPopupBlock);
});
editPopupForm.addEventListener("submit", saveEditPopup);

editPopupBlock.addEventListener("click", (event) => {
  if (event.target === event.currentTarget){
    closePopup (editPopupBlock);
  }
});

const elements = document.querySelector('.elements')
const elementTemplete = document.querySelector("#element-template").content.querySelector(".element")

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

function addElement(name, link,){
  const card = new Card (name, link, elementTemplete)
  elements.prepend(card.createElement(name, link));



  const imagePopupCloseButton = imagePopupBlock.querySelector(".popup__close");

  function openPopupImage() {

    const imagePopupImg = imagePopupBlock.querySelector(".popup__image");
    const imagePopupName = imagePopupBlock.querySelector(".popup__image-name");

    imagePopupName.textContent = name
    imagePopupImg.setAttribute ('src', link)
    imagePopupImg.setAttribute ('alt', name)

    openPopup(imagePopupBlock);
  }

  imagePopupCloseButton.addEventListener("click", (event) => {
    closePopup (imagePopupBlock);
  });

  imagePopupBlock.addEventListener("click", (event) => {
    if (event.target === event.currentTarget){
      closePopup (imagePopupBlock);
    }
  });

  const elementImage = card.card.querySelector(".element__image");

  elementImage.addEventListener("click", openPopupImage);

}



for (let i = 0; i < initialCards.length; i += 1) {
  addElement(initialCards[i].name, initialCards[i].link)
}

const addPopupOpenButton = document.querySelector(".profile__add-button");
const addPopupBlock = document.querySelector(".popup_type_add");
const addPopupCloseButton = addPopupBlock.querySelector(".popup__close");
const addPopupForm = addPopupBlock.querySelector(".popup__form");

const addPopupName = addPopupBlock.querySelector(".popup__input_value_name");
const addPopupAbout = addPopupBlock.querySelector(".popup__input_value_about");

function openAddPopup() {
  openPopup(addPopupBlock)
  addPopupForm.reset()
  delErrors(addPopupBlock)
  const formValidator = new FormValidator(classes, addPopupForm)
  formValidator.enableValidation()
};

function saveAddPopup (evt) {
  evt.preventDefault();
  addElement (addPopupName.value, addPopupAbout.value)
  addPopupForm.reset()
  const saveButton = addPopupBlock.querySelector(".popup__save_active");
  saveButton.classList.remove("popup__save_active");
  closePopup(addPopupBlock);
};

addPopupOpenButton.addEventListener("click", openAddPopup);
addPopupCloseButton.addEventListener("click", (event) => {
  closePopup (addPopupBlock);
});
addPopupForm.addEventListener("submit", saveAddPopup);

addPopupBlock.addEventListener("click", (event) => {
  if (event.target === event.currentTarget){
    closePopup (addPopupBlock);
  }
});


function delErrors (popup){
  const errors = popup.querySelectorAll(".popup__error_active");
  errors.forEach((error) => {
    error.classList.remove("popup__error_active");
  })
  const inputs = popup.querySelectorAll(".popup__input_error");
  inputs.forEach((input) => {
    input.classList.remove("popup__input_error");
  })
}


