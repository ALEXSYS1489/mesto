import './pages/index.css'
import * as utils from "./scripts/utils.js";
import { Card } from "./scripts/card.js";
import {FormValidator} from "./scripts/FormValidator.js"
import { Section } from "./scripts/Section.js";
import { PopupWithImage } from "./scripts/PopupWithImage.js";
import { PopupWithForm } from "./scripts/PopupWithForm.js";
import { UserInfo } from "./scripts/UserInfo.js";


const addValidator = new FormValidator(utils.classes, utils.formPopupAdd)
const profileValidator = new FormValidator(utils.classes, utils.formPopupProfile)

const section = new Section({
  items: utils.initialCards,
  renderer: (element)=>{
    const card = addElement(element.name, element.link)
    section.addItem(card)
  }
},
utils.elements
)

const user = new UserInfo({userName: utils.profileName, userAbout: utils.profileAbout})

const blockPopupProfileWithForm  = new PopupWithForm (utils.blockPopupProfile, ()=>{
  user.setUserInfo(blockPopupProfileWithForm.values.name, blockPopupProfileWithForm.values.about)
  profileValidator.toggleButtonState()
})

const blockPopupAddWithForm  = new PopupWithForm (utils.blockPopupAdd, ()=>{
  utils.elements.prepend (addElement (blockPopupAddWithForm.values.name, blockPopupAddWithForm.values.about))
  profileValidator.toggleButtonState()
})

const image = new PopupWithImage(utils.blockPopupImage)

function openEditPopup() {
  utils.namePopupProfile.value = utils.profileName.textContent;
  utils.aboutPopupProfile.value = utils.profileAbout.textContent;
  profileValidator.deleteErrors()
  blockPopupProfileWithForm.open()
};

function addElement(name, link,){
  const card = new Card (name, link, utils.elementTemplete, ()=>{
    image.open(name, link)
    image.setEventListeners()
    })
  const element = card.createElement(name, link)

  return element
}

function openAddPopup() {
  addValidator.deleteErrors()
  addValidator.toggleButtonState()
  blockPopupAddWithForm.open()
};

utils.buttonOpenPopupAdd.addEventListener("click", openAddPopup);

utils.buttonOpenPopupProfile.addEventListener("click", openEditPopup);

addValidator.enableValidation()
profileValidator.enableValidation()
section.renderItems()
blockPopupProfileWithForm.setEventListeners()
blockPopupAddWithForm.setEventListeners()
