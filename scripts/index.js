const editPopupOpenButton = document.querySelector(".profile__edit-button");
const editPopupBlock = document.querySelector(".popup_type_edit");
const editPopupCloseButton = editPopupBlock.querySelector(".popup__close");
const editPopupForm = editPopupBlock.querySelector(".popup__form");

const editPopupName = editPopupBlock.querySelector(".popup__input_value_name");
const editPopupAbout = editPopupBlock.querySelector(".popup__input_value_about");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

function openPopup(popup) {
  popup.classList.add("popup_is-opened")
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}

function openEditPopup() {
  openPopup (editPopupBlock);
  editPopupName.value = profileName.textContent;
  editPopupAbout.value = profileAbout.textContent;
};

function saveEditPopup (evt) {
  evt.preventDefault();
  profileName.textContent = editPopupName.value;
  profileAbout.textContent = editPopupAbout.value;
  closePopup (editPopupBlock);
};

editPopupOpenButton.addEventListener("click", openEditPopup);
editPopupCloseButton.addEventListener("click", (event) => {closePopup (editPopupBlock);});
editPopupForm.addEventListener("submit", saveEditPopup);

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

function createElement(name, link) {
  const element = elementTemplete.cloneNode(true);
  const elementImage = element.querySelector(".element__image");
  const elementName = element.querySelector(".element__name");

  elementName.textContent = name;
  elementImage.setAttribute ('src', link)
  elementImage.setAttribute ('alt', name)

  const elementButtonDel = element.querySelector(".element__remove")
  elementButtonDel.addEventListener('click', function(){
    element.remove();
  })

  function openPopupImage() {
    const imagePopupBlock = document.querySelector(".popup_type_image");
    const imagePopupCloseButton = imagePopupBlock.querySelector(".popup__close");

    const imagePopupImg = imagePopupBlock.querySelector(".popup__image");
    const imagePopupName = imagePopupBlock.querySelector(".popup__image-name");

    imagePopupName.textContent = name
    imagePopupImg.setAttribute ('src', link)
    imagePopupImg.setAttribute ('alt', name)

    openPopup(imagePopupBlock);

    imagePopupCloseButton.addEventListener("click", (event) => {closePopup (imagePopupBlock);});

  }

  elementImage.addEventListener("click", openPopupImage);

  const elementButtonLike = element.querySelector(".element__like")
  function like() {
    elementButtonLike.classList.toggle("element__like_active")
  }

  elementButtonLike.addEventListener('click', like)

  return element
  
}

function addElement(name, link,){
  elements.prepend(createElement(name, link));
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
};

function saveAddPopup (evt) {
  evt.preventDefault();
addElement (addPopupName.value, addPopupAbout.value)
  closePopup(addPopupBlock);
};

addPopupOpenButton.addEventListener("click", openAddPopup);
addPopupCloseButton.addEventListener("click", (event) => {closePopup (addPopupBlock);});
addPopupForm.addEventListener("submit", saveAddPopup);