import * as DoctorService from "../../services/doctorService.js";
import * as Config from "../../../common-contents/config/config.js";
import * as Controls from "./sections/controls-sections/dashboardControlsSectionsManager.js";
import * as Contents from "./sections/contents-sections/dashboardContentsSectionsManager.js";
import * as Modal from "../../components/modals/doctorModalManagerV2.js";
import * as ModalProps from "../../components/modals/doctorModalProps.js"
import {PROPS} from "../../components/modals/doctorModalProps.js";

let searchingNumResults = 0;

export async function init() {
  initEventHandlers();
  const controlsProps = setupControlsSectionsProps('doctors');
  const contentsProps = await setupContentsSectionsProps();
  // TODO: Cambiar getSectionEl por SectionsEls o por Section with PanelsEls
  return [
    Controls.getSectionEl(controlsProps),
    Contents.getSectionEl(contentsProps),
  ];
}

// TODO: Cambiar a verbo
export async function registerDoctor() {
  const doctor = Modal.getDoctorFromFormulary();
  if (doctor === null) {
    return; // showErrorsOfInvalidInputs ... cambiar a petición de mostrar errores desde el Service.
  }
  // TODO: Solucionar PhotoName del Avatar del Doctor.
  const doctorWithPhotoName = {
    ...doctor,
    photoName: "doctor-avatar-photo-10.png"
  };

  const result = await DoctorService.register(doctorWithPhotoName);
  if (result.success) {
    Modal.close(); //alert(Config.DOCTOR_CREATE_NEW_SUCCESS_MSG);
    await reloadInitialContents();
  } else {
    Contents.updateContents(
      setupErrorSectionProps('generic', result.errorDto, 'register')
    );
  }
}

export async function updateDoctor() {
  const doctor = Modal.getDoctorFromFormulary();
  if (doctor === null) {
    return;
  }

  // TODO: Solucionar PhotoName del Avatar del Doctor añadiendola al Formulario de Registro y Edición.
  const doctorWithPhotoName = {
    ...doctor,
    photoName: "doctor-avatar-photo-10.png"
  };

  //const result = await DoctorService.updateDoctor(doctor);
  const result = await DoctorService.update(doctorWithPhotoName);
  if (result.success) {
    //alert(Config.DOCTOR_UPDATE_SUCCESS_MSG);
    Modal.close();

    /*
     TODO: Actualizar los contenidos de MainContentsSection de forma selectiva, solo la Tarjeta de Doctor que sea editado. Reordenar alfabéticamente si fuera necesario.
     - Previamente utilizábamos: window.location.reload();
     */
    await reloadCurrentContents();
  } else {
    //alert(Modal de Errores.showError  ... (result.errorDto));
  }
}

export async function deleteDoctor(doctorId, cardId) {
  try {
    const result = await DoctorService.deleteById(doctorId);
    if (result.success) {
      alert(Config.DOCTOR_DELETE_SUCCESS_MSG);
      Contents.removeContentOfSection(
        'catalog',
        {
          type: 'card',
          cardId: cardId
        });
    } else {
      result.errorDto.customAdhocParams.set("doctorId", doctorId);
      //alert(ContentsSection.composeErrorDtoMsg(result.errorDto, "adminDeleteDoctor"));
      alert("[deleteDoctor]:: " + result.errorDto);
    }
  } catch(e) {
    alert(e);
    console.log(e);
  }
}

export async function updateContentsFromFiltering() {
  // TODO: Interfaz error no DTO si no más bien ErrorProps.
  // TODO: Interfaz SectionProps (+ errorType, errorDto)
  const {
    name,
    specialty,
    amOrPm,
  } = Controls.getFilteringValues();

  const {
    success,
    doctors,
    errorDto
  } = await DoctorService.filter({
    name,
    specialty,
    amOrPm,
  });

  let updatedContentProps;
  updateNumResultsControlSection(doctors?.length);
  if (!success) {
    updatedContentProps = setupErrorSectionProps('notAvailable', errorDto);
  } else if (doctors.length === 0) {
    updatedContentProps = setupErrorSectionProps('notFound', null);
  } else {
    updatedContentProps = setupCatalogProps(doctors, 'doctors');
  }
  Contents.updateContents(updatedContentProps.type, updatedContentProps);
}

async function reloadInitialContents() {
  const {
    success,
    doctors,
    errorDto
  } = await DoctorService.getAll();

  let reloadedContentProps;
  updateNumResultsControlSection(doctors?.length);
  if (!success) {
    reloadedContentProps = setupErrorSectionProps('notAvailable', errorDto);
  } else if (doctors.length === 0) {
    reloadedContentProps = setupErrorSectionProps('notFound', null);
  } else {
    reloadedContentProps = setupCatalogProps(doctors, 'doctors');
  }
  Contents.updateContents(reloadedContentProps);
}

export function setupNumResultsControlSection(numResults) { // setupNumResultsControlSection
  if (numResults) {
    searchingNumResults = numResults;
    Controls.updateNumResultsSection(numResults);
  } else {
    searchingNumResults = 0;
    Controls.updateNumResultsSection(0);
  }
}

function updateNumResultsControlSection(numResults) {
  setupNumResultsControlSection(numResults);
}

async function setupContentsSectionsProps() {
  const result = await DoctorService.getAll();
  setupNumResultsControlSection(result.doctors?.length);
  return getContentsSectionsProps(result);
}

function getContentsSectionsProps({ success, doctors, errorDto }) {
  // TODO: Interfaz SectionProps (+ errorType, errorDto)
  if (!success) {
    return setupErrorSectionProps('notAvailable', errorDto, 'doctors');
  } else if (doctors?.length === 0) {
    return setupErrorSectionProps('notFound', errorDto, 'doctors');
  } else {
    return setupCatalogProps(doctors, 'doctors');
  }
}

function setupErrorSectionProps(errorType, errorDto, funcName) {
  return {
    type: 'error',
    error: {
      type: errorType,
      dto: errorDto | null,
      entity: {
        type: 'doctors'
      },
      funcName: funcName,
    },
  };
}

function setupControlsSectionsProps(entityType) {
  return {
    type: '',
    entity: {
      values: [],
      type: entityType,
    },
    events: [
      {
        name: 'register',
        handler: document.openRegisterFormulary,
      },
    ]
  }
}

function setupCatalogProps(entity, entityType) {
  return {
    type: 'catalog',
    entity: {
      values: entity,
      type: entityType,
    },
    events: [
      {
        name: 'Edit',
        handler: document.openEditFormulary,
      },
      {
        name: 'Delete',
        handler: document.openDeleteDialog,
      }
    ]
  }
}

async function reloadCurrentContents() {
  await updateContentsFromFiltering();
}

function openRegisterFormulary() {
  const modalProps = structuredClone(ModalProps.PROPS);
  modalProps.props.resource.type = 'doctor';
  modalProps.props.resource.value = '';
  Modal.open("register", modalProps);
}

async function openEditFormulary(doctorId) {
  const doctor = await getEntityById(doctorId);

  if (!doctor) {
    alert('Doctor not found to edit, please try again later.')
    return;
  }

  const modalProps = structuredClone(ModalProps.PROPS);
  modalProps.props.resource.type = 'doctor';
  modalProps.props.resource.value = doctor;
  Modal.open('edit', modalProps);
}

async function getEntityById(id) {
  const { success, doctor, errorDto  } = await DoctorService.getById(id);
  if (success) {
    return doctor;
  } else {
    return null;
  }
}

function initEventHandlers() {
  initGlobalEventHandlers();
}

function initGlobalEventHandlers() {
  document.filterByName = updateContentsFromFiltering;
  document.filterBySpecialty = updateContentsFromFiltering;
  document.filterByDayPeriod = updateContentsFromFiltering;
  document.filterByInsurance = updateContentsFromFiltering;
  /*
  document.openEnrollDoctorFormulary = () => {
    document.closeOpenedModalsAndDropdowns();
    Modal.open("enroll", "")
  }
   */
  document.openRegisterFormulary = () => {
    document.closeOpenedModalsAndDropdowns();
    openRegisterFormulary();
  }

  //document.openEditDoctorFormulary = (cardItToGetDoctorData) => {
  //document.openEditDoctorFormulary = (dataToPopulate) => {
  /*
  document.openEditDoctorFormulary = (doctorId) => {
    document.closeOpenedModalsAndDropdowns();
    openEditDoctorFormulary(doctorId);
  }
   */
  document.openEditFormulary = (doctorId) => {
    document.closeOpenedModalsAndDropdowns();
    openEditFormulary(doctorId);
  }

  /*
  document.openDeleteDoctorConfirmDialog = (doctorId) => {
    document.closeOpenedModalsAndDropdowns();
    console.log("Doctor ID: " + doctorId);
    Modal.open("delete", doctorId);
  }
   */
  document.openDeleteDialog = (doctorId) => {
    document.closeOpenedModalsAndDropdowns();
    console.log("Doctor ID: " + doctorId);
    Modal.open("delete", doctorId);
  }
  document.registerDoctor = registerDoctor;
  document.updateDoctor = updateDoctor;
  document.deleteDoctor = async (doctorId, cardId) => {
    await deleteDoctor(doctorId, cardId)
  };
  document.toggleCardsSize = () => {
    //Contents.toggleCardsSize();
    if (document.documentElement.style.getPropertyValue('--card-body-toggle-display') === 'none') {
      document.documentElement.style.setProperty('--card-body-toggle-display', 'flex');
    } else {
      document.documentElement.style.setProperty('--card-body-toggle-display', 'none');
    }
  }
}