/**
 * Validation details for form fields containing error messages and associated field IDs
 *
 * @typedef {Object} VALIDATION_DETAILS
 * @property {string} TEXT - The error message to display
 * @property {string} FIELD - The ID of the form field associated with this validation
 * @constant
 * @type {Object<string, VALIDATION_DETAILS>}
 */
const VALIDATION_DETAILS = {
  INVALID_CONTACT_NAME: {
    TEXT: "Please enter a valid contact name.",
    FIELD: "contact_manage_name",
  },
  INVALID_CONTACT_MAIL: {
    TEXT: "Please enter a valid contact email.",
    FIELD: "contact_manage_mail",
  },
  INVALID_CONTACT_PHONE: {
    TEXT: "Please enter a valid contact phone number.",
    FIELD: "contact_manage_phone",
  },
};

/**
 * Array to store current validation error messages
 *
 * @type {string[]}
 */
let currentValidationMessages = [];

/**
 * Validates the contact fields (name, email, and phone)
 *
 * @param {HTMLInputElement} nameField - The name input field
 * @param {HTMLInputElement} mailField - The email input field
 * @param {HTMLInputElement} phoneField - The phone input field
 * @param {boolean} fieldFocusCheck - A boolean indicating whether to perform field focus checks
 * @returns {boolean} True if all validations pass, false otherwise
 */
function validateContactFields(nameField, mailField, phoneField, fieldFocusCheck) {
  currentValidationMessages = [];
  removeValidationMessage();
  validateName(fieldFocusCheck, nameField);
  validateMail(fieldFocusCheck, mailField);
  validatePhone(phoneField);
  return currentValidationMessages.length === 0;
}

/**
 * Handles the logic for enabling/disabling the submit button
 * based on the name and email field values
 *
 * @param {HTMLInputElement} nameField - The name input field
 * @param {HTMLInputElement} mailField - The email input field
 * @returns {boolean} True if both name and email have values, false otherwise
 */
function handleContactValidation(nameField, mailField) {
  if (nameField.value !== "" && mailField.value !== "") {
    enableSubmitButton(true);
    return true;
  }
  enableSubmitButton(false);
  return false;
}

/**
 * Checks if the contact form is valid, performing all necessary validations
 * and handling the submit button state
 *
 * @param {HTMLInputElement} nameField - The name input field
 * @param {HTMLInputElement} mailField - The email input field
 * @param {HTMLInputElement} phoneField - The phone input field
 * @param {boolean} fieldFocusCheck A boolean indicating whether to perform field focus checks
 * @returns {boolean} True if the form is valid and ready for submission, false otherwise
 */
function isContactValid(nameField, mailField, phoneField, fieldFocusCheck) {
  if (validateContactFields(nameField, mailField, phoneField, fieldFocusCheck)) {
    return handleContactValidation(nameField, mailField);
  } else {
    displayFirstValidationMessage();
    enableSubmitButton(false);
    return false;
  }
}

/**
 * Validates the contact name field
 *
 * @param {boolean} fieldFocusCheck - A boolean indicating whether to check field focus
 * @param {HTMLInputElement} nameField - The input field for the contact name
 */
function validateName(fieldFocusCheck, nameField) {
  if ((fieldFocusCheck && isFieldTouched(nameField)) || !fieldFocusCheck) {
    if (!nameField.checkValidity()) {
      currentValidationMessages.push(VALIDATION_DETAILS.INVALID_CONTACT_NAME.TEXT);
    }
  }
}

/**
 * Validates the contact email field
 *
 * @param {boolean} fieldFocusCheck - A boolean indicating whether to check field focus
 * @param {HTMLInputElement} mailField - The input field for the contact email
 */
function validateMail(fieldFocusCheck, mailField) {
  removeCustomValidationMessage(mailField);
  if ((fieldFocusCheck && isFieldTouched(mailField)) || !fieldFocusCheck) {
    if (!(mailField.checkValidity() && isValidEmailFormat(mailField))) {
      currentValidationMessages.push(VALIDATION_DETAILS.INVALID_CONTACT_MAIL.TEXT);
    }
  }
}

/**
 * Validates the contact phone field
 *
 * @param {HTMLInputElement} phoneField - The input field for the contact phone
 */
function validatePhone(phoneField) {
  removeCustomValidationMessage(phoneField);
  if (phoneField.value !== "" && !(isFieldValid(phoneField) && isValidPhoneFormat(phoneField))) {
    currentValidationMessages.push(VALIDATION_DETAILS.INVALID_CONTACT_PHONE.TEXT);
  }
}

/**
 * Checks if a field has been touched (focused by the user)
 *
 * @param {HTMLInputElement} field - The input field to check
 * @returns {boolean} True if the field has been touched, false otherwise
 */
function isFieldTouched(field) {
  return field.classList.contains("touched");
}

/**
 * Validates a single form field using HTML5 validation
 *
 * @param {HTMLInputElement} field - The input field element to validate
 * @returns {boolean} True if the field is valid, false otherwise
 */
function isFieldValid(field) {
  return field.checkValidity();
}

/**
 * Validates if a form field contains a properly formatted email address
 * The function checks using a regex pattern that ensures:
 * - Valid characters before @ (letters, numbers, and certain special characters)
 * - Valid domain name
 * - Top-level domain has at least 2 characters
 *
 * @param {HTMLInputElement} field - The input field element to validate
 * @returns {boolean} True if the email format is valid, false otherwise
 */
function isValidEmailFormat(field) {
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(field.value)) {
    field.setCustomValidity(" ");
    return false;
  }
  field.setCustomValidity("");
  return true;
}

/**
 * Validates if a form field contains a properly formatted phone number
 * The function checks using a regex pattern that ensures:
 * - An optional leading "+" sign.
 * - An optional area code enclosed in parentheses with at least two digits.
 * - Hyphens, spaces, or periods as separators.
 * - At least four digits following the area code or the beginning if no area code.
 *
 * @param {HTMLInputElement} field - The input field element to validate
 * @returns {boolean} True if the phone format is valid, false otherwise
 */
function isValidPhoneFormat(field) {
  let regex = /^[\+]?[(]?[0-9]{2,}[)]?[-\s\.]?[0-9\s]{4,}$/;
  if (!regex.test(field.value)) {
    field.setCustomValidity(" ");
    return false;
  }
  field.setCustomValidity("");
  return true;
}

/**
 * Displays the first validation error message
 */
function displayFirstValidationMessage() {
  const message = currentValidationMessages.find((element) => element !== undefined);
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
 * @param {HTMLInputElement} field - The field element to clear custom validity on
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
