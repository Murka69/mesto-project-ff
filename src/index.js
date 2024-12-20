// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import './pages/index.css'
import { initialCards } from "./scripts/cards.js";
import { createCard, addCard, deleteCard } from "./scripts/card.js";
import { openModal, closeModal } from "./scripts/modal.js";

const temp = document.querySelector(".content");
const cardsContent = temp.querySelector(".places__list");

createCard(initialCards, cardsContent);

const buttonProfileEdit = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const textName = popupTypeEdit.querySelector(".popup__input_type_name");
const profileTitleElement = document.querySelector(".profile__title");
const profileDescriptionElement = document.querySelector(".profile__description");
const textDescription = popupTypeEdit.querySelector(".popup__input_type_description");
const formElement = popupTypeEdit.querySelector(".popup__form");
const buttonNewCard = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupImg = popupTypeNewCard.querySelector(".popup__input_type_card-name");
const popupCaption = popupTypeNewCard.querySelector(".popup__input_type_url");
const formElementNewCard = popupTypeNewCard.querySelector(".popup__form");

function openEditProfilePopup() {
  textName.value = profileTitleElement.textContent;
  textDescription.value = profileDescriptionElement.textContent;
  openModal(popupTypeEdit);
}

buttonProfileEdit.addEventListener("click", openEditProfilePopup);

document.querySelectorAll(".popup__close").forEach((button) => {
  button.addEventListener("click", (evt) => {
    const popup = evt.target.closest(".popup");
    closeModal(popup);
  });
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    if (openPopup) {
      closeModal(openPopup);
    }
  }
});

formElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileTitleElement.textContent = textName.value;
  profileDescriptionElement.textContent = textDescription.value;
  closeModal(popupTypeEdit);
});

document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup_is-opened")) {
    closeModal(evt.target);
  }
});

buttonNewCard.addEventListener("click", () => openModal(popupTypeNewCard));

formElementNewCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCardName = popupImg.value;
  const newCardLink = popupCaption.value;
  const newCard = addCard({ name: newCardName, link: newCardLink }, deleteCard);
  cardsContent.prepend(newCard);

  closeModal(popupTypeNewCard);
  popupImg.value = "";
  popupCaption.value = "";
});

export function openImagePopup(name, link) {
  const popupImage = document.querySelector(".popup_type_image");
  const popupImageElement = popupImage.querySelector(".popup__image");
  const popupCaptionElement = popupImage.querySelector(".popup__caption");
  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaptionElement.textContent = name;
  openModal(popupImage);
}