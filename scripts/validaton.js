const validationDetails = {
  invalidCredentials: {
    text: "Check your email and password. Please try again.",
    field: "password"
  },
  invalidPasswordMatch: {
    text: "Your passwords don't match. Please try again.",
    field: "passwordConfirm"
  },
  invalidContactName: {
    text: "Please enter a valid contact name.",
    field: "contact_manage_name"
  },
  invalidContactMail: {
    text: "Please enter a valid contact email.",
    field: "contact_manage_mail"
  },
  invalidContactPhone: {
    text: "Please enter a valid contact phonenumber.",
    field: "contact_manage_mail"
  },
};

function isContactValid(nameField, mailField, phoneField) {
  if (
    isFieldValid(nameField, "invalidContactName") &&
    isFieldValid(mailField, "invalidContactMail") &&
    isFieldValid(phoneField, "invalidContactPhone")
  ) {
    enableSubmitButton(false);
    return false;
  }
  enableSubmitButton(true);
  return true;
}

function isFieldValid(field, validationDetailsId) {
  if (!field.checkValidity()) {
    displayCustomValidationMessage(validationDetailsId);
    return false;
  }
  removeValidationMessage();
  return true;
}

function displayDefaultValidationMessage(field, validationMessage) {
  field.setCustomValidity(' ');
  const logElement = document.getElementById("log");
  logElement.innerText = validationMessage;
}

function displayCustomValidationMessage(validationMessageId) {
  const message = validationDetails[validationMessageId].text;
  const logElement = document.getElementById("log");
  logElement.innerText = message;
}

function removeValidationMessage() {
  const logElement = document.getElementById("log");
  logElement.innerText = "";
}

function enableSubmitButton(isEnabled) {
  const submitButton = document.getElementById("submitButton");
  submitButton.disabled = isEnabled;
}