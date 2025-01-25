export function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    setEventListeners(form, config);
  });
}

function setEventListeners(form, config) {
  const inputs = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);

  inputs.forEach((input) => {
    hideError(input, input.nextElementSibling, config);
    input.addEventListener("input", () => {
      checkInputValidity(input, config);
      toggleButtonState(inputs, submitButton, config.inactiveButtonClass);
    });
  });

  toggleButtonState(inputs, submitButton, config.inactiveButtonClass);
}
function checkInputValidity(input, config) {
  const errorElement = input.nextElementSibling;
  const errorMessage = input.validity.patternMismatch ? input.dataset.errorMessage : input.validationMessage;
  if (input.validity.patternMismatch) {
    errorMessage = input.dataset.errorMessage;
  }
  if (errorMessage) {
    showError(input, errorElement, errorMessage, config);
  } else {
    hideError(input, errorElement, config);
  }
}
function showError(input, errorElement, message, config) {
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = message;
  errorElement.classList.add(config.errorClass);
}

function hideError(input, errorElement, config) {
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

function toggleButtonState(inputs, button, inactiveButtonClass) {
  const isFormValid = Array.from(inputs).every((input) => input.validity.valid);
  button.classList.toggle(inactiveButtonClass, !isFormValid);
  button.disabled = !isFormValid;
}

export function clearValidation(form, config) {
  const inputs = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);
  inputs.forEach((input) => {
    const errorElement = input.nextElementSibling;
    hideError(input, errorElement, config);
  });
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.classList.add(config.inactiveButtonClass);
  }
}
