// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { renderCards, createCardElement, deleteCard, handleLike } from "./scripts/card.js";
import { openModal, closeModal, setupPopupCloseListeners } from "./scripts/modal.js";

const buttonProfileEdit = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const editProfileNameInput = popupTypeEdit.querySelector(".popup__input_type_name");
const profileTitleElement = document.querySelector(".profile__title");
const profileDescriptionElement = document.querySelector(".profile__description");
const editProfileDescriptionInput = popupTypeEdit.querySelector(".popup__input_type_description");
const buttonNewCard = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const cardNameInput = popupTypeNewCard.querySelector(".popup__input_type_card-name");
const cardUrlInput = popupTypeNewCard.querySelector(".popup__input_type_url");
const formElementNewCard = popupTypeNewCard.querySelector(".popup__form");
const formElementEditProfile = popupTypeEdit.querySelector(".popup__form"); 
const popupImage = document.querySelector(".popup_type_image");
const popupImageElement = popupImage.querySelector(".popup__image");
const popupCaptionElement = popupImage.querySelector(".popup__caption");
const mainContent = document.querySelector(".content");
const cardsContent = mainContent.querySelector(".places__list");

function openImagePopup(name, link) {
  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaptionElement.textContent = name;
  openModal(popupImage);
}

renderCards(initialCards, cardsContent, openImagePopup, handleLike, deleteCard);

function openEditProfilePopup() {
  editProfileNameInput.value = profileTitleElement.textContent;
  editProfileDescriptionInput.value = profileDescriptionElement.textContent;
  openModal(popupTypeEdit);
}

buttonProfileEdit.addEventListener("click", openEditProfilePopup);
setupPopupCloseListeners();

formElementEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileTitleElement.textContent = editProfileNameInput.value;
  profileDescriptionElement.textContent = editProfileDescriptionInput.value;
  closeModal(popupTypeEdit);
});

buttonNewCard.addEventListener("click", () => openModal(popupTypeNewCard));

formElementNewCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCardName = cardNameInput.value;
  const newCardLink = cardUrlInput.value;
  const newCard = createCardElement({ name: newCardName, link: newCardLink }, deleteCard, openImagePopup, handleLike);
  cardsContent.prepend(newCard);
  closeModal(popupTypeNewCard);
  formElementNewCard.reset();
});

