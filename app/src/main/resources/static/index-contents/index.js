import * as Auth from "../auth-contents/auth.js";
//import * as Header from "../common-contents/components/page-structures/headers/header.js";
//import * as Footer from "../common-contents/components/page-structures/footers/footer.js"; Utilizar para los EventListener o redistribuir al PageManager
import * as PagesManager from "./pages/pagesManager.js";
import * as SessionManager from "../infrastructure/adapters/storage/sessionManager.js";
//import * as SessionManager from "../infrastructure/adapters/storage/sessionManager.js";

/*
export function showModal() {
  document.getElementById("indexModal").style.display = "block";
}

export function closeModal() {
  document.getElementById("indexModal").style.display = "none";
}
*/

function init() {
  setupDocumentEventHandlers();
  PagesManager.init("about");
  //SessionManager.validateCurrentSession();
}

//  Utilizalo únicamente después de Autenticar y justo al recibir el token JWT, antes de guardar los datos de sesión
// eliminar lo previamente guardado.
/**
 * The `window.location.pathname` is checked to see if the current page is the root (`/`). If true,
 * the user's session data (role) is removed from `localStorage`, and the header is rendered without
 * any user-specific elements (just the logo and site title).
 */
/*
const role = SessionManager.getRole();
const token = SessionManager.getToken();

if (window.location.pathname.endsWith("/") || role === undefined || role === null) {
  SessionManager.resetUserSession();
  return;
}
*/
/**
 * The `role` (user role like admin, patient, doctor) and `token` (authentication token) are retrieved
 * from `localStorage` to determine the user's current session.
 */
/*
if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
  alert("Session expired or invalid login. Please log in again.");
  SessionManager.logout();
  return;
}
*/


function setupDocumentEventHandlers() {
  document.initLoginHandler = () => Auth.init();
  document.logoSectionOnClickHandling = () => window.location.href = "/";
  document.logout = () => SessionManager.logout();
}

document.addEventListener("DOMContentLoaded", init);
