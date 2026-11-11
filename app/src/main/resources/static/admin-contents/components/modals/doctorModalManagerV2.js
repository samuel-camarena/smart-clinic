import * as ModalsUtils from "../../../common-contents/components/modals/commonModalUtils.js";
import * as Config from "../../../common-contents/config/config.js";
import * as ModalFactory from "./entityModalsFactory.js";
//import {userFields} from "../../../common-contents/components/modals/commonModalUtils.js";
import * as ModalProps from "./doctorModalProps.js";
//import {getAvailableTimesCheckboxesProps} from "./doctorModalProps.js";

const DOCTOR_MODAL_ID = "doctorModal";

/**
 * Types: "registration", "deletion"
 * @param modalType
 * @param dataToPopulate
 * @param modalProps
 */
//export function open(modalType, dataToPopulate, modalProps) {
export function open(modalType, modalProps) {
  initEventHandlers(); // setupEnventHandlers();
  // TODO: Pattern para Password y toggle de ojo para password to text visibilidad
  // pattern: "[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{2}";
  // TODO: Hay que eliminar el campo Clinic Address de la Entidad Doctores en BBDD.
  // TODO:
  let doctorModalType;
  switch (modalType) {
    case "register":
      doctorModalType = "doctorRegister";
      break;
    case "edit":
      doctorModalType = "doctorEdit";
      break;
    case "delete":
      doctorModalType = "doctorDelete";
      break;
    default:
      break;
  }
  //const doctorModalProps = setupDoctorModalProps(modalProps, modalType, modalProps.props.resource.value);
  const doctorModalProps = ModalProps.getProps(modalType, modalProps.props.resource.value);
  // llamada a getModalProps(modalType)

  getDocumentBodyEl().appendChild(
    ModalFactory.createEl(doctorModalType, doctorModalProps)
  );

  if (modalType === "delete") {
    setupDoctorConfirmDialog(modalType, dataToPopulate);
  } else {
    // setupDoctorFormularyModal(modalType, dataToPopulate); // Setups both New Doctor and Update one with populated data.
  }
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
  // sustituir fade-in por fade-out
  // esperar 3s capturando "animationend"
  // remove().
  document.getElementById(DOCTOR_MODAL_ID).remove();
}

function setupDoctorModalProps(modalProps, modalType, doctorDataToPopulate) {
  // TODO: modalProps implementa la Interfaz de ModalProps y está cumplimentada con los Estilos (className), aquí mapeamos los DoctorData a esa estructura definida por la Interfaz ModalProps.
  return {
    props: {
      ...modalProps.props,
      className: '',
      type: modalType,
      dataToPopulate: doctorDataToPopulate,
    },
    children: [
      setupHeaderProps(modalProps),
      setupBodyProps(modalProps, doctorDataToPopulate),
      setupFooterProps(modalProps),
    ]
  };
}

function setupHeaderProps(modalProps) {
  return {
    props: {
      type: modalProps.type,
      size: modalProps.size,
      resource: modalProps.resource,
      events: modalProps.events,
    },
    children: []
  };
}

function setupBodyProps(modalProps, doctorDataToPopulate) {
  return {
    props: {
      type: modalProps.type,
      name: 'body',
      size: modalProps.size,
      resource: modalProps.resource,
    },
    children: [
      setupDoctorFormularyProps(doctorDataToPopulate, modalProps)
    ]
  };
}

function setupFooterProps(modalProps) {
  return {
    props: {
      type: modalProps.type,
      size: modalProps.size,
      resource: modalProps.resource,
    },
    children: []
  };
}

function setupDoctorFormularyProps(doctorDataToPopulate, modalProps) {
  const {
    name = '',
    specialty = '',
    email = '',
    password = '',
    phone = '',
    availableTimes = '',
    yearsOfExperience = '',
    clinicAddress = '',
    rating = '',
    id = '',
    photoName = '',
  } = doctorDataToPopulate;

  return {
    props: {
      type: 'formulary',
      name: 'registerDoctor',
      className: '',
      action: '',
      method: '',
    },
    children: [
      ModalProps.mapDoctorDataToPersonalDataInputsProps(name, email, password, phone),
      ModalProps.getSpecialtySelectProps(),
      ModalProps.getAvailableTimesCheckboxesProps(availableTimes), // TODO: Cambiar la devolución de Elementos HTML a Props, buscar el Specialty Select Props ya hecho en ControlsSection.
      ModalProps.mapDoctorDataToProfessionalDataInputsProps(yearsOfExperience, rating, id)
    ]
  };
  // llamar a Factory con los Props de Formulario.
  /*
   form.append(
    ...Factory.createPersonalDataInputs(name, email, password, phone),
    ...Factory.createSpecialtySelect(specialty),
    Factory.createAvailableTimesCheckboxes(availableTimes),
    ...Factory.createProfessionalInputs(yearsOfExperience, clinicAddress, rating, id),
  );
  return form;
   */
}

function checkInputMissingValues() {
  let isMissingValues = false;
  let invalidUserFields = [];

  ModalFactory.userInputEls.forEach((field) => {
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

function initEventHandlers() {
  initGlobalEventHandlers();
}

function initGlobalEventHandlers() {
  document.closeModal = close;//
}

function getDocumentBodyEl() {
  return document.querySelector("body");
}

