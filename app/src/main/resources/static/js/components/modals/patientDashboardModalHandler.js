//import {AVAILABLE_TIMES_SELECT_OPTIONS, SPECIALTY_SELECT_OPTIONS} from "../../config/config.js";
//import {createStyledModalHeader} from "./commonModalUtils.js";
import {showPatientDashboardModal, hidePatientDashboardModal} from "../../patient-contents/dashboard/patientDashboard.js";
import * as ModalsShared from "./commonModalUtils.js";

export function openModal(type, dataToPopulate) {
    let modalContent = "";
    ModalsShared.clearSharedModalContent();
    switch (type) {
        case "patientSignup":
            modalContent = setupPatientSignupModal()
            document.getElementById("modalBody").innerHTML = modalContent;
            document.getElementById("patientDashboardModal").style.display = "block";
            break;
        default:
            alert(`Unknown modal type: ${type}`);
            console.error(`Unknown modal type: ${type}`);
            break;
    }
    addEventListeners(type);
    showPatientDashboardModal();
}

function setupPatientSignupModal() {
    return `
        ${addModalTitleElement("Patient Signup")}

        <input type="text" id="name" placeholder="Name" class="input-field">
        <input type="email" id="email" placeholder="Email" class="input-field">
        <input type="password" id="password" placeholder="Password" class="input-field">
        <input type="text" id="phone" placeholder="Phone" class="input-field">
        
        
        <input type="text" id="address" placeholder="Address" class="input-field">
        <button class="dashboard-btn" id="signupBtn">Signup</button>`;
}

function createPatientFormulary(patientDataToPopulate) {
    const {
        name = "",
        email = "",
        password = "",
        phone = "",
        address = "",
        id = ""
    } = patientDataToPopulate;
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
        id = ""
    } = doctorDataToPopulate;

    return [
        ...ModalsShared.createPersonalDataInputs(name, email, password, phone),
        ...createSpecialtySelect(specialty),
        createAvailableTimesCheckboxes(availableTimes),
        ...createProfessionalInputs(yearsOfExperience, clinicAddress, rating, id),
    ]
}



function addEventListeners(modalType) {
    switch (modalType) {
        case "patientSignup":
            document.getElementById("signupBtn").addEventListener("click", signupPatient);
            break;
        default:
            return;
    }
    document.getElementById("closeModalBtn").addEventListener("click", hidePatientDashboardModal);
}