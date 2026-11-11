import * as AppointsService from "../../../services/appointmentRecordService.js";
import * as SessionManager from "../../../utils/sessionManager.js";
import * as RowHandler from "../../../components/patientRows.js";
import * as TableHandler from "../appointmentsTable.js";

export async function setupAppointmentsContentsOnInit() {
  setupMainContentStyling();
  const appoints = await loadAppointments();
  if (appoints === null || appoints.length === 0) {
    handleAppointmentsNotFound();
    return;
  }

  setupAppointmentsTable(appoints);
}

// TODO: cuando estén las secciones de Búsqueda y Filtrado.
// export async function setupAppointmentsContentsOnChange

async function loadAppointments() {
  try {
    const token = SessionManager.getToken();
    const result = await AppointsService.getAllAppointmentsForAdmin(token);
    return result.appointments;
  } catch (e) {
    showAppointmentsTableErrors(e)
    console.error("[loadAppointments]:: ", e);
  }
}

function setupAppointmentsTable(appoints) {
  document.getElementById("main").appendChild(TableHandler.createTable());

  const appointsRowsData = setupAppointmentsRowsData(appoints);
  if (appointsRowsData === null || appointsRowsData.length === 0) {
    handleAppointmentsNotFound();
    return
  }

  let appointsRows = []
  appointsRowsData.forEach((rowData) => {
    appointsRows.push(RowHandler.createPatientRowV2(rowData));
  })
  showAppointmentsTable(appointsRows);
}

function setupAppointmentsRowsData(appoints) {
  let appointsRowsData = [];
  appoints.forEach(appoint => {
    const patient = {
      id: appoint.patientId,
      name: appoint.patientName,
      phone: appoint.patientPhone,
      email: appoint.patientEmail
    };
    const data = {
      patient: patient,
      appoint: {
        id: appoint.id,
        doctorId: appoint.doctorId
      }
    };
    appointsRowsData.push(data);
  });
  return appointsRowsData;
}

function showAppointmentsTable(appointsRows) {
  const appointmentsTBody = document.getElementById('appointmentsTBody');
  if (appointmentsTBody) {
    appointmentsTBody.append(...appointsRows);
  } else {
    handleAppointmentsNotFound();
  }
}

function handleAppointmentsNotFound() {
  showAppointmentsNotFoundMsg(); // throw new Error() // new RoleMissingError ...
  console.error("[loadAppointmentsTable]:: Appointments not found by by the matching criteria");
}

function showAppointmentsNotFoundMsg() {
  const mainDiv = document.getElementById("main");
  const errMsgP = document.createElement("p");
  errMsgP.textContent = "Appointments not found by the matching criteria. Please try again.";
  errMsgP.id = "noDataFoundP";
  mainDiv.appendChild(errMsgP);
}

function showAppointmentsTableErrors(error) {
  const appointmentsTBody = document.getElementById("appointmentsTBody");
  if (appointmentsTBody) {
    appointmentsTBody.innerHTML = "";
    const errorMsgP = document.createElement("p");
    errorMsgP.textContent = "❗ Error loading appointments. Please try again later and if the error continues, please contact support";
    //errorMsgP.classList.add("error");
    appointmentsTBody.appendChild(errorMsgP);
  } else {
    alert("❗Error missing structural Application components. Please try again and if the error continues contact support.");
    window.location.reload();
  }
}

function setupMainContentStyling() {
  //document.getElementById("main").classList.add("hidden");
}