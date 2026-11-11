import { capitalize } from "../../../common-contents/utils/util.js";
//import { close } from "./doctorModalManagerV2.js";
import * as Config from "../../../common-contents/config/config.js";
import * as Props from "../../../auth-contents/components/modals/loginModalProps.js";
import * as UserInputComponent from "../../../common-contents/ui/components/basics/user-inputs/UserInput.js";


const DOCTOR_MODAL_ID = "doctorModal";
const LOGIN_MODAL_ID = "loginModal";
export let userInputEls = [];

//export function createEl(modalType, dataToPopulate, modalProps) {
export function createEl(modalType, { props, children }) {
  // TODO: modalProps debe contener el id del Modal -> DOCTOR_MODAL_ID = "doctorModal".
  //  No podemos duplicar el ID en el Padre doctorModalManagerV2, ni importarlo (importación Padre-Hijo-Padre).
  const overlayProps = children[0];
  const boxProps = overlayProps["children"][0];
  const headerProps = boxProps["children"][0]; //createHeaderEl(modalType, "Doctor", ""),
  const bodyProps = boxProps["children"][1];
  const footerProps = boxProps["children"][2];

  const modal = createModalEl({ props, children });
  const overlay = createModalOverlayEl(overlayProps);
  const modalBox = createModalBoxEl(boxProps);
  //let resource;
  let isFooterNeeded = false;

  switch (modalType) {
    case "login":
      props["attributes"].set("id", LOGIN_MODAL_ID);
      props["classList"].push("login-modal");
      isFooterNeeded = true;
      break;
    case "doctorRegister":
      props["attributes"].set("id", DOCTOR_MODAL_ID);
      props["classList"].push("doctor-modal");
      break;
    case "doctorEdit":
      props["attributes"].set("id", DOCTOR_MODAL_ID);
      props["classList"].push("doctor-modal");
      break;
    case "doctorDelete":
      props["attributes"].set("id", DOCTOR_MODAL_ID);
      props["classList"].push("doctor-modal");
      break;
    case "patientEdit":
      break;
    case "patientRegister":
      break;
    case "patientDelete":
      break;
    case "appointmentEdit":
      break;
    case "appointmentRegister":
      break;
    case "appointmentDelete":
      break;
    default:
      break;
  }

  modalBox.append(
    createHeaderEl(modalType, headerProps),
    createBodyEl(modalType, bodyProps)
  );

  if (isFooterNeeded) {
    modalBox.appendChild(
      createFooterEl(modalType, footerProps)
    );
  }

  overlay.appendChild(modalBox);
  modal.appendChild(overlay);
  return modal;
}

function createModalEl({ props, children }) {
  const modal = document.createElement("div");
  applyAttributesToElement(modal, props["attributes"]);
  applyStyleClassesToElement(modal, props["classList"]);
  return modal;
}

function createModalOverlayEl({ props }) {
  const overlay = document.createElement("div");
  applyAttributesToElement(overlay, props["attributes"]); //overlay.id = LOGIN_MODAL_ID;
  applyStyleClassesToElement(overlay, props["classList"]); // "modal", "login-modal" o "doctor-modal", "fade-in"
  return overlay;
}

// TODO: ¿quizás cambiar de ModalContainer a ModalBox?
function createModalBoxEl({ props }) {
  const container = document.createElement("div");
  applyStyleClassesToElement(container, props["classList"]); //container.role = "formulary";
  // incluye el Formulario dentro de Body, y los Botones del Formulario dentro de Footer.
  // container.setAttribute("id", "loginModalBox");
  applyAttributesToElement(container, props["attributes"]);
  return container;
}

/*
function createHeaderEl(modalType, entityType) {
  const header = document.createElement("header");
  //header.className = "header";
  //header.id = "modalHeader";

  header.append(
    createStyledTitleEl(`${modalType} `, "Doctor", ""),
    createCloseButtonEl(null)
  );
  return header;
}
 */

function createHeaderEl(modalType, { props, children }) {
  const header = document.createElement("header");
  header.append(
    createInlineTitleWithSubtitleEl(children[0]),
    createCloseButtonEl(children[1]),
  );
  return header;
}

//export function createBodyEl(modalType, dataToPopulate) {
function createBodyEl(modalType, { props, children }) {
  const body = document.createElement("div");
  applyAttributesToElement(body, props["attributes"]);
  applyStyleClassesToElement(body, props["classList"]);

  let formEl;
  switch (modalType) {
    case "login":
      formEl = createLoginFormularyEl(children[0]);
      break;
    case "doctorRegister":
    case "doctorEdit":
    case "doctorDelete":
      formEl = createDoctorFormularyElV2(children[0], props["dataToPopulate"]);
      break;
    default:
      break;
  }
  /*
  body.appendChild(
    createDoctorFormularyEl(modalProps.props.dataToPopulate)
  );
   */
  body.appendChild(formEl);
  return body;
}

function createFooterEl(modalType, { props, children }) {
  const footer = document.createElement("footer");
  //footer.classList.add("modal-footer", "login-footer"); // quizás al descomponer utilizaremos un "login-modal-footer"
  applyAttributesToElement(footer, props["attributes"]); // footer.setAttribute("id", "modalFooter");
  applyStyleClassesToElement(footer, props["classList"]);
  /*
  let footerType = "register";
  if (modalType === "edit") {
    footerType = "update";
  }

   */

  //footer.append(...createFooterButtonEls(footerType));
  footer.append(
    ...createFooterLinkEls()
  );
  return footer;
}

function createInlineTitleWithSubtitleEl({ props, children }) {
  const container = document.createElement("div");
  const h1 = document.createElement("h1"); // Title header: "New Doctor"
  const h2 = document.createElement("h2");

  h1.textContent = children[0]["props"]["textContent"]; // titleProps
  h2.textContent = children[1]["props"]["textContent"]; // subtitleProps
  applyStyleClassesToElement(container, props["classList"]);

  container.append(
    h1,
    h2
  );
  return container;
}

function createLoginFormularyEl({ props, children }) {
  const form = document.createElement("form");
  applyAttributesToElement(form, props["attributes"]); //form.setAttribute("action", props["action"]);
  form.addEventListener(props["eventListener"]["type"], props["eventListener"]["handler"]);

  form.append(
    UserInputComponent.createEl(children[0]),
    UserInputComponent.createEl(children[1]),
    createInlineButtonEl(children[2])
  );
  return form;
}
/*
function createDoctorFormularyEl({ props, children }, doctorDataToPopulate) {
  const {
    name = "",
    specialty = "",
    email = "",
    password = "",
    phone = "",
    availableTimes = "",
    yearsOfExperience = "",
    clinicAddress = "",
    rating = "",
    id = "",
    photoName = "",
  } = doctorDataToPopulate;


  const form = document.createElement("form");
  form.append(
    ...createPersonalDataInputs(name, email, password, phone),
    ...createSpecialtySelect(specialty),
    createAvailableTimesCheckboxes(availableTimes),
    ...createProfessionalInputs(yearsOfExperience, clinicAddress, rating, id),
    ...createFooterButtonEls("register")
  );
  return form;
}

 */

function createDoctorFormularyElV2({ props, children }) {
  const form = document.createElement("form");

  // TODO: revisar el DataToPopulate que ya no se le pasa a este método, se han introducido los datos de formulario en la creación de Pros.
  const specialty = "";
  const availableTimes = "";

  form.addEventListener(props["eventListener"]["type"], props["eventListener"]["handler"]);

  children.forEach(childrenProps => {
    switch (childrenProps["props"]["component"]["type"]) {
      case "userInput":
        form.appendChild(
          UserInputComponent.createEl(childrenProps)
        )
        break;
      case "inlineButtons":
        form.appendChild(
          createInlineButtonsEls(childrenProps)
        )
        break;
      default:
        break;
    }
  });

  form.append(
    //...createPersonalDataInputs(name, email, password, phone),
    ...createSpecialtySelect(specialty),
    createAvailableTimesCheckboxes(availableTimes),
    //...createProfessionalInputs(yearsOfExperience, clinicAddress, rating, id),
    //...createFooterButtonEls("register")
  );
  return form;
}

function createCloseButtonEl({ props, children }) {
  const btn = document.createElement("button");
  // TODO: Cambiar por Icono SVG.
  //const icon = document.createElement("i");
  const tempIcon = document.createElement("span");

  applyAttributesToElement(btn, props["attributes"]);
  //btn.textContent = props["textContent"];
  btn.addEventListener(props["eventListener"]["type"], props["eventListener"]["handler"])
  tempIcon.textContent = "x";
  tempIcon.classList.add("icon-container");

  btn.appendChild(tempIcon);
  return btn;
}

function createStyledTitleEl(startingText, styledText, endingText) {
  const h1 = document.createElement("h1"); // Title header: "New Doctor"
  const styledTitleText = document.createElement("span");
  h1.textContent = capitalize(startingText);
  styledTitleText.textContent = capitalize(styledText);
  h1.append(
    ...[
      styledTitleText,
      endingText
    ]
  );
  return h1;
}

// TODO: Creación mediante Props
function createPersonalDataInputs(name, email, password, phone) {
  userInputEls = [];
  /*
  return [
    ...createNameInput(name),
    ...createEmailInput(email),
    ...createPasswordInput(password),
    ...createPhoneInput(phone),
  ]

   */
  return [

  ]

}

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

  userInputEls.push({
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
  input.name = "email"; // antes "Email"
  input.placeholder = "e.g. yourname@smartclinic.com";
  input.classList.add("input-field");
  errorLabel.id = "emailErrorLabel";
  //errorLabel.classList.add("error-label", "error-label-hide");
  errorLabel.classList.add("error-label", "hide");

  userInputEls.push({
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
  input.name = "password"; // antes "Password"
  input.placeholder = "️Type your password";
  input.classList.add("input-field");
  errorLabel.id = "passwordErrorLabel";
  //errorLabel.classList.add("error-label", "error-label-hide");
  errorLabel.classList.add("error-label", "hide");

  userInputEls.push({
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
  input.name = "phone"; // antes Phone
  input.placeholder = "️e.g. 123-45-678-90";
  input.pattern = "[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{2}";
  input.classList.add("input-field");
  errorLabel.id = "phoneErrorLabel";
  //errorLabel.classList.add("error-label", "error-label-hide");
  errorLabel.classList.add("error-label", "hide");

  userInputEls.push({
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

function createProfessionalInputs(yearsOfExperience, clinicAddress, rating, id) {
  const yearsInput = document.createElement("input");
  const yearsLabel = document.createElement("label");
  yearsInput.type = "number";
  yearsInput.min = "0";
  //years.max = "0";
  yearsInput.value = yearsOfExperience;
  yearsInput.id = "yearsOfExperience";
  yearsInput.classList.add("input-field");
  yearsLabel.textContent = "Years of Experience";

  const clinicAddressInput = document.createElement("input");
  const clinicLabel = document.createElement("label");
  clinicAddressInput.type = "text";
  clinicAddressInput.value = clinicAddress;
  clinicAddressInput.id = "clinicAddress";
  clinicAddressInput.placeholder = "Clinic Address...";
  clinicAddressInput.classList.add("input-field");
  clinicLabel.textContent = "Clinic Address";

  const ratingInput = document.createElement("input");
  const ratingLabel = document.createElement("label");
  ratingInput.type = "number";
  ratingInput.min = "0";
  ratingInput.max = "5"
  ratingInput.value = rating;
  ratingInput.id = "rating";
  ratingInput.classList.add("input-field");
  ratingLabel.textContent = "Rating";

  const idHidden = document.createElement("input");
  idHidden.type = "hidden";
  idHidden.value = id;
  idHidden.id = "id";

  return [
    yearsLabel,
    yearsInput,
    clinicLabel,
    clinicAddressInput,
    ratingLabel,
    ratingInput,
    idHidden
  ]
}

function createAvailableTimesCheckboxes(availableTimes) {
  const container = document.createElement("div");
  const caption = document.createElement("label");
  const checkboxGroup = document.createElement("div");

  container.classList.add("availability-container");
  caption.classList.add("availability-label");
  // TODO: [Security] Sustituir textContent por Trusted Types, are enforced by a CSP.
  caption.textContent = "Select Availability:";
  checkboxGroup.setAttribute("id", "availabilityCheckboxesGroup");
  checkboxGroup.classList.add("checkboxes-group");

  for (let option in Config.AVAILABLE_TIMES_SELECT_OPTIONS) {
    const label = document.createElement("label");
    const checkBox = document.createElement("input");

    label.classList.add("availability-checkbox-label");
    checkBox.type = "checkbox";
    checkBox.value = Config.AVAILABLE_TIMES_SELECT_OPTIONS[option];
    checkBox.name = "availability";
    checkBox.classList.add("availability-checkbox");
    // TODO: const isChecked = availableTimes.includes(checkboxGroupOptionsData[optionData]);
    if (availableTimes.includes(Config.AVAILABLE_TIMES_SELECT_OPTIONS[option])) {
      checkBox.checked = true;
    }
    label.append(
      checkBox,
      option
    );
    checkboxGroup.appendChild(label);
  }

  container.appendChild(caption);
  container.appendChild(checkboxGroup);
  return container;
}

function createSpecialtySelect(selectedSpecialty) {
  const select = document.createElement("select");
  const specialtyLabel = document.createElement("label");
  select.id = "specialty";
  //select.showPicker();
  select.classList.add("input-field", "form-doctor-select-dropdown");
  specialtyLabel.textContent = "Medical Specialization"

  const opCaption = document.createElement("option");
  opCaption.value = "''";
  opCaption.textContent = "Specialty";
  select.add(opCaption);

  Config.SPECIALTIES
    .forEach((option) => {
      const op = document.createElement("option");
      op.value = option;
      op.textContent = option;
      if (option === selectedSpecialty) {
        op.selected = true;
      }
      select.add(op);
    });

  return [
    specialtyLabel,
    select
  ];
}
/*
function createSubmitButtonEl({ props, children }) {
  const btn = document.createElement("button");
  btn.textContent = props["textContent"];
  applyAttributesToElement(btn, props["attributes"]);
  applyStyleClassesToElement(btn, props["classList"]);
  return btn;
}
 */

function createInlineButtonsEls({ props, children }) {
  const container = document.createElement("span");
  applyAttributesToElement(container, props["attributes"]);
  applyStyleClassesToElement(container, props["classList"]);
  // props es del contendor
  // -- porner los props

  // children son los botones.
  children.forEach(buttonProps => {
    container.appendChild(
      createButtonEl(buttonProps)
    );
  })
  return container;
}

function createInlineButtonEl({ props, children }) {
  // TODO: Utilizamos un contenedor Inline (span) para un único botón. Por consistencia con "createInlineSubmitButtonEls( ... )" y "createColumnSubmitButtonEls( ... )
  const container = document.createElement("span");
  applyAttributesToElement(container, props["attributes"]);
  applyStyleClassesToElement(container, props["classList"]);

  /*
  btn.textContent = props["textContent"];
  applyAttributesToElement(button, props["attributes"]);
  applyStyleClassesToElement(button, props["classList"]);

   */
  container.appendChild(
    createButtonEl(children[0])
  );
  return container;
}

// TODO: Método repetido en archivo InlineControlsSection.js
function createButtonEl({ props, children }) {
  const btn = document.createElement("button");

  applyAttributesToElement(btn, props["attributes"]);
  applyStyleClassesToElement(btn, props["classList"]);

  if (props.textContent) {
    btn.textContent = props.textContent;
  }
  if (props?.eventListener?.type && props?.eventListener?.handler) {
    btn.addEventListener(
      props.eventListener.type,
      props.eventListener.handler,
    );
  }

  return btn;
}

function createFooterLinkEls() {
  const forgottenPassText = document.createElement("p");
  const forgottenPassLink = document.createElement("a");
  const notRegisteredYetText = document.createElement("p");
  const notRegisteredYetLink = document.createElement("a");

  forgottenPassText.textContent = "Forgotten password? ";
  forgottenPassLink.href = "#";
  forgottenPassLink.textContent = "click this link for Help";
  notRegisteredYetText.textContent = "If yoy don`t have login credentials, ";
  notRegisteredYetLink.href = "#";
  notRegisteredYetLink.textContent = "click this to Register" ;

  forgottenPassText.appendChild(forgottenPassLink);
  notRegisteredYetText.appendChild(notRegisteredYetLink);
  return [
    forgottenPassText,
    notRegisteredYetText,
  ];
}
/*
function createFooterButtonsEls(footerType) {
  const primaryButton = document.createElement("button");
  const cancelBtn = document.createElement("button");

  switch (footerType) {
    case "register":
      primaryButton.textContent = "Register";
      primaryButton.classList.add(...["form-doctor-button", "form-doctor-primary-button"]);
      primaryButton.primaryButton.addEventListener("click", document.registerDoctor);
      break;
    case "update":
      primaryButton.textContent = "Update";
      primaryButton.classList.add(...["form-doctor-button", "form-doctor-primary-button"]);
      primaryButton.addEventListener("click", document.updateDoctor);
      break;
    default:
      break;
  }

  primaryButton.textContent = "Cancel";
  primaryButton.classList.add(...["form-doctor-button", "form-doctor-secondary-button"]);
  // TODO: asignar el Event.handler desde modalProps -> document.closeModal
  primaryButton.addEventListener("click", document.closeModal);

  return [
    cancelButton,
    primaryButton
  ];
}
*/
function applyStyleClassesToElement(element, classList) {
  classList?.forEach((styleClass) => {
    if (styleClass !== "")
      element.classList.add(styleClass);
  });
}

function applyAttributesToElement(element, attributesMap) {
  attributesMap?.forEach((value, name) => {
    if (value !== "")
      element.setAttribute(name, value);
  });
}
