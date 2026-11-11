import * as SessionManager from "../infrastructure/adapters/storage/sessionManager.js"
import * as PagesManager from "./pages/pagesManager.js"
import * as AuthService from "./services/authService.js";

export function init() {
  initEventHandlers();
  PagesManager.init("login");
  //addEventListeners("admin");
}
/*
function validateRoleArgument(role) {
    if (role !== "admin" && role !== "doctor" && role !== "patient") {
        alert("User role wrong configured. Please sign in again.");
      SessionManager.logout()
    }
}
*/

function initEventHandlers() {
  setupDocumentEventHandlers();
}

function setupDocumentEventHandlers() {
  document.loginSubmitHandle = async function () {
    try {
      const loginDTO = PagesManager.getLoginDTO(); // getValidatedLoginDTO();
      if (loginDTO === null) {
        return; // showErrorsOfInvalidInputs ... Cambiar a petición de mostrar errores desde el Service.
      }
      loginDTO.role = "admin"; //loginDTO.role = role; solucionar un único punto de Login para MultiRol.

      const result = await AuthService.authenticate(loginDTO);
      if (result.success) {
        SessionManager.initSession(result.resBody.token, loginDTO.role);
      } else {
        PagesManager.showErrorsOfInvalidInputs(result.errorDTO.fieldErrors);
        //alert(resBody.error || resBody.message || 'Invalid credentials, please try again');
      }
    } catch (e) {
      alert('Something went wrong with API Service, please try again');
      console.error("[adminLoginHandler]::API Login Service: ", e);
    }
  }
}

function addEventListeners(role) {
  /*
  document.getElementById('loginModalBtn').addEventListener("click", async () => {
    await loginHandler(role);
  });
  */
  //document.getElementById("closeModalBtn").addEventListener("click", closeModal);
}

