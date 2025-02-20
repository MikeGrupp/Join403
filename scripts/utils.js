/**
 * An array of color names
 * 
 * @type {string[]}
 */
const COLORS = [
  "orange",
  "pink",
  "violet_blue",
  "violet",
  "blue_cerulean ",
  "green_java ",
  "red_bittersweet ",
  "orange_tangerine ",
  "pink_helitrope ",
  "yellow_supernova ",
  "blue_ribbon ",
  "green_yellow ",
  "yellow_sun ",
  "red_coral ",
  "yellow_sin ",
  "purple_minsk",
];

/**
 * Randomly selects and returns a color from a predefined array of colors
 *
 * @returns {string} A randomly selected color name from the COLORS array
 */
function selectRandomColor() {
  let randomNumber = Math.floor(Math.random() * COLORS.length);
  return COLORS[randomNumber];
}

/**
 * Takes a full name string and returns the initials by taking the first character of each word
 *
 * @param {string} name - A string containing one or more names separated by spaces
 * @returns {string} A string containing the initials (first character of each word) joined together
 */
function determineInitials(name) {
  return name
    .split(" ")
    .map((char) => {
      return char[0];
    })
    .join("");
}

/**
 * Resets all form elements within a form to their default values
 * This includes clearing text inputs, unchecking radio/checkboxes,
 * and resetting select elements to their default selected options
 *
 * @param {string} formId - The HTML id attribute of the form element to reset
 */
function resetForm(formId) {
  document.getElementById(formId).reset();
}

/**
 * Navigates to the previous page in browser history if available,
 * otherwise redirects to index.html
 *
 */
function previousPage() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "index.html";
  }
}

/**
 * Toggles the "d-none" class on an HTML element to show/hide it
 *
 * @param {string} id - The ID of the HTML element to toggle visibility
 */
function dNone(id) {
  document.getElementById(id).classList.toggle("d-none");
}

/**
 * Adds a blur listener to the given element
 * When the element loses focus, the content gets trimmed
 *
 * @param {HTMLElement} element - The HTML element to add the blur listener to
 */
function addFormBlurTrimListener(element) {
  element.addEventListener("blur", (e) => {
    e.target.value = e.target.value.trim();
  });
}