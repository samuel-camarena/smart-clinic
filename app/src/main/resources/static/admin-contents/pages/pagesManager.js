import * as Header from "../../common-contents/components/page-structures/headers/header.js";
import * as Sidebar from "../../common-contents/components/page-structures/sidebars/dashboard-sidebars/dashboardSidebar.js";
import * as Footer from "../../common-contents/components/page-structures/footers/footer.js";
import * as DashboardUtils from "../../common-contents/pages/dashboards/commonDashboardUtils.js";
import * as DoctorsPage from "./doctors/doctorsManagementPage.js";
import * as SessionManager from "../../infrastructure/adapters/storage/sessionManager.js";

export function init(pageType) {
  initEventHandlers();
  Header.init(pageType);
  Sidebar.init(pageType)
  setupMain(pageType);
  Footer.init();
}

export function setupMain(pageType) {
  DashboardUtils.clearMainContent();
  //Header.clearContents();
  //Footer.clearContents();
  //DashboardUtils.clearMainContentStyling();

  const mainContainer = getMainContainer();
  switch (pageType) {
    case "appointments":
      mainContainer.append(...AppointmentsPage.init());
      break;
    case "doctors":
      //Header.setup("adminDoctors");
      DoctorsPage.init()
        .then((sections) => {
          mainContainer.append(...sections);
          setupPropsForFullyLoadedContents('doctors');
        });
      break;
    case "patients":
      mainContainer.append(...PatientsPage.init());
      break;
    default:
      mainContainer.append("<h1>❗ Content Not Found<h1>");
      break;
  }
}

function setupPropsForFullyLoadedContents(pageType) {
  switch (pageType) {
    case 'doctors':
      DoctorsPage.setupNumResultsControlSection(5);
      break;
    default:
      break;
  }
}

function initEventHandlers() {
  setupDocumentEventHandlers();
}

function setupDocumentEventHandlers() {
  document.logout = SessionManager.logout;
}

function getMainContainer() {
  return document.getElementById("main");
}