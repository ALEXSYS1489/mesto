import './pages/index.css'
import * as utils from "./scripts/utils.js";
import { Card } from "./scripts/Card.js";
import {FormValidator} from "./scripts/FormValidator.js"
import { Section } from "./scripts/Section.js";
import { PopupWithImage } from "./scripts/PopupWithImage.js";
import { PopupWithForm } from "./scripts/PopupWithForm.js";
import { PopupConfirm } from './scripts/PopupConfirm.js';
import { UserInfo } from "./scripts/UserInfo.js";
import { Api } from "./scripts/Api.js";

const api = new Api (utils.conf)
const addValidator = new FormValidator(utils.validationConfig, utils.formPopupAdd)
const profileValidator = new FormValidator(utils.validationConfig, utils.formPopupProfile)
const avatarValidator = new FormValidator(utils.validationConfig, utils.formPopupAvatar)

export const user = new UserInfo({userName: utils.profileName, userAbout: utils.profileAbout, avatar: utils.imageAvatar})

const blockPopupProfileWithForm  = new PopupWithForm (utils.blockPopupProfile, (values)=>{

  blockPopupProfileWithForm.buttonSave.textContent = "Сохранение..."
  blockPopupProfileWithForm.close()
  profileValidator.toggleButtonState()
  
  api.editUser(values.name, values.about)
  .then((data)=>{
    user.setUserInfo(data)
  })
  .catch((err)=>{
    console.log('Ошибка сервера', err )
  })
  .finally(()=>{
    blockPopupProfileWithForm.buttonSave.textContent = "Сохраненить"
  })

})

const blockPopupAddWithForm  = new PopupWithForm (utils.blockPopupAdd, (values)=>{

blockPopupAddWithForm.buttonSave.textContent = "Сохранение..."
api.addCard(values.name, values.link)
.then((data)=>{
  section.addItem(createCard (data))
  blockPopupAddWithForm.close()
  addValidator.toggleButtonState()
})
.catch((err)=>{
  console.log('Ошибка сервера', err )
})
.finally(()=>{
  blockPopupAddWithForm.buttonSave.textContent = "Сохраненить"
})

})

const blockPopupEditAvatar = new PopupWithForm (utils.blockPopupAvatar, (values)=>{

  blockPopupEditAvatar.buttonSave.textContent = "Сохранение..."
  api.editAvatar(values.avatar)
  .then((data)=>{
    user.setUserInfo(data)
    blockPopupEditAvatar.close()
    avatarValidator.toggleButtonState()
  })
  .catch((err)=>{
    console.log('Ошибка сервера', err )
  })
  .finally(()=>{
    blockPopupEditAvatar.buttonSave.textContent = "Сохраненить"
  })
  
  })

const image = new PopupWithImage(utils.blockPopupImage)

const popupConfirm = new PopupConfirm (utils.blockPopupConfirm,(element)=>{
  api.deleteCard(element.getId())
  .then(()=>{
    element.removeCard()
    popupConfirm.close()
  })
  .catch((err)=>{
    console.log('Ошибка сервера', err )
  })
})

const section = new Section({
  renderer: (element, user)=>{
    const card = createCard(element, user)
    section.addItem(card)
    }
  },
  utils.cardsContainer
)



function openEditPopup() {
  user.getUserInfo()
  utils.namePopupProfile.value = user.info.name;
  utils.aboutPopupProfile.value = user.info.about;
  profileValidator.deleteErrors()
  blockPopupProfileWithForm.open()
};

function createCard(data, user){
  const card = new Card (data, user, utils.elementTemplete,
    
    ()=>{
      image.open(data.name, data.link)
    },

    (element)=>{
      popupConfirm.open()
      popupConfirm.setElement(element)
    },
    
    ()=>{
      if(card.getLike()){
        api.deleteLike(card.getId())
        .then((data)=>{
          card.setLikes(data.likes)
          card.updateLikes()
        })
        .catch((err)=>{
          console.log('Ошибка сервера', err )
        })
      }
      else{
        api.addLike(card.getId())
        .then((data)=>{
          card.setLikes(data.likes)
          card.updateLikes()
        })
        .catch((err)=>{
          console.log('Ошибка сервера', err )
        })
      }
    }
    )


  const element = card.createElement()

  return element
}

function openAddPopup() {
  addValidator.deleteErrors()
  addValidator.toggleButtonState()
  blockPopupAddWithForm.open()
};

function openEditAvatarPopup() {
  avatarValidator.deleteErrors()
  blockPopupEditAvatar.open()
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
blockPopupEditAvatar.setEventListeners()




Promise.all([api.getUser(), api.getAllCards()])
  .then((results) => {
    user.setUserInfo(results[0])

    section.renderItems(results[1],results[0])
  })
  .catch((err)=>{
    console.log('Ошибка сервера', err )
  })

  
