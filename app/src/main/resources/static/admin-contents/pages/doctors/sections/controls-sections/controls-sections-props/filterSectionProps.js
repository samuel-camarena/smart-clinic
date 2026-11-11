import * as Config from "../../../../../../common-contents/config/config.js";
import {INSURANCE_COMPANIES} from "../../../../../../common-contents/config/config.js";
/*
export const adminFilteringPatientsProps = {
  sectionProps: {
    tag: "section",
    className: "search-section",
  },
  titleProps: {
    tag: "label",
    textContent: "Search by Patient's:",
    className: "title"
  },
  filterContainerProps: {
    tag: "span",
    className: "search-bars-container"
  },
  searchBarsProps: [
    {
      tag: "input",
      type: "text",
      id: "filterByNameSearchBar",
      className: "search-bar",
      placeholder: "Name",
      eventListener: {
        type: "input",
        handler: document.filterByName
      }
    },
    {
      tag: "input",
      type: "text",
      id: "filterByEmailSearchBar",
      className: "search-bar",
      placeholder: "Email",
      eventListener: {
        type: "input",
        handler: window.filterByEmail
      }
    },
    {
      tag: "input",
      type: "text",
      id: "filterByPhoneSearchBar",
      className: "search-bar",
      placeholder: "Phone",
      eventListener: {
        type: "input",
        handler: window.filterByPhone
      }
    }
  ]
};
*/
function createSelectOptionsProps(optionsValues) {
  const optionsProps = [];

  optionsValues.forEach(value => {
    const optionProps = {
      value: value,
      textContent: value,
      selected: false
    }
    optionsProps.push(optionProps);
  })

  return optionsProps;
}

export function getAdminFilteringDoctorsProps() {
  const dayPeriodOptionsProps = createSelectOptionsProps(Config.DAY_PERIODS);
  const insuranceOptionsProps = createSelectOptionsProps(Config.INSURANCE_COMPANIES);

  return {
    sectionProps: {
      className: "inline-controls-section",
    },
    titleProps: {
      tag: "label",
      textContent: "Filter by Doctor's:",
      className: "title"
    },
    inlineContainerProps: {
      className: ""
    },
    selectsProps: [
      {
        id: "filterByDayPeriodSelect",
        className: "",
        optionCaptionProps: {
          textContent: "Choose Day period",
          value: ""
        },
        optionsProps: dayPeriodOptionsProps,
        eventListener: {
          type: "change",
          handler: document.filterByDayPeriod
        }
      }, {
        id: "filterByInsuranceSelect",
        className: "",
        optionCaptionProps: {
          textContent: "Choose Insurance company",
          value: ""
        },
        optionsProps: insuranceOptionsProps,
        eventListener: {
          type: "change",
          handler: document.filterByInsurance
        }
      },
    ]
  };
}
