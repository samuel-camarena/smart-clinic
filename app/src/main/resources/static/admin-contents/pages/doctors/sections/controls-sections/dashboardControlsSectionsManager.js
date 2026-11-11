import * as Factory from '../controls-sections/dashboardControlsSectionsFactory.js';
import * as ModalsUtils from "../../../../../common-contents/components/modals/commonModalUtils.js";

const DASHBOARD_CONTROLS_SECTION_ID = 'dashboardControlsSection';

export function getSectionEl(sectionType) {
  return Factory.createEl(sectionType);
}

export function getFilteringValues() {
  const name = document.getElementById("filterByNameSearchBar").value.trim();
  const specialty = document.getElementById("filterBySpecialtySelect").value;
  const amOrPm = document.getElementById("filterByDayPeriodSelect").value;
  const insurance = document.getElementById("filterByInsuranceSelect").value;

  return {
    name: sanitizeStringParam(name),
    specialty: sanitizeStringParam(specialty),
    amOrPm: sanitizeStringParam(amOrPm),
    insurance: sanitizeStringParam(insurance),
  };
}

export function setupNumResultsSection(numResults) {
  if (document.getElementById('showingResultsFoundLabel')) {
    document.getElementById('showingResultsFoundLabel').textContent =
      document.getElementById('showingResultsFoundLabel').textContent.replace('X', numResults);
  }
}

export function updateNumResultsSection(numResults) {
  setupNumResultsSection(numResults);
}

function removeSections() {
  getSectionContainerEl().replaceChildren();
}

function sanitizeStringParam(param) {
  return (param !== undefined && param !== null || param) ? param.trim() : "";
}

function getSectionContainerEl() {
  return document.getElementById(DASHBOARD_CONTROLS_SECTION_ID);
}