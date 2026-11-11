import * as Config from "../../../../../../common-contents/config/config.js";

export const adminSearchingPatientsProps = {
  sectionProps: {
    tag: "section",
    className: "search-section",
  },
  titleProps: {
    tag: "label",
    textContent: "Search by Patient's:",
    className: "title"
  },
  searchContainerProps: {
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
        handler: document.filterByEmail
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
        handler: document.filterByPhone
      }
    }
  ]
};

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

export function getAdminSearchingDoctorsProps() {
  const optionsProps = createSelectOptionsProps(Config.SPECIALTIES);

  return {
    sectionProps: {
      className: "inline-controls-section",
    },
    titleProps: {
      tag: "label",
      textContent: "Search by Doctor's:",
      className: "title"
    },
    inlineContainerProps: {
      className: ""
    },
    inputBarsProps: [
      {
        type: "text",
        id: "filterByNameSearchBar",
        className: "input-bar",
        placeholder: "Name",
        eventListener: {
          type: "input",
          handler: document.filterByName
        }
      }
    ],
    selectsProps: [
      {
        id: "filterBySpecialtySelect",
        optionCaptionProps: {
          textContent: "Choose Specialty",
          value: ""
        },
        optionsProps: optionsProps,
        eventListener: {
          type: "change",
          handler: document.filterBySpecialty
        }
      },
    ]
  };
}

