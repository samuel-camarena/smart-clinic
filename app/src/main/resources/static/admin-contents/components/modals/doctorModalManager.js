//import { showDashboardModal, hideDashboardModal } from "../../adminDashboard.js";
import * as ModalsUtils from "../../../common-contents/components/modals/commonModalUtils.js";
import * as Config from "../../../common-contents/config/config.js";

const DASHBOARD_MODAL_ID = "adminDashboardModal";

/**
 * Types: "registration", "deletion"
 * @param modalType
 * @param dataToPopulate
 */
export function open(modalType, dataToPopulate) {
  getDocumentBodyEl().appendChild(createDashboardModalEl());
  ModalsUtils.clearModalContents();
  if (modalType === "deletion") {
    setupDoctorConfirmDialog(modalType, dataToPopulate);
  } else {
    setupDoctorFormularyModal(modalType, dataToPopulate); // Setups both New Doctor and Update one with populated data.
  }

  addEventListeners(modalType);
  show();
}

export function getDoctorFromFormulary() {
  const name = document.getElementById("name").value;
  const specialty = document.getElementById("specialty").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const phoneToParse = document.getElementById("phone").value;
  const phone = ModalsUtils.parsePhoneToOnlyNumbers(phoneToParse);

  //TODO: const availableTimes = document.getElementById("availableTimes").value;
  // checkGroup = document.getElementById("avalilableTimeChecGroup") -> div
  // checkGroup.querySelectorAll(input[name*="availableTimes"]:checked)
  // Comprobar el Elemento FieldGroup para agrupar campos.
  // Cambiar: document.querySelectorAll -> modal.querySelectorAll
  const checkboxes = document.querySelectorAll('input[name="availability"]:checked');
  const availableTimes =
      Array.from(checkboxes)
          .map(cb =>
              cb.value);

  const yearsOfExperience = document.getElementById("yearsOfExperience").value;
  const clinicAddress = document.getElementById("clinicAddress").value;
  const rating = document.getElementById("rating").value;

  if (checkInputMissingValues()) {
      return null;
  }

  const doctor =
      { name, specialty, email, password, phone, availableTimes, yearsOfExperience, clinicAddress, rating };

  if (document.getElementById("id").value !== "") {
      doctor.id = document.getElementById("id").value;
  }
  return doctor;
}

export function showErrorsOfInvalidInputs(errFields) {
  ModalsUtils.showErrorsOfInvalidInputs(errFields);
  // control de errores de este Modal para sus Inputs particulares (yearsOfExperience, Rating, etc...).
}

export function close() {
  ModalsUtils.clearModalContents();
  hide();
}

function createDashboardModalEl() {
  const modal = document.createElement("div");
  const container = document.createElement("div");
  const closeBtn = document.createElement("span");
  const header = document.createElement("header");
  const body = document.createElement("div");
  const footer = document.createElement("footer");

  modal.className = "modal dashboard-modal";
  modal.id = DASHBOARD_MODAL_ID;
  modal.role = "dialog";
  container.className = "modal-box"; // TODO: cambiar a modal-box
  container.id = "modalContent"; // lo mismo, modalContainer.
  closeBtn.className = "close";
  closeBtn.textContent = "&times";
  closeBtn.id = "closeModalBtn";
  header.className = "modal-header";
  header.id = "modalHeader";
  body.className = "modal-body";
  body.id = "modalBody";
  footer.className = "modal-footer";
  footer.id = "modalFooter";

  container.append(
    closeBtn,
    header,
    body,
    footer,
  );
  modal.appendChild(container);
  return modal;
}

function checkInputMissingValues() {
  let isMissingValues = false;
  let invalidUserFields = [];

  ModalsUtils.userFields
    .forEach((field) => {
      if (field.input.validity.valueMissing) {
        invalidUserFields.push({
          input: field.input,
          errorLabel: field.errorLabel,
          errorMsg: `${field.input.name} ${Config.USER_FIELD_ERROR_NOT_BLANK_MSG}`,
        });
        isMissingValues = true;
      }
    });

  if (isMissingValues) {
    showErrorsOfInvalidInputs(invalidUserFields);
  }
  return isMissingValues;
}

function setupDoctorFormularyModal(modalType, dataToPopulate) {
  let footerType = "enroll";
  if (modalType === "edit") {
    footerType = "update";
  }

  document.getElementById("modalContent").classList.add("admin-modal");

  document.getElementById("modalHeader")
    .append(ModalsUtils.createStyledTitleAndCloseBtnEl(`${modalType} `, "Doctor", ""));
  document.getElementById("modalBody")
    .append(...createDoctorFormulary(dataToPopulate));
  document.getElementById("modalFooter")
    .append(...createDoctorFooterModal(footerType));
}

function setupDoctorConfirmDialog(dialogType, doctorId) {
 switch (dialogType) {
   case "delete":
     if (!confirm("Please confirm doctor deletion! of Doctor: " + doctorId)) {
       return;
     }

     break;
   default:
     break;
 }
}

function createDoctorFormulary(doctorDataToPopulate) {
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

  return [
    ...ModalsUtils.createPersonalDataInputs(name, email, password, phone),
    ...createSpecialtySelect(specialty),
    createAvailableTimesCheckboxes(availableTimes),
    ...createProfessionalInputs(yearsOfExperience, clinicAddress, rating, id),
  ];
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

function createAvailableTimesCheckboxes(availableTimes) {
  const container = document.createElement("div");
  container.classList.add("availability-container");

  const caption = document.createElement("label");
  caption.classList.add("availability-label");
  caption.textContent = "Select Availability:";

  const checkboxGroup = document.createElement("div");
  checkboxGroup.id = "availabilityCheckboxesGroup";
  checkboxGroup.classList.add("checkboxes-group");
  for (let option in Config.AVAILABLE_TIMES_SELECT_OPTIONS) {
    const label = document.createElement("label");
    //label.classList.add("checkbox-group");

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.value = Config.AVAILABLE_TIMES_SELECT_OPTIONS[option];
    checkBox.name = "availability";
    if (availableTimes.includes(Config.AVAILABLE_TIMES_SELECT_OPTIONS[option])) {
      checkBox.checked = true;
    }
    label.appendChild(checkBox);
    label.append(option);
    checkboxGroup.appendChild(label);
  }

  container.appendChild(caption);
  container.appendChild(checkboxGroup);
  return container;
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

function createDoctorFooterModal(footerType) {
  document.getElementById("modalFooter").classList.add("form-doctor-footer");
  const primaryBtn = document.createElement("button");
  switch (footerType) {
    case "enroll":
      primaryBtn.textContent = "Enroll";
      primaryBtn.id = "enrollDoctorBtn";
      primaryBtn.classList.add(...["form-doctor-btn", "form-doctor-primary-btn"]); // class: dashboard-btn
      primaryBtn.addEventListener('click', document.enrollDoctor);
      break;

    case "update":
      primaryBtn.textContent = "Update";
      primaryBtn.id = "updateDoctorBtn";
      primaryBtn.classList.add(...["form-doctor-btn", "form-doctor-primary-btn"]); // class: dashboard-btn
      primaryBtn.addEventListener('click', document.updateDoctor);
      break;

    default:
      break;
  }

  const separator = document.createElement("div");
  separator.classList.add("form-doctor-div-separator");

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.id = "cancelDoctorBtn";
  cancelBtn.classList.add(...["form-doctor-btn", "form-doctor-secondary-btn"]);

  return [
    cancelBtn,
    separator,
    primaryBtn
  ];
}

function addEventListeners(modalType) {
  // TODO: Minimizar modal en vez de cerrar para conservar datos introducidos hasta pulsar "Cancel" o "Save / Update".
  document.getElementById("closeModalBtn")?.addEventListener("click", hide);
  document.getElementById("cancelDoctorBtn")?.addEventListener("click", close);
}

function hide() {
  getDashboardModalEl().style.display = "none";
}

function show() {
  getDashboardModalEl().style.display = "block";
}

function getDashboardModalEl() {
  return document.getElementById(DASHBOARD_MODAL_ID);
}

function getDocumentBodyEl() {
    return document.getElementsByTagName("body")[0];
}