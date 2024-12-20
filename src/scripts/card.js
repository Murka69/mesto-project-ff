import {openImagePopup} from '../index.js'

export function createCard(initialCards, cardsContent) {
  initialCards.forEach(({ name, link }) => {
    const card = addCard({ name, link }, deleteCard);
    cardsContent.append(card);
  });
}

export function addCard({ name, link }, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const buttonDelete = cardItem.querySelector(".card__delete-button");
  const likeButton = cardItem.querySelector(".card__like-button");
  cardItem.querySelector(".card__image").src = link;
  cardItem.querySelector(".card__image").alt = name;
  cardItem.querySelector(".card__title").textContent = name;

  buttonDelete.addEventListener("click", () => deleteCard(cardItem));

  cardItem.addEventListener("click", (event) => {
    if (event.target !== buttonDelete && event.target !== likeButton) {
      openImagePopup(name, link);
    }
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });
  return cardItem;
}

export function deleteCard(cardItem) {
  cardItem.remove();
}

