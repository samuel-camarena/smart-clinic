import * as PagesManager from "./pages/pagesManager.js";
import * as SessionManager from "../infrastructure/adapters/storage/sessionManager.js";
import {setupMain} from "./pages/pagesManager.js";

/*
// Notify from every Page Components when fully loaded to initiate Tracking of Dropdown Menus.
const fullyLoadedPageComponents = {
  header: false,
  aside: false,
  main: false,
  footer: false,
}
 */

function init() {
  initDocumentEventHandlers();
  PagesManager.init("doctors"); // Iniciar en "appointments".
}

function initTrackingOfDropdownMenuEls() {
  document.currentlyOpenedDropdownMenuEl = null;
  const documentDropdownMenuEls = document.querySelectorAll("div.dropdown-menu");
  documentDropdownMenuEls.forEach((menuEl, index) => {
    menuEl.setAttribute("data-dropdown-id", String(index))
  });
}

function initDocumentEventHandlers() {
  document.changeToAppointmentsPageContents = async () => PagesManager.setupMain("appointments");
  document.changeToDoctorsPageContents = async () => PagesManager.setupMain("doctors");
  document.changeToPatientsPageContents = async () => PagesManager.setupMain("patients");

  document.closeOpenedModalsAndDropdowns = () => document.currentlyOpenedDropdownMenuEl?.classList.remove("show");
  document.logoSectionOnClickHandling = () => { window.location.href = "/" };
  //document.logout = () => SessionManager.logout(); // disponible en pagesManager.

  // TODO: revisar Window complete loaded o evento similar
  setTimeout(initTrackingOfDropdownMenuEls, 200);
  //window.onload = initTrackingOfDropdownMenuEls;
}

document.addEventListener("DOMContentLoaded", init);
