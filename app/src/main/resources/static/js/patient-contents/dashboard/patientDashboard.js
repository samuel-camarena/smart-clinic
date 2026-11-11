import * as ModalManager from '../../components/modals/patientDashboardModalHandler.js';
import * as LoginModalManager from '../../components/modals/auth.js';
import {patientSignup, patientLogin} from '../../services/patientServices.js';
import * as DoctorService from "../../doctor-contents/dashboard/services/doctorService.js";
import * as SessionManager from "../../../infrastructure/adapters/storage/sessionManager.js";
import * as CardManager from "../../components/cards/entityCard.js";
import * as Config from "../../config/config.js";

export function showPatientDashboardModal() {
    document.getElementById("patientDashboardModal").style.display = "block";
}

export function hidePatientDashboardModal() {
    document.getElementById("patientDashboardModal").style.display = "none";
}

function loadDoctorCards() {
    DoctorService.getAllDoctors()
        .then(result => {
            showDoctorCards(result.doctors);
        })
        .catch(reason => {
            console.error("[loadDoctorCards]:: Server response " + (reason.error) ? reason.error : reason.message);
        })
}

function showDoctorCards(doctors) {
    try {
        const role = SessionManager.getRole();
        if (role === "") {
            throw new Error() // new RoleMissingError ...
            return;
        }

        const mainDiv = document.getElementById("content");
        if (!mainDiv || !role) {
            alert("❌ No Main content available to display doctors!");
            console.error("[showDoctorCards]:: No Main content to display doctors");
            return;
        }
        mainDiv.innerHTML = "";

        if (doctors != null && doctors.length > 0) {
            doctors.forEach(doctor => {
                const card = CardManager.createDoctorCard(doctor, role); // card html element
                mainDiv.appendChild(card);
            });
        } else {
            console.log("Doctors not found");
            mainDiv.innerHTML = "<p id='noDataFoundP'>Doctors not found by the matching criteria, please try again.</p>";
        }
    } catch (e) {
        if (e instanceof TypeError) {

        }
        console.log(error);
        alert("❌ No Main content available to display doctors!");
        console.error("[showDoctorCards]:: No Main content to display doctors");
    }
}

async function filterDoctorsOnChange(message) {
    const name = sanitizeStringParam(filterByNameSearchBar.value.trim());
    const amOrPm = sanitizeStringParam(filterByTimePeriodSelect.value);
    const specialty = sanitizeStringParam(filterBySpecialtySelect.value);

    const result = await DoctorService.filterDoctors(name, amOrPm, specialty);
    if (result.success) {
        showDoctorCards(result.doctors);
    } else {
        console.error("[filterDoctorsOnChange]:: ", result.errorDto);
        showError(result.errorDto, "filterDoctorsOnChange");
    }
}

function showError(errorDto, funcName) {
    const composeMsg = composeErrorDtoMsg(errorDto, funcName)
    alert(composeMsg.msg);
    document.getElementById("content").innerHTML = "<p>" + composeMsg.htmlMsg + "</p>";
}

function addEventListeners() {
    try {
        const signupBtn = document.getElementById("patientSignup");
        if (signupBtn) {
            signupBtn.addEventListener("click", () => {
                ModalManager.openModal("patientSignup", "");
            });
        }
        const loginBtn = document.getElementById("patientLogin")
        if (loginBtn) {
            loginBtn.addEventListener("click", () => {
                LoginModalManager.openLoginModal("patient");
            })
        }

        const filterByNameSearchBar = document.getElementById("filterByNameSearchBar");
        if(filterByNameSearchBar) {
            filterByNameSearchBar.addEventListener("input", filterDoctorsOnChange);
        }
        const filterByTimePeriodSelect = document.getElementById("filterByTimePeriodSelect");
        if (filterByTimePeriodSelect) {
            filterByTimePeriodSelect.addEventListener("change", filterDoctorsOnChange);
        }
        const filterBySpecialtySelect = document.getElementById("filterBySpecialtySelect");
        if (filterBySpecialtySelect) {
            filterBySpecialtySelect.addEventListener("change", filterDoctorsOnChange);
        }
        const closeModalBtn = document.getElementById("closeModalBtn");
        if (closeModalBtn) {
            closeModalBtn.addEventListener("click", async () => {
                document.getElementById("adminDashboardModal").style.display = "none";
            })
        }
        document.addEventListener("DOMContentLoaded", loadDoctorCards);
    } catch (error) {
        console.error("Add Event listeners failed with error: ", error);
    }
}

function composeErrorDtoMsg(errorDto, funcName) {
    try {
        let msg = "", htmlMsg = "";
        if (errorDto.fieldErrors != null) {
            for (let field in errorDto.fieldErrors) {
                msg += `Invalid field: ${field}\n`;
                errorDto.fieldErrors[field].forEach(error => {
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

function sanitizeStringParam(param) {
    return (param !== undefined && param !== null) ? param : "";
}

addEventListeners();


window.signupPatient = async function () {
  try {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    const data = { name, email, password, phone, address };
    const { success, message } = await patientSignup(data);
    if (success) {
      alert(message);
      document.getElementById("patientModal").style.display = "none";
      window.location.reload();
    }
    else alert(message);
  } catch (error) {
    console.error("Signup failed:", error);
    alert("❌ An error occurred while signing up.");
  }
};

/*
window.loginPatient = async function () {
  try {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = {
      email,
      password
    }
    console.log("loginPatient :: ", data)
    const response = await patientLogin(data);
    console.log("Status Code:", response.status);
    console.log("Response OK:", response.ok);
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      selectRole('loggedPatient');
      localStorage.setItem('token', result.token)
      window.location.href = '../../pages/loggedPatientDashboard.html';
    } else {
      alert('❌ Invalid credentials!');
    }
  }
  catch (error) {
    alert("❌ Failed to Login : ", error);
    console.log("Error :: loginPatient :: ", error)
  }


}
*/