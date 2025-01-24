import { likeCard, dislikeCard, removeCard } from "./api.js";

export function renderCards(initialCards, cardsContent, openImagePopup, userId) {
    initialCards.forEach((cardData) => {
        const card = createCardElement(cardData, openImagePopup, userId);
        cardsContent.append(card);
    });
}

export function createCardElement(cardData, openImagePopup, userId) {
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
    
    const isLiked = likes.some(like => like._id === userId);

    likeButton.classList.toggle("card__like-button_is-active", isLiked);

    if (owner._id !== userId) {
        buttonDelete.remove();
    } else {
        buttonDelete.addEventListener("click", () => deleteCard(cardItem, _id));
    }

    cardImage.addEventListener("click", () => openImagePopup(name, link));

    likeButton.addEventListener("click", () => {
        handleLike(likeButton, _id, likeCount);
    });
    return cardItem;
}

export function handleLike(likeButton, cardId, likeCount) {
    const isLiked = likeButton.classList.contains("card__like-button_is-active");

    if (isLiked) {
        dislikeCard(cardId)
            .then((res) => {
                if (res) {
                    likeButton.classList.remove("card__like-button_is-active");
                    likeCount.textContent = parseInt(likeCount.textContent, 10) - 1;
                    likeButton[cardId] = false;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        likeCard(cardId)
            .then((res) => {
                if (res) {
                    likeButton.classList.add("card__like-button_is-active");
                    likeCount.textContent = parseInt(likeCount.textContent, 10) + 1;
                    likeButton[cardId] = true;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
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

