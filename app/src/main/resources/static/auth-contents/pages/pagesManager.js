import * as Modal from "../components/modals/loginModalManager.js";
import * as SessionManager from "../../infrastructure/adapters/storage/sessionManager.js";
import * as Config from "../../common-contents/config/config.js";
import {updateContentsFromFiltering} from "../../admin-contents/pages/doctors/doctorsManagementPage.js";

/*
    ## Grouping by features
    One common way to structure projects is locate CSS, JS, and tests together inside folders grouped by feature or route.

    common/
      Avatar.js
      Avatar.css
      APIUtils.js
      APIUtils.test.js

    feed/
      index.js
      Feed.js
      Feed.css
      FeedStory.js
      FeedStory.test.js
      FeedAPI.js

    profile/
      index.js
      Profile.js
      ProfileHeader.js
      ProfileHeader.css
      ProfileAPI.js

    ### Pro/Con:
    - Grouping by features works better the larger the project gets (think more components).
    - Grouping by file type can keep things simple with smaller projects

    ## put component code in [Component-Name]/index.js

    Button/
      index.js
      style.css
    Header/
      index.js
      style.css

    //Button/index.js
    export default class Button;
    -> export default class IndexModal;

    import Button from "../Button";
    -> import IndexModal from "../IndexModalHandler.js";
    */

const LOGIN_MODAL_ID = "loginModal"
const LOGIN_MODAL_OVERLAY_ID = "loginModalOverlay";
const LOGIN_MODAL_BOX_ID = "loginModalBox";

/*
  // TODO: Decidir si definir primero los Handler y luego asignarlos a los HTML Elements, o Primero crear los Elements, asignarles Retrollamadas que apunten a los
  // manejadores de Eventos que se definiran posteriormente.
  // - 1º Definir manejadores, 2º asignarlos ("click", document.closeModal)
  // - 1º Asignar los manejadores, 2º definirlos ("click", () => document.closeModal() ).
 */
export function init(authType) {
  initEventHandlers();
  setup(authType);
  // initEventHandlers();
}

export function getLoginDTO() {
  return Modal.getLoginDTO();
}

/*
export function showModal() {
  document.getElementById("indexModal").style.display = "block";
}
 */

/*
 Cambiar nombres a lo más apropiado
 */
export function showErrorsOfInvalidInputs(unformattedErrFields) {
  if (unformattedErrFields.identifier) { // result?.errorDTO?.fieldErrors?.identifier ...
    unformattedErrFields.identifier[0] = Config.LOGIN_ERR_WRONG_IDENTIFIER_MSG;
  }
  if (unformattedErrFields.password) {
    unformattedErrFields.password[0] = Config.LOGIN_ERR_WRONG_PASSWORD_MSG;
  }
  Modal.showErrorsOfInvalidInputs(errFields);
}

function setup(authType) {
  if (authType === "login") {
    Modal.open("admin");
    //const modal = document.getElementById("indexModal");
    //modal.appendChild()
  }
}

/*
function addEventListeners(role) {
  document.getElementById('loginModalBtn').addEventListener("click", async () => {
    await loginHandler(role);
  });
  document.getElementById("closeModalBtn").addEventListener("click", closeModal);
}
*/

// TODO: Cambiar pagesManager a loginModalManager (igual que el doctorModalManager) y sustituir de closeModal por close.
// export function close() {
function closeModal() {
  //const modal = document.getElementById(LOGIN_MODAL_OVERLAY_ID);
  const modal = document.getElementById(LOGIN_MODAL_ID);
  modal.addEventListener("animationend", () => {
    document.getElementById(LOGIN_MODAL_ID).remove();
    //modal.remove();
  });
  modal.classList.add("fade-out");
}

function validateRoleArgument(role) {
  if (role !== "admin" && role !== "doctor" && role !== "patient") {
    alert("User role wrong configured. Please sign in again.");
    SessionManager.logout()
  }
}

function initEventHandlers() {
  initGlobalEventHandlers();
}

function initGlobalEventHandlers() {
  //document.filterByName = updateContentsFromFiltering;
  document.closeModal = closeModal;
}

