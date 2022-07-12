const popupOpen = document.querySelector(".profile__edit-button");
const popupBlock = document.querySelector(".popup");
const popupClose = document.querySelector(".popup__close");
const popupSave = document.querySelector(".popup__form");

let popupName = document.querySelector(".popup__input_value_name");
let popupAbout = document.querySelector(".popup__input_value_about");
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");

function openPopup() {
  popupBlock.classList.add("popup_is-opened");
  popupName.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
};

function closePopup () {
  popupBlock.classList.remove("popup_is-opened");
}

function savePopup (evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileAbout.textContent = popupAbout.value;
  closePopup();
};

popupOpen.addEventListener("click", openPopup);
popupClose.addEventListener("click", closePopup);
popupSave.addEventListener("submit", savePopup);
