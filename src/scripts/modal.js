function openModal(popup) {
  popup.classList.add("popup_is-opened");
  setTimeout(() => {
    popup.style.opacity = "1";
  }, 0);
}

function closeModal(popup) {
  popup.style.opacity = "0";
  setTimeout(() => {
    popup.classList.remove("popup_is-opened");
  }, 300);
}

export{openModal,closeModal};