// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const temp = document.querySelector(".content");
const cardsContent = temp.querySelector(".places__list");

function createCard() {
  initialCards.forEach(({ name, link }) => {
    const card = addCard({ name, link }, deleteCard);
    cardsContent.append(card);
  });
}

function addCard({ name, link }, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const buttonDelete = cardItem.querySelector(".card__delete-button");

  cardItem.querySelector(".card__image").src = link;
  cardItem.querySelector(".card__image").alt = name;
  cardItem.querySelector(".card__title").textContent = name;

  buttonDelete.addEventListener("click", () => deleteCard(cardItem));

  return cardItem;
}

function deleteCard(cardItem) {
  cardItem.remove();
}

createCard();
