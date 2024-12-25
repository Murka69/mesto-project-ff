export function renderCards(initialCards, cardsContent, openImagePopup, handleLike,deleteCard) {
  initialCards.forEach(({ name, link }) => {
    const card = createCardElement({ name, link }, deleteCard, openImagePopup, handleLike);
    cardsContent.append(card);
  });
}
export function handleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
export function createCardElement({ name, link }, deleteCard, openImagePopup, handleLike) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const buttonDelete = cardItem.querySelector(".card__delete-button");
  const likeButton = cardItem.querySelector(".card__like-button");

  cardItem.querySelector(".card__image").src = link;
  cardItem.querySelector(".card__image").alt = name;
  cardItem.querySelector(".card__title").textContent = name;

  buttonDelete.addEventListener("click", () => deleteCard(cardItem));

  cardItem.addEventListener("click", (event) => {
    if (event.target.closest(".card__image")) {
      openImagePopup(name, link);
    }
  });
  likeButton.addEventListener("click", () => {
    handleLike(likeButton);
  });
  return cardItem;
}

export function deleteCard(cardItem) {
  cardItem.remove();
}

