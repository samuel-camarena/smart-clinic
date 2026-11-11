import {capitalize} from "../../utils/util.js";
//import * as Config from "../../config/config.js";

//export let userFields = [];
/*
export function createHeader(normalTitle) {
  const h1 = document.createElement("h2");
  h1.textContent = normalTitle;
  h1.appendChild(highlightedWordSpan);
  return h1;
}

 */
/*
export function createStyledTitleAndCloseBtnEl(startingText, styledText, endingText) {
  const closeBtn = document.createElement("span");
  closeBtn.className = "close";
  closeBtn.textContent = "x";
  closeBtn.id = "closeModalBtn";
  closeBtn.addEventListener("click", document.closeModal);

  return [
    createStyledTitleEl(startingText, styledText, endingText),
    closeBtn
  ];
}

function createStyledTitleEl(startingText, styledText, endingText) {
  const h1 = document.createElement("h1"); // Title header: "New Doctor"
  const styledTextSpan = document.createElement("span");
  h1.textContent = capitalize(startingText);
  styledTextSpan.textContent = capitalize(styledText);
  h1.append(...[styledTextSpan, endingText]);
  return h1;
}

 */
/*
export function createPersonalDataInputs(name, email, password, phone) {
  userFields = [];

  return [
    ...createNameInput(name),
    ...createEmailInput(email),
    ...createPasswordInput(password),
    ...createPhoneInput(phone),
  ]
}

 */

export function showErrorsOfInvalidInputs(invalidUserFields) {
  removeErrorStylingOfInputs();

  invalidUserFields.forEach((userField) => {
    userField.input.classList.add("error-field");
    userField.input.focus();
    userField.errorLabel.textContent = userField.errorMsg;
    //userField.errorLabel.classList.replace("error-label-hide", "error-label-show");
    userField.errorLabel.classList.replace("hide", "show");
  })
}

/*
  Pasar el Array de Userinputs desde el exterior de este módulo, y eliminar la constante exportada "userFields".
 */
function removeErrorStylingOfInputs(userFields) {
  userFields.forEach((userField) => {
    userField.input.classList.remove("error-field");
    userField.errorLabel.textContent = "";
    //userField.errorLabel.classList.replace("error-label-show", "error-label-hide");
    userField.errorLabel.classList.replace("show", "hide");
  });
}

export function parsePhoneToOnlyNumbers(phone) {
  return phone.replaceAll("-", "");
}

export function clearModalContents() {
  document.getElementById("modalContent")?.classList.remove("login-modal"); // TODO: revisar el problema con el "?"
  document.getElementById("modalHeader")?.replaceChildren();
  document.getElementById("modalBody")?.replaceChildren();
  document.getElementById("modalFooter")?.replaceChildren();
}
/*
function createNameInput(name) {
  const label = document.createElement("label");
  const input = document.createElement("input");
  const errorLabel = document.createElement("label");

  label.textContent = "Name";
  label.setAttribute("for", "name");
  input.type = "text";
  input.required = true;
  input.value = name;
  input.id = "name";
  input.name = "Name";
  input.placeholder = "Type full name";
  input.classList.add("input-field");
  errorLabel.id = "nameErrorLabel";
  //errorLabel.classList.add("error-label", "error-label-hide");
  errorLabel.classList.add("error-label", "hide");

  userFields.push({
    label: label,
    input: input,
    errorLabel: errorLabel,
  });

  return [
    label,
    input,
    errorLabel,
  ];
}

function createEmailInput(email) {
  const label = document.createElement("label");
  const input = document.createElement("input");
  const errorLabel = document.createElement("label");

  label.textContent = "Email"; // Email address??
  label.setAttribute("for", "email");
  input.type = "email";
  input.required = true;
  input.value = email;
  input.id = "email";
  input.name = "Email";
  input.placeholder = "e.g. yourname@smartclinic.com";
  input.classList.add("input-field");
  errorLabel.id = "emailErrorLabel";
  //errorLabel.classList.add("error-label", "error-label-hide");
  errorLabel.classList.add("error-label", "hide");

  userFields.push({
    label: label,
    input: input,
    errorLabel: errorLabel,
  });

  return [
    label,
    input,
    errorLabel,
  ];
}

function createPasswordInput(password) {
  const label = document.createElement("label");
  const input = document.createElement("input");
  const errorLabel = document.createElement("label");

  // Toggle password to text type and vice versa.
  label.textContent = "Password";
  label.setAttribute("for", "password");
  input.type = "password";
  input.required = true;
  input.value = password;
  input.id = "password";
  input.name = "Password";
  input.placeholder = "️Type your password";
  input.classList.add("input-field");
  errorLabel.id = "passwordErrorLabel";
  //errorLabel.classList.add("error-label", "error-label-hide");
  errorLabel.classList.add("error-label", "hide");

  userFields.push({
    label: label,
    input: input,
    errorLabel: errorLabel,
  });

  return [
    label,
    input,
    errorLabel,
  ];
}

function createPhoneInput(phone) {
  const label = document.createElement("label");
  const input = document.createElement("input");
  const errorLabel = document.createElement("label");

  label.textContent = "Phone number";
  label.setAttribute("for", "phone");
  input.type = "tel";
  input.required = true;
  input.value = phone;
  input.id = "phone";
  input.name = "Phone";
  input.placeholder = "️e.g. 123-45-678-90";
  input.pattern = "[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{2}";
  input.classList.add("input-field");
  errorLabel.id = "passwordErrorLabel";
  //errorLabel.classList.add("error-label", "error-label-hide");
  errorLabel.classList.add("error-label", "hide");

  userFields.push({
    label: label,
    input: input,
    errorLabel: errorLabel,
  });

  return [
    label,
    input,
    errorLabel,
  ];
}
*/


//export default SharedModal;