import * as DoctorService from "../services/doctorService.js";
import * as SessionManager from "../../../../infrastructure/adapters/storage/sessionManager.js"
import * as CardManager from "../../../components/cards/entityCard.js";
import * as SharedDashboard from "../../../common-contents/dashboards/commonDashboardUtils.js"
import * as Config from "../../../config/config.js";
import * as ModalManager from "../../../../admin-contents/components/modals/adminDashboardModalHandler.js";

export async function setupDoctorsContentsOnInit() {
  const doctors = await loadDoctors();
  if (doctors === null || doctors.length === 0) {
    handleDoctorsNotFound();
    return;
  }

  setupDoctorCards(doctors);
}

export async function setupDoctorsContentsOnChange() {
  SharedDashboard.clearMainContent();
  const name = sanitizeStringParam(filterByNameSearchBar.value.trim());
  const amOrPm = sanitizeStringParam(filterByTimePeriodSelect.value);
  const specialty = sanitizeStringParam(filterBySpecialtySelect.value);

  const { success, doctors, errorDto } = await DoctorService.filterDoctors(name, amOrPm, specialty);
  // TODO: gestión de errores.
  if (!success) {
    handleDoctorsNotAvailable(errorDto);
    return;
  } else if (success && doctors.length === 0) {
    handleDoctorsNotFound(errorDto);
    return;
  }

  setupDoctorCards(doctors);
}
/*
async function filterDoctors(params) {
  try {
    const result = await DoctorService.filterDoctors(params.name, params.amOrPm, params.specialty);
    // TODO: DTO mapper
    return result;
  } catch (e) {
    handleDoctorsNotFound();
    alert("Error loading Doctors");
    console.error("[loadDoctorCards]:: Server response " + (e.error) ? e.error : e.message);
  }
}
*/
export async function createDoctor() {
  const doctor = ModalManager.getDoctorFromFormulary();
  if (doctor === null) {
    return; // showErrorsOfInvalidInputs ... cambiar a petición de mostrar errores desde el Service.
  }
  const result = await DoctorService.saveDoctor(doctor);
  if (result.success) {
    alert(Config.DOCTOR_CREATE_NEW_SUCCESS_MSG);
    ModalManager.close();
    window.location.reload();
  } else {
    //alert(composeErrorDtoMsg(result.errorDto));
    showError(result.errorDto);
  }
}

export async function updateDoctor() {
  const doctor = ModalManager.getDoctorFromFormulary();
  if (doctor === null) {
    return;
  }
  const result = await DoctorService.updateDoctor(doctor);
  if (result.success) {
    alert(Config.DOCTOR_UPDATE_SUCCESS_MSG);
    ModalManager.close();
    window.location.reload();
  } else {
    alert(composeErrorDtoMsg(result.errorDto));
  }
}

export async function deleteDoctor(doctorId, cardId) {
  if (confirm("Please confirm doctor deletion!")) {
    //const result = await deleteDoctor(this.doctorId);
    DoctorService.deleteDoctor(doctorId)
      .then(result => {
        if (result.success) {
          alert(Config.DOCTOR_DELETE_SUCCESS_MSG);
          CardManager.removeCard(cardId);
        } else {
          result.errorDto.customAdhocParams.set("doctorId", doctorId);
          alert(composeErrorDtoMsg(result.errorDto, "adminDeleteDoctor"));
        }
      })
      .catch(reason => {
        alert(reason);
        console.log(reason);
      });
  }
}

// TODO: Revisar el cambio de Promesa a Async / Await
async function loadDoctors() {
  try {
    const result = await DoctorService.getAllDoctors();
    return result.doctors;
  } catch (e) {
    handleDoctorsNotFound();
    alert("Error loading Doctors");
    console.error("[loadDoctorCards]:: Server response " + (e.error) ? e.error : e.message);
  }
}

function setupDoctorCards(doctors) {
  const cards = createDoctorCards(doctors);
  if (cards.length === 0) {
    handleDoctorsNotFound();
    return;
  }
  showDoctorCards(cards);
}

function createDoctorCards(doctors) {
  const role = SessionManager.getRole();
  if (role === "") {
    handleDoctorsNotAvailable();
    return;
  }

  CardManager.init();
  let cards = []
  doctors.forEach((doctor) =>
    cards.push(
      CardManager.createDoctorCard(doctor, role)));
  return cards;
}

function showDoctorCards(cards) {
  const mainDiv = document.getElementById("main");
  SharedDashboard.clearMainContent();
  mainDiv.append(...cards);
}

function handleDoctorsNotAvailable(errorDto) {
  showDoctorsNotAvailableMsg(errorDto);
  console.error(`[showDoctorCards]:: Possible causes:
     \n- No Main Content Div
     \n- Wrong User Role to display doctors.
     \n- ErrorDTO: ${errorDto}`);
}

function handleDoctorsNotFound(errorDto) {
  showDoctorsNotFoundMsg(); // throw new Error() // new RoleMissingError ...
  console.warning("[loadDoctorCards]:: Doctors not found by by the matching criteria" );
}

function showDoctorsNotAvailableMsg() {
  const mainDiv = document.getElementById("main");
  const errorMsgP = document.createElement("p");
  errorMsgP.textContent = "Doctors not available. Please try again later.";
  mainDiv.appendChild(errorMsgP);
}

function showDoctorsNotFoundMsg() {
  const mainDiv = document.getElementById("main");
  const errMsgP = document.createElement("p");
  errMsgP.textContent = "Doctors not found by the matching criteria. Please try again.";
  errMsgP.id = "noDataFoundP";
  mainDiv.appendChild(errMsgP);
}

function sanitizeStringParam(param) {
  return (param !== undefined && param !== null) ? param : "";
}

function composeErrorDtoMsg(errorDto, funcName) {
  try {
    let msg = "", htmlMsg = "";
    if (errorDto.fieldErrors != null) {
      for (let field in errorDto.fieldErrors) {
        msg += `Invalid field: ${field}\n`;
        errorDto.fieldErrors[field]
          .forEach((error) => {
              msg += `- ${error}\n`
            }
          );
        msg += "\n";
      }
      return msg;
    }
    switch (funcName) {
      case "adminDeleteDoctor":
        msg += `${Config.DOCTOR_DELETE_ERR_MSG}\n`;
        //`- Doctor ${Config.DELETE_ERR_INVALID_ID_MSG} ${errorDto.customAdhocParams.get("doctorId")}`;
        break;
      case "filterDoctorsOnChange":
        msg += `Error while filtering Doctors: ${errorDto}`;
        htmlMsg = "Doctors not found by the matching criteria, please try again.";
        break;
      default:
        msg += "❗ Generic Error: Origin function name not found";
        break;
    }
    return {msg, htmlMsg};
  } catch (error) {
    return Config.DOCTOR_UPDATE_ERR_MSG; // TODO: chose which entity an operation belongs the default message.
  }
}

function showError(errorDto, funcName) {
  const composeMsg = composeErrorDtoMsg(errorDto, funcName)
  alert(composeMsg.msg);
  //document.getElementById("content").innerHTML = "<p>" + composeMsg.htmlMsg + "</p>";
}
