import * as Config from "../../../common-contents/config/config.js";
import { LoginDTO } from "../../DTO/LoginDTO.js";
//import * as UserInputComponent from "../../../common-contents/ui/components/basics/user-inputs/UserInput.js"
import * as ModalProps from "./loginModalProps.js";
import * as ModalFactory from "../../../admin-contents/components/modals/entityModalsFactory.js"

// let idInput;
// let idLabel;
// let idErrorLabel;
// let passwordInput;
// let passwordLabel;
// let passwordErrorLabel;

export function open(role) {
  const modalType = "login";
  //const resourceType = "user";

  //validateRoleArgument(role);

  getDocumentBodyEl().appendChild(
    ModalFactory.createEl(modalType, ModalProps.getProps())
  )
}

export function getLoginDTO() {
  if (checkInputMissingValues()) {
    return null;
  } else {
    return new LoginDTO(getIdInputEl()?.value, getPasswordInputEl()?.value);
  }
}

export function showErrorsOfInvalidInputs(errFields) {
  removeErrorStylingFromInputs();
  if (errFields.identifier && getIdInputEl() && getIdComplementaryTextEl()) {
    getIdInputEl().classList.add("error");
    getIdInputEl().focus();
    getIdComplementaryTextEl().textContent = errFields.identifier[0]; // Config.LOGIN_ERR_WRONG_IDENTIFIER_MSG;
    getIdComplementaryTextEl().classList.replace("hide", "show");
  }
  if (errFields.password && getPasswordInputEl() && getPasswordComplementaryTextEl()) {
    getPasswordInputEl().classList.add("is-field-valid");
    getPasswordComplementaryTextEl().textContent = errFields.password[0]; // Config.LOGIN_ERR_WRONG_PASSWORD_MSG; // LOGIN_WARN_PASSWORD_CAPSLOCK_MSG
    getPasswordComplementaryTextEl().classList.replace("hide", "show"); // no utilizar "error-hide" pues ya se configura display: none y transparente en .login-modal .error-span {
  }
}

function checkInputMissingValues() {
  let isMissingValues = false;
  if (getIdInputEl()?.validity.valueMissing) {
    showErrorsOfInvalidInputs({ identifier: [Config.LOGIN_ERR_IDENTIFIER_NOT_BLANK_MSG] });
    isMissingValues = true;
  }
  if (getPasswordInputEl()?.validity.valueMissing) {
    showErrorsOfInvalidInputs({ password: [Config.LOGIN_ERR_PASSWORD_NOT_BLANK_MSG] });
    isMissingValues = true;
  }
  return isMissingValues;
}

//function removeErrorStyling() ... // Queda claro que "quita", "Error" , "Estilo visual", podemos usar como función directora de orquesta para todo el Modal
function removeErrorStylingFromInputs(...inputs) {
  getIdInputEl()?.classList.remove("error");
  if (getIdComplementaryTextEl()) {
    getIdComplementaryTextEl().textContent = "";
    getIdComplementaryTextEl().classList.replace("show", "hide");
  }

  getPasswordInputEl()?.classList.remove("is-field-valid");
  if (getPasswordComplementaryTextEl()) {
    getPasswordComplementaryTextEl().textContent = "";
    getPasswordComplementaryTextEl().classList.replace("show", "hide");
  }
}

/*
On Input change
 */
/*
function checkFormularyValidationIntegrity() {
    const idEl = document.getElementById("identifier");
    const passEl = document.getElementById("password");

    if (idInput.value.trim() === "") {
        if (idEl.name === "idByEmail") {
            document.createElement("label").style.display = "block";
        }
    }
}
*/

function getDocumentBodyEl() {
  return document.querySelector("body");
}

function getIdInputEl() {
  return document.getElementById(ModalProps.IDENTIFIER_INPUT_ID) ;
}

function getIdComplementaryTextEl() {
  return document.getElementById(ModalProps.IDENTIFIER_COMPLEMENTARY_TEXT_ID);
}

function getPasswordInputEl() {
  return document.getElementById(ModalProps.PASSWORD_INPUT_ID);
}

function getPasswordComplementaryTextEl() {
  return document.getElementById(ModalProps.PASSWORD_COMPLEMENTARY_TEXT_ID);
}