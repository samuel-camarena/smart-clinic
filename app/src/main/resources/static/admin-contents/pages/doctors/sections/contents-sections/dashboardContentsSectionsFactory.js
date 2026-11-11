import * as Catalog from './catalog-sections/entitiesCatalogSection.js';
import * as ErrorSection from './error-section/errorSection.js';
import * as CatalogProps from './catalog-sections/entitiesCatalogSectionProps.js';

const DASHBOARD_CONTENTS_SECTION_ID = 'dashboardContentsSection';

export function createEl(sectionProps) {
  const section = createSectionEl();

  switch (sectionProps.type) {
    case 'catalog':
      section.append(
        Catalog.createEl(sectionProps)
      );
      break;
    case 'error':
      section.append(
        ErrorSection.createEl(sectionProps)
      );
      break;
    default:
      break;
  }
  return section;
}

export function updateContents(sectionType, sectionProps) {
  switch (sectionType) {
    case 'catalog':
      getSectionContainerEl().append(
        Catalog.getUpdatedCatalogEl(sectionProps)
      );
      break;
    case 'error':
      getSectionContainerEl().append(
        ErrorSection.createEl(sectionProps)
      );
      break;
    default:
      break;
  }
}
/*
// (type, dto, resourceType, funcName)
export function setupErrorSection(errorProps) {
  switch (errorProps.type) {
    case 'notFound':
      getSectionContainerEl().append(
        ErrorSection.createNotFoundMsgEl(errorProps)
      );
      break;
    case 'notAvailable':
      getSectionContainerEl().append(
        ErrorSection.createNotAvailableMsgEl(errorProps)
      );
      break;
    case 'generic':
      getSectionContainerEl().append(
        ErrorSection.createGenericErrorMsgEl(errorProps)
      );
      break;
    default:
      break;
  }
}

 */

export function removeContentOfSection(sectionType, contentProps) {
  switch (sectionType) {
    case 'catalog':
      Catalog.removeContent(contentProps);
      break;
    case 'error':
      break;
    default:
      break;
  }
}

export function toggleCardsSize() {
  Catalog.toggleCardsSize();
}
/*
function setupErrorSectionProps(sectionProps){
  return {
    type: sectionProps.error.type,
    dto: sectionProps.error.dto,
    resource: sectionProps.error.resource,
  };
}
 */

function createSectionEl() {
  const section = document.createElement('section');
  section.id = DASHBOARD_CONTENTS_SECTION_ID;
  section.className = 'dashboard-contents-section';
  return section;
}

function getSectionContainerEl() {
  return document.getElementById(DASHBOARD_CONTENTS_SECTION_ID);
}