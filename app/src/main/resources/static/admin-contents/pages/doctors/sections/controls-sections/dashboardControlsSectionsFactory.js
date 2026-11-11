import * as CrudProps from './../controls-sections/controls-sections-props/crudSectionProps.js';
import * as SearchProps from './../controls-sections/controls-sections-props/searchSectionProps.js';
import * as FilterProps from './../controls-sections/controls-sections-props/filterSectionProps.js';
import * as VisualizationProps from './../controls-sections/controls-sections-props/visualizationSectionProps.js';
import * as InlineControlsSection from './../controls-sections/controls-sections-layouts/inline-controls-section/inlineControlsSection.js';

const DASHBOARD_CONTROLS_SECTION_ID = 'dashboardControlsSection';

export function createEl(sectionProps) {
  return setupEl(setupProps(sectionProps));
}

function setupProps(sectionProps) {
  return {
    ...sectionProps,
    id: DASHBOARD_CONTROLS_SECTION_ID,
    className: 'dashboard-controls-section',
  }
}

function setupEl({ entity, id, className }) {
  const section = document.createElement('section');
  section.id = id;
  section.className = className;

  switch (entity.type) {
    case 'doctors':
      section.appendChild(
        InlineControlsSection.createEl(
          CrudProps.crudProps
        ));

      section.appendChild(
        InlineControlsSection.createEl(
          SearchProps.getAdminSearchingDoctorsProps()
        ));

      section.appendChild(
        InlineControlsSection.createEl(
          FilterProps.getAdminFilteringDoctorsProps()
        ));

      //setupContentsResultsToVisualizationProps(resultsCount);
      //VisualizationProps.visualizationProps
      section.appendChild(
        InlineControlsSection.createEl(
          VisualizationProps.visualizationProps
        ));
      break;
    default:
      break;
  }

  return section;
}
