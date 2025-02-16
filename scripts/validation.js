/**
 * Validation details for form fields containing error messages and associated field IDs
 *
 * @typedef {Object} ValidationDetail
 * @property {string} text - The error message to display
 * @property {string} field - The ID of the form field associated with this validation
 */
const validationDetails = {
  invalidCredentials: {
    text: "Check your email and password. Please try again.",
    field: "password",
  },
  invalidPasswordMatch: {
    text: "Your passwords don't match. Please try again.",
    field: "passwordConfirm",
  },
  invalidContactName: {
    text: "Please enter a valid contact name.",
    field: "contact_manage_name",
  },
  invalidContactMail: {
    text: "Please enter a valid contact email.",
    field: "contact_manage_mail",
  },
  invalidContactPhone: {
    text: "Please enter a valid contact phone number.",
    field: "contact_manage_phone",
  },
};

/**
 * Validates contact form fields and controls submit button state
 *
 * @param {HTMLElement} nameField - The name input field element to validate
 * @param {HTMLElement} mailField - The email input field element to validate
 * @param {HTMLElement} phoneField - The phone input field element to validate
 * @returns {boolean} Returns true if all fields are valid, false otherwise
 */
function isContactValid(nameField, mailField, phoneField) {
  removeCustomValidationMessage(mailField);
  if (
    isFieldValid(nameField, "invalidContactName") &&
    isFieldValid(mailField, "invalidContactMail") &&
    isValidEmailFormat(mailField, "invalidContactMail") &&
    isFieldValid(phoneField, "invalidContactPhone")
  ) {
    enableSubmitButton(true);
    return true;
  }
  enableSubmitButton(false);
  return false;
}

/**
 * Validates a single form field using HTML5 validation and custom validation rules
 *
 * @param {HTMLInputElement} field - The input field element to validate
 * @param {string} validationDetailsId - The key to look up validation details from validationDetails object
 * @returns {boolean} Returns true if the field is valid, false otherwise
 */
function isFieldValid(field, validationDetailsId) {
  if (!field.checkValidity()) {
    displayCustomValidationMessage(validationDetailsId);
    return false;
  }
  removeValidationMessage();
  return true;
}

/**
 * Validates if a form field contains a properly formatted email address.
 * The function checks using a regex pattern that ensures:
 * - Valid characters before @ (letters, numbers, and certain special characters)
 * - Valid domain name
 * - Top-level domain has at least 2 characters
 * 
 * @param {HTMLInputElement} field - The input field element to validate
 * @param {string} validationDetailsId - The ID of the element where validation messages will be displayed
 * @returns {boolean} Returns true if the email format is valid, false otherwise
 */
function isValidEmailFormat(field, validationDetailsId) {
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(field.value)) {
    field.setCustomValidity(" ");
    displayCustomValidationMessage(validationDetailsId);
    return false;
  }
  field.setCustomValidity("");
  removeValidationMessage();
  return true;
}

/**
 * Displays a custom validation message from the validationDetails object
 *
 * @param {string} validationMessageId - The key to look up the validation message in validationDetails
 */
function displayCustomValidationMessage(validationMessageId) {
  const message = validationDetails[validationMessageId].text;
  const logElement = document.getElementById("log");
  logElement.innerText = message;
}

/**
 * Removes any currently displayed validation message
 */
function removeValidationMessage() {
  const logElement = document.getElementById("log");
  logElement.innerText = "";
}

/**
 * Removes any custom validation message set on a form field
 *
 * @param {HTMLElement} field - The field element to validate
 */
function removeCustomValidationMessage(field) {
  field.setCustomValidity("");
}

/**
 * Enables or disables the form submit button
 *
 * @param {boolean} isEnabled - Whether to enable (true) or disable (false) the submit button
 */
function enableSubmitButton(isEnabled) {
  const submitButton = document.getElementById("submitButton");
  submitButton.disabled = !isEnabled;
}
