// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { renderCards, createCardElement } from "./scripts/card.js";
import { openModal, closeModal, setupPopupCloseListeners } from "./scripts/modal.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import { addNewCard, getCardList, getUser Info, updateUser Info, updateAvatar } from "./scripts/api.js";

let userId = null;

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
const profileAvatar = document.querySelector(".profile__image");
const popupTypeAvatar = document.querySelector(".popup_type_avatar");
const popupAvatarForm = document.querySelector('.popup__form[name="edit-avatar"]');
const popupAvatarInput = popupAvatarForm.querySelector(".popup__input_type_avatar-url");

const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};

enableValidation(config);

function handleAvatarSubmit(evt) {
    evt.preventDefault();
    const popupButtonSafe = popupTypeAvatar.querySelector(".popup__button");
    popupButtonSafe.textContent = "Сохранение...";

    updateAvatar(popupAvatarInput.value)
        .then((res) => {
            profileAvatar.style.backgroundImage = `url(${res.avatar})`;
            closeModal(popupTypeAvatar);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => (popupButtonSafe.textContent = "Сохранить"));
}

profileAvatar.addEventListener("click", () => {
    openModal(popupTypeAvatar);
    clearValidation(profileAvatar, config);
    popupAvatarForm.reset();
});

popupAvatarForm.addEventListener("submit", handleAvatarSubmit);

function openImagePopup(name, link) {
    popupImageElement.src = link;
    popupImageElement.alt = name;
    popupCaptionElement.textContent = name;
    openModal(popupImage);
}

function openEditProfilePopup() {
    editProfileNameInput.value = profileTitleElement.textContent;
    editProfileDescriptionInput.value = profileDescriptionElement.textContent;
    clearValidation(formElementEditProfile, config);
    openModal(popupTypeEdit);
}

formElementEditProfile.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const newName = editProfileNameInput.value;
    const newAbout = editProfileDescriptionInput.value;
    const popupButtonSafe = popupTypeEdit.querySelector(".popup__button");
    popupButtonSafe.textContent = "Сохранение...";
    
    updateUserInfo(newName, newAbout)
        .then((updatedUserData) => {
            profileTitleElement.textContent = updatedUserData.name;
            profileDescriptionElement.textContent = updatedUserData.about;
            closeModal(popupTypeEdit);
        })
        .catch((err) => {
            console.error("Ошибка при обновлении данных профиля:", err);
        })
        .finally(() => (popupButtonSafe.textContent = "Сохранить"));
});

buttonProfileEdit.addEventListener("click", openEditProfilePopup);
setupPopupCloseListeners();

buttonNewCard.addEventListener("click", () => openModal(popupTypeNewCard));

formElementNewCard.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const popupButtonSafe = popupTypeNewCard.querySelector(".popup__button");
    popupButtonSafe.textContent = "Сохранение...";
    const newCardName = cardNameInput.value;
    const newCardLink = cardUrlInput.value;
    addNewCard(newCardName, newCardLink)
        .then((cardData) => {
            const cardElement = createCardElement(cardData, openImagePopup, cardData.owner._id);
            cardsContent.prepend(cardElement);
            closeModal(popupTypeNewCard);
            formElementNewCard.reset();
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => (popupButtonSafe.textContent = "Сохранить"));
});

Promise.all([getCardList(), getUserInfo()])
    .then(([cards, userData]) => {
        userId = userData._id;
        profileTitleElement.textContent = userData.name;
        profileDescriptionElement.textContent = userData.about;
        profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
        renderCards(cards, cardsContent, openImagePopup, userId);
    })
    .catch((err) => {
        console.error(err);
    });
    
   


