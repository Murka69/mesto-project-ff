const config = {
  baseURL: "https://mesto.nomoreparties.co/v1/wff-cohort-30",
  headers: {
      authorization: "0ae3e436-f1fb-4871-9ffa-87d2e9948f39",
      "Content-Type": "application/json",
  },
};

const handleResponse = (response) => {
  return response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`);
};

export const getUserInfo = () => {
  return fetch(`${config.baseURL}/users/me`, {
      method: "GET",
      headers: config.headers,
  })
      .then(handleResponse)
      .catch((error) => {
          console.error("Ошибка при получении данных о пользователе:", error);
      });
};

export const updateUserInfo = (name, about) => {
  return fetch(`${config.baseURL}/users/me`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({ name, about }),
  }).then(handleResponse);
};

export const getCardList = () => {
  return fetch(`${config.baseURL}/cards`, {
      headers: config.headers,
  }).then(handleResponse);
};

export const addNewCard = (name, link) => {
  return fetch(`${config.baseURL}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({ name, link }),
  }).then(handleResponse);
};

export const likeCard = (cardId) => {
  return fetch(`${config.baseURL}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: config.headers,
  }).then(handleResponse);
};

export const dislikeCard = (cardId) => {
  return fetch(`${config.baseURL}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: config.headers,
  }).then(handleResponse);
};

export const removeCard = (cardId) => {
  return fetch(`${config.baseURL}/cards/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
  }).then(handleResponse);
};

export const updateAvatar = (avatarUrl) => {
  return fetch(`${config.baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({ avatar: avatarUrl }),
  }).then(handleResponse);
};

