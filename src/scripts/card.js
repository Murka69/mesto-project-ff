import { likeCard, dislikeCard, removeCard } from "./api.js";

export function renderCards(initialCards, cardsContent, openImagePopup, userId, deleteCard, handleLike) {
  initialCards.forEach((cardData) => {
    const card = createCardElement(cardData, openImagePopup, userId, deleteCard, handleLike);
    cardsContent.append(card);
  });
}

export function createCardElement(cardData, openImagePopup, userId, deleteCard, handleLike) {
  const { name, link, likes, _id, owner } = cardData;
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardItem.querySelector(".card__image");
  const cardTitle = cardItem.querySelector(".card__title");
  const likeButton = cardItem.querySelector(".card__like-button");
  const likesCountElement = cardItem.querySelector(".like-count");
  const deleteButton = cardItem.querySelector(".card__delete-button");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  likesCountElement.textContent = likes.length;

  const isLiked = likes.some((like) => like._id === userId);
  likeButton.classList.toggle("card__like-button_is-active", isLiked);

  if (owner._id !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () => deleteCard(cardItem, _id,removeCard));
  }

  cardImage.addEventListener('click', () => openImagePopup(name, link));

  likeButton.addEventListener('click', () => {
    handleLike(likeButton, cardData, likesCountElement,likeCard, dislikeCard);
  });

  return cardItem;
}

export function handleLike(likeButton, cardData, likesCountElement,likeCard, dislikeCard) {
  const isActive =  likeButton.classList.contains("card__like-button_is-active");
  const likeMethod = isActive ? likeCard : dislikeCard;
  likeMethod(cardData._id)
    .then((updatedCardData) => {
      likesCountElement.textContent = updatedCardData.likes.length; 
      likeButton.classList.toggle(".card__like-button_is-active")
    })
    .catch((error) => {
      console.log(error);
    });
}

export function deleteCard(cardItem, cardId) {
  removeCard(cardId)
    .then((res) => {
      if (res) {
        cardItem.remove();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

