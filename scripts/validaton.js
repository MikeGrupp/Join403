const validationDetails = {
  invalidCredentials: {
    text: "Check your email and password. Please try again.",
    field: "password"
  },
  invalidPasswordMatch: {
    text: "Your passwords don't match. Please try again.",
    field: "passwordConfirm"
  },
};

function isContactValid(nameField, mailField, phoneField) {
  if (nameField.reportValidity()) {
    displayDefaultValidationMessage(nameField, nameField.validationMessage);
    return false;
  }
  if (mailField.reportValidity()) {
    displayDefaultValidationMessage(mailField, mailField.validationMessage);
    return false;
  }
  if (phoneField.reportValidity()) {
    displayDefaultValidationMessage(phoneField, phoneField.validationMessage);
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
  highlightCustomValidationField(validationMessageId);
}

function highlightCustomValidationField(validationMessageId) {
  const fieldName = validationDetails[validationMessageId].field;
  const invalidField = document.getElementById(fieldName);
  invalidField.setCustomValidity(' ');
}

function removeValidationMessage() {
  const logElement = document.getElementById("log");
  logElement.innerText = "";
}