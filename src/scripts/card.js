import { likeCard, dislikeCard, removeCard } from "./api.js";

export function renderCards(
  initialCards,
  cardsContent,
  openImagePopup,
  userId
) {
  initialCards.forEach((cardData) => {
    const card = createCardElement(cardData, openImagePopup, userId);
    cardsContent.append(card);
  });
}

export function createCardElement(cardData, openImagePopup, userId, deleteCardCallback, likeCardCallback) {
  const { name, link, likes, _id, owner } = cardData;
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const buttonDelete = cardItem.querySelector(".card__delete-button");
  const likeButton = cardItem.querySelector(".card__like-button");
  const likeCount = cardItem.querySelector(".like-count");

  const cardImage = cardItem.querySelector(".card__image");
  const cardTitle = cardItem.querySelector(".card__title");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  likeCount.textContent = likes.length;

  const isLiked = likes.some((like) => like._id === userId);

  likeButton.classList.toggle("card__like-button_is-active", isLiked);

  if (owner._id !== userId) {
    buttonDelete.remove();
  } else {
    buttonDelete.addEventListener("click", () => deleteCardCallback(cardItem, _id, likeCardCallback));
  }

  cardImage.addEventListener("click", () => openImagePopup(name, link));

  likeButton.addEventListener("click", () => {
    handleLike(likeButton, _id, likeCount, likeCardCallback);
  });
  return cardItem;
}

export function handleLike(likeButton, cardId, likeCount) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const likeMethod = isLiked ? dislikeCard : likeCard;
  likeMethod(cardId)
    .then((res) => {
      likeCount.textContent = res.likes.length;
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => console.log(err));
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
