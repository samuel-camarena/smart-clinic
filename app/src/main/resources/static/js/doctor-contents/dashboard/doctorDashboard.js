import { getAllAppointmentsOfADoctor } from "../../services/appointmentRecordService.js";
import * as RowHandler from "../../components/patientRows.js";
import * as RoleManager from "../../utils/roleManager.js";
import * as doctorService from "./services/doctorService.js";
import * as config from "../../config/config.js";
/*
const datePicker = document.getElementById('date-picker')
if(datePicker) {
    datePicker.setDate = Time.today(); //   Initialize selectedDate with today's date in 'YYYY-MM-DD' format
}
*/
const token = localStorage.getItem("token");
const selectedDate = null;
const patientName = null;

async function filterAppointmentsOnChange() {
    try {
        const searchValue = searchBar.value.trim(); // Trim and check the input value
        //const searchValue = document.getElementById("searchBar").value.trim()
        const timeValue = searchTimeSelect.value;
        const specialtyValue = searchSpecialtySelect.value;

        const name = searchValue.length > 0 ? searchValue : null;
        const time = timeValue.length > 0 ? timeValue : null;
        const specialty = specialtyValue.length > 0 ? specialtyValue : null;

        await loadAppointments();
    } catch (error) {
        console.error("Error :: filterAppointmentsOnChange :: " + error);
    }
}

/*
    Fetch and display appointments based on selected date and optional patient name
*/
export async function loadAppointments() {
    try {
        const result = await getAllAppointmentsOfADoctor(token);
        showAppointmentsTable(result.appointments);
    } catch (error) {
        showErrors(error)
        console.error("[loadAppointments]:: ", error);
    }
}

export async function loadAppointmentsForAdmin() {
    try {
        const result = await getAllAppointmentsOfADoctor(token);
        showAppointmentsTable(result.appointments);
    } catch (error) {
        showErrors(error)
        console.error("[loadAppointments]:: ", error);
    }
}

function showErrors(error) {
    const appointmentsTBody = document.getElementById("appointmentsTBody");
    console.error("[showErrors]:: ]", error);
    if (appointmentsTBody) {
        appointmentsTBody.innerHTML = "";
        const errorMsgP = document.createElement("p");
        errorMsgP.textContent = "❗ Error loading appointments. Please try again later and if the error continues, please contact support";
        //errorMsgP.classList.add("error");
        appointmentsTBody.appendChild(errorMsgPh);
    } else {
        alert("❗Error missing structural Application components. Please try again and if the error continues contact support.");
        window.location.reload();
    }
}

function showAppointmentsTable(appoints) {
    try {
        const appointmentsTBody = document.getElementById('appointmentsTBody');
        appointmentsTBody.innerHTML = "";

        if (appoints !== null && appoints.length > 0) {
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
                    }};
                //const row = createPatientRow(patient, appoint.id, appoint.doctorId);
                const row = RowHandler.createPatientRowV2(data);
                appointmentsTBody.appendChild(row);
            });
        } else {
            console.log("Appointments not found for today");
            appointmentsTBody.innerHTML = "<p>No Appointments found for today.</p>";
        }
    } catch (error) {
        /*
            Error.name = TypeError
            Error.message = can't access property "innerHTML", appointmentsTBody is null
            TODO: buscar "appointmentsTBody" dentro del mensaje para gestión personalizada de Errores dentro del "catch()"
            if (error.message.contains("appointmentsTBody")) then ... mostrar el error, ect.
         */
        // appoints -> undefined
        // Control para nulos -> e.g. TypeError: can't access property "toString", appointmentsTableBody is null.
        // appointmentsTableBody -> no existe luego es null tras document.getElementById(
        if (appointmentsTBody === undefined || appointmentsTBody !== null) {
            alert("❌ Your Appointments table is not available now. Please refresh the web browser and contact support.");
            console.error("[showAppointmentsTable]:: No Table body to display appointments, Error: ", error);
        }
    }

}

window.doctorAddPrescription = function() {
    window.location.href = `../../../pages/prescription-contents/addPrescription.html`;
}

window.doctorGetPatientRecord = function() {
    window.location.href = `../../../pages/patient-contents/patientRecord.html`;
}

function addDoctorsEventListeners() {
    const searchBar = document.getElementById('searchBar');
    if(searchBar) {
        searchBar.addEventListener("input", filterAppointmentsOnChange);
    }

    /*
    const todayBtn = document.getElementById('todayBtn');
    if(todayBtn) {
        todayBtn.addEventListener("click", () => {
            const datePicker = document.getElementById('datePicker')
            if(datePicker) {
                selectedDate = Time.today();
                datePicker.setDate = Time.today(); //   Initialize selectedDate with today's date in 'YYYY-MM-DD' format
            }
        });

        loadAppointments();
    }

    const datePicker = document.getElementById('datePicker');
    if(datePicker) {
        datePicker.addEventListener("change", () => {
            selectedDate = datePicker.getValue();
            loadAppointments();
        });
    }
    */
    document.addEventListener("DOMContentLoaded", RoleManager.renderContent);
    document.addEventListener("DOMContentLoaded", loadAppointments);
}

addDoctorsEventListeners();