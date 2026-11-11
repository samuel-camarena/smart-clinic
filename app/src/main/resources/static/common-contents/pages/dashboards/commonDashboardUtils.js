
const DASHBOARD_CONTENTS_SECTION_ID = "dashboardContentsSection";
const MAIN_ID = "main";

export function clearMainContent() {
  getMainEl().replaceChildren();
}

export function clearMainContentStyling() {
  getMainEl().classList.remove("main-content");
  getMainEl().style = "";
}

export function clearDashboardContentsSection() {
  getDashboardContentsSectionEl().replaceChildren();
}

function getMainEl() {
  return document.getElementById(MAIN_ID);
}

function getDashboardContentsSectionEl() {
  return document.getElementById(DASHBOARD_CONTENTS_SECTION_ID);
}