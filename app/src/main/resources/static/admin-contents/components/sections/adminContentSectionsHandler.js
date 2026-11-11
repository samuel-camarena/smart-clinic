import * as AppointmentsPanel from "../../../js/appointment-contents/tables/panels/appointmentsPanel.js";
import * as DoctorsPanel from "../../../js/doctor-contents/dashboard/panels/doctorsPanel.js";
import * as DashboardShared from "../../../js/common-contents/dashboards/commonDashboardUtils.js";

export function AdminContentSectionsHandler(contentType) {
  let component;
  switch (contentType) {
    case "appointments":
      component = createAppointmentsContentSection();
      break;
    case "patients":
      component = createPatientsContentSection();
      break;
    case "doctors":
      component = createDoctorsContentSection();
      break;
    default:
      break;
  }

  return component;
}

async function createAppointmentsContentSection() {
  DashboardShared.clearMainContent();
  DashboardShared.clearMainContentStyling();
  // adminHeader section..
  await AppointmentsPanel.setupAppointmentsContentsOnInit();
  //return document.createTextNode("📅 Appointments Section");
}

function createPatientsContentSection() {
  return document.createTextNode("👤 Patient Contents Tab");
}

async function createDoctorsContentSection() {
  DashboardShared.clearMainContent();
  DashboardShared.clearMainContentStyling();
  document.getElementById("main").classList.add("main-content");
  await DoctorsPanel.setupDoctorsContentsOnInit();
}

export default AdminContentSectionsHandler;