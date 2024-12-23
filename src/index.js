// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, createCardElement, deleteCard } from "./scripts/card.js";
import { openModal,closeModal,setupPopupCloseListeners} from "./scripts/modal.js";
import { openImagePopup } from "./scripts/imagePopup.js";

const buttonProfileEdit = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const editProfileNameInput = popupTypeEdit.querySelector(".popup__input_type_name");
const profileTitleElement = document.querySelector(".profile__title");
const profileDescriptionElement = document.querySelector(".profile__description");
const editProfileDescriptionInput = popupTypeEdit.querySelector(".popup__input_type_description");
const formElement = popupTypeEdit.querySelector(".popup__form");
const buttonNewCard = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const cardNameInput = popupTypeNewCard.querySelector(".popup__input_type_card-name");
const cardUrlInput = popupTypeNewCard.querySelector(".popup__input_type_url");
const formElementNewCard = popupTypeNewCard.querySelector(".popup__form");

const mainContent = document.querySelector(".content");
const cardsContent = mainContent.querySelector(".places__list");

function handleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

createCard(initialCards, cardsContent, openImagePopup, handleLike);

function openEditProfilePopup() {
  editProfileNameInput.value = profileTitleElement.textContent;
  editProfileDescriptionInput.value = profileDescriptionElement.textContent;
  openModal(popupTypeEdit);
}

buttonProfileEdit.addEventListener("click", openEditProfilePopup);
setupPopupCloseListeners();

formElement.addEventListener("submit", (evt) => {
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


