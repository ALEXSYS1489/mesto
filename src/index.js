import './pages/index.css'
import * as utils from "./scripts/utils.js";
import { Card } from "./scripts/card.js";
import {FormValidator} from "./scripts/FormValidator.js"
import { Section } from "./scripts/Section.js";
import { PopupWithImage } from "./scripts/PopupWithImage.js";
import { PopupWithForm } from "./scripts/PopupWithForm.js";
import { PopupConfirm } from './scripts/PopupConfirm.js';
import { UserInfo } from "./scripts/UserInfo.js";
import { Api } from "./scripts/api.js";

const api = new Api (utils.conf)
const addValidator = new FormValidator(utils.classes, utils.formPopupAdd)
const profileValidator = new FormValidator(utils.classes, utils.formPopupProfile)
const avatarValidator = new FormValidator(utils.classes, utils.formPopupAvatar)

export const user = new UserInfo({userName: utils.profileName, userAbout: utils.profileAbout})

const blockPopupProfileWithForm  = new PopupWithForm (utils.blockPopupProfile, (values)=>{

  blockPopupProfileWithForm.buttonSave.textContent = "Сохранение..."
  user.setUserInfo(values.name, values.about)
  blockPopupProfileWithForm.close()
  profileValidator.toggleButtonState()

api.editUser(values.name, values.about)
  .catch((err)=>{
    console.log('Ошибка', err )
  })
  .finally(()=>{
    blockPopupProfileWithForm.buttonSave.textContent = "Сохраненить"
  })

})

const blockPopupAddWithForm  = new PopupWithForm (utils.blockPopupAdd, (values)=>{

blockPopupAddWithForm.buttonSave.textContent = "Сохранение..."
api.addCard(values.name, values.link)
.then((data)=>{
  utils.elements.prepend (addElement (data))
  blockPopupAddWithForm.close()
  addValidator.toggleButtonState()
})
.catch((err)=>{
  console.log('Ошибка', err )
})
.finally(()=>{
  blockPopupAddWithForm.buttonSave.textContent = "Сохраненить"
})

})

const blockPopupEditAvarar = new PopupWithForm (utils.blockPopupAvatar, (values)=>{

  blockPopupEditAvarar.buttonSave.textContent = "Сохранение..."
  api.editAvatar(values.avatar)
  .then((data)=>{
    utils.imageAvatar.setAttribute ('src', data.avatar)
    blockPopupEditAvarar.close()
    avatarValidator.toggleButtonState()
  })
  .catch((err)=>{
    console.log('Ошибка', err )
  })
  .finally(()=>{
    blockPopupEditAvarar.buttonSave.textContent = "Сохраненить"
  })
  
  })

const image = new PopupWithImage(utils.blockPopupImage)

const popupConfirm = new PopupConfirm (utils.blockPopupConfirm,(element)=>{
  console.log(123)
  api.deleteCard(element.getId())
  .then(()=>{
    element.removeCard()
    popupConfirm.close()
  })
  .catch((err)=>{
    console.log('Ошибка', err )
  })
})



function openEditPopup() {
  user.getUserInfo()
  utils.namePopupProfile.value = user.info.name;
  utils.aboutPopupProfile.value = user.info.about;
  profileValidator.deleteErrors()
  blockPopupProfileWithForm.open()
};

function addElement(data){
  const card = new Card (data, utils.elementTemplete,
    
    ()=>{
      image.open(data.name, data.link)
    },

    (element)=>{
      popupConfirm.open()
      popupConfirm.getElement(element)
    },
    
    ()=>{
      if(card.getLike()){
        api.deleteLike(card.getId())
        .then((data)=>{card.getLikes(data.likes)})
      }
      else{
        api.addLike(card.getId())
        .then((data)=>{card.getLikes(data.likes)})
      }
    }
    )


  const element = card.createElement(data.name, data.link)

  return element
}

function openAddPopup() {
  addValidator.deleteErrors()
  addValidator.toggleButtonState()
  blockPopupAddWithForm.open()
};

function openEditAvatarPopup() {
  avatarValidator.deleteErrors()
  blockPopupEditAvarar.open()
};



utils.buttonOpenPopupAdd.addEventListener("click", openAddPopup);
utils.buttonOpenPopupProfile.addEventListener("click", openEditPopup);
utils.buttonOpenPopupAvatar.addEventListener("click", openEditAvatarPopup);

addValidator.enableValidation()
profileValidator.enableValidation()
blockPopupProfileWithForm.setEventListeners()
blockPopupAddWithForm.setEventListeners()
image.setEventListeners()
popupConfirm.setEventListeners()
avatarValidator.enableValidation()
blockPopupEditAvarar.setEventListeners()




api.getUser()
  .then((data)=>{
    user.setUserInfo(data.name, data.about)
    utils.imageAvatar.setAttribute ('src', data.avatar)
  })
  .catch((err)=>{
    console.log('Ошибка', err )
  })


api.getAllCards()
  .then ((data)=>{
    const section = new Section({
      items: data,
      renderer: (element)=>{
        const card = addElement(element)
        section.addItem(card)
        }
      },
      utils.elements
    )
  
    section.renderItems()
})
  .catch((err)=>{
    console.log('Ошибка', err )
  })

