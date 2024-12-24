function openModal(popup) {
  popup.classList.add("popup_is-opened");
  setTimeout(() => {
    popup.style.opacity = "1";
  }, 0);
  document.addEventListener("keydown", (evt) => handleKeyDown(evt, popup));
  popup.addEventListener("mousedown", handleOverlayClick);
}

function closeModal(popup) {
  popup.style.opacity = "0";
  setTimeout(() => {
    popup.classList.remove("popup_is-opened");
  }, 300);
  document.removeEventListener("keydown", (evt) => handleKeyDown(evt, popup));
  popup.removeEventListener("mousedown", handleOverlayClick);
}

function handleKeyDown(evt, popup) {
  evt.key === "Escape" && closeModal(popup);
}

function handleOverlayClick(evt) {
  const popupContent = evt.currentTarget.querySelector(".popup__content");
  const isClickOutside = !popupContent.contains(evt.target);
  isClickOutside && closeModal(evt.currentTarget);
}

function setupPopupCloseListeners() {
  document.querySelectorAll(".popup__close").forEach((button) => {
    button.addEventListener("click", (evt) => {
      const popup = evt.target.closest(".popup");
      closeModal(popup);
    });
  });
}
export { openModal, closeModal, setupPopupCloseListeners };

