import * as Factory from "./dashboardContentsSectionsFactory.js";

const DASHBOARD_CONTENTS_SECTION_ID = "dashboardContentsSection";

export function getSectionEl(sectionProps) {
  return Factory.createEl(sectionProps);
}

export function updateContents(sectionType, sectionProps) {
  removeSections();
  if (sectionProps?.type === 'error') {
    switch (sectionProps.error.type) {
      case 'notFound':
        handleEntityNotFound(sectionProps.entity.type, sectionProps.error.dto);
        break;
      case 'notAvailable':
        handleEntityNotAvailable(sectionProps.error.errorDto);
        break;
      case 'generic':
        handleGenericError(sectionProps.error.errorDto, sectionProps.error.funcName);
        break;
      default:
        break;
    }
  }
  Factory.updateContents(sectionType, sectionProps);
}

export function removeContentOfSection(sectionType, contentProps) {
  Factory.removeContentOfSection(sectionType, contentProps);
}

function handleEntityNotFound(entityType, errorDto) {
  removeSections();
  console.warn(`[loadDoctorCards]:: ${entityType}s not found by by the matching criteria`);
  /*
  Factory.setupErrorSection(
    mapErrorSectionToErrorProps({ ...errorData, type: 'notFound' })
  );
 */
}

function handleEntityNotAvailable(errorDto) {
  removeSections()
  console.error(`[showDoctorCards]:: Possible causes:
    \n- No Main Content Div
    \n- Wrong User Role to display doctors.
    \n- ErrorDTO: ${errorDto}`);
}

function handleGenericError(errorDto, funcName) {
  removeSections();
  console.warn("[GenericError]: " + errorDto + " - function name: " + funcName);
}

/*
export function toggleCardsSize() {
  Factory.toggleCardsSize();
}
 */
/*
function mapErrorSectionToErrorProps(errorSection) {
  return {
    type: errorSection.type,
    dto: errorSection.dto,
    resource: {
      type: errorSection.resource.type,
    },
    funcName: errorSection.funcName,
  }
}

 */

function removeSections() {
  getSectionContainerEl().replaceChildren();
}

function getSectionContainerEl() {
  return document.getElementById(DASHBOARD_CONTENTS_SECTION_ID);
}