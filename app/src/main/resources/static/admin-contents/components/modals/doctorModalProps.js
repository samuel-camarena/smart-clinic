import * as Config from '../../../common-contents/config/config.js';
import {
  IDENTIFIER_COMPLEMENTARY_TEXT_ID,
  IDENTIFIER_INPUT_ID, PASSWORD_COMPLEMENTARY_TEXT_ID, PASSWORD_INPUT_ID
} from "../../../auth-contents/components/modals/loginModalProps.js";

const MODAL_ID = "doctorModal";
const TITLE = "New Doctor";
const SUBTITLE = "Please enter new Doctor details";
const CANCEL_FORMULARY_BUTTON_ID = "cancelButton";

export const PROPS = {
  props: {
    className: '',
    modalType: '',
    resource: {
      type: '',
      value: ''
    }
  },
  children: [
    {
      props: {
        type: 'header',
        name: 'header',
      },
      children: []
    },
    {
      props: {
        type: 'body',
      },
      children: []
    },
    {
      props: {
        type: 'footer',
      },
      children: []
    }
  ]
}
/*
const doctorFormularyProps = {
  props: {
    type: 'doctorFormulary',
    dataToPopulate: {},
  },
  children: [
    {
      personalDataInputsProps: personalDataInputsProps,
      professionalDataInputsProps: professionalDataInputsProps,
      specialtySelectProps: specialtySelectProps,
      availabilityCheckboxesProps: availabilityCheckboxesProps
    }
  ]
}
 */

export function getProps(modalType, dataToPopulate) {
  const customizedModalProps = structuredClone(defaultModalProps);
  const customizedOverlayProps = getCustomizedOverlayProps(modalType, dataToPopulate);

  customizedModalProps["props"]["attributes"].set("id", MODAL_ID);
  customizedModalProps["children"].push(customizedOverlayProps);
  return customizedModalProps;
}

function getCustomizedOverlayProps(modalType, dataToPopulate) {
  const customizedOverlayProps = structuredClone(defaultOverlayProps)
  customizedOverlayProps["children"].push(
    getCustomizedBoxProps(modalType, dataToPopulate)
  );
  return customizedOverlayProps;
}

function getCustomizedBoxProps(modalType, dataToPopulate) {
  const props = structuredClone(defaultBoxProps);
  props["children"].push(getCustomizedHeaderProps());
  props["children"].push(getCustomizedBodyProps(modalType, dataToPopulate));
  return props;
}

function getCustomizedHeaderProps() {
  const customizedHeaderProps = structuredClone(defaultHeaderProps);
  const inlineTitleProps = customizedHeaderProps["children"][0];
  const titleProps = inlineTitleProps["children"][0];
  const subtitleProps = inlineTitleProps["children"][1];
  const closeButtonProps = customizedHeaderProps["children"][1];

  titleProps["props"]["textContent"] = TITLE;
  subtitleProps["props"]["textContent"] = SUBTITLE;
  closeButtonProps["props"]["eventListener"] = {
    type: "click",
    handler: () => document.closeModal()
  }

  return customizedHeaderProps;
}

function getCustomizedBodyProps(formType, dataToPopulate) {
  const customizedBodyProps = structuredClone(defaultBodyProps);
  customizedBodyProps["children"].push(
    getCustomizedFormularyProps(formType, dataToPopulate)
  );
  return customizedBodyProps;
}

function getCustomizedFormularyProps(formType, dataToPopulate) {
  const formProps = structuredClone(defaultFormularyProps);

  switch (formType) {
    case "register":
      formProps["props"]["eventListener"] = {
        type: "submit",
        handler: (event) => {
          event.preventDefault();
          if (event.submitter.id === CANCEL_FORMULARY_BUTTON_ID) {
            document.closeModal();
          } else {
            document.registerDoctor();
          }
        }
      }
      break;
    case "edit":
      formProps["props"]["eventListener"] = {
        type: "submit",
        handler: (event) => {
          event.preventDefault();
          if (event.submitter.id === CANCEL_FORMULARY_BUTTON_ID) {
            document.closeModal();
          } else {
            document.updateDoctor();
          }
        }
      }
      break;
    case "delete":
      formProps["props"]["eventListener"] = {
        type: "submit",
        handler: (event) => {
          event.preventDefault();
          if (event.submitter.id === CANCEL_FORMULARY_BUTTON_ID) {
            document.closeModal();
          } else {
            document.deleteDoctor();
          }
        }
      }
      break;
    default:
      break;
  }

  // TODO: añadir los userInputFieldProps a una colección y iterarla para añadir los elementos al formulario.
  formProps["children"].push(
    mapFormularyFieldPropsAndDataToUserInputProps(userInputNameProps, dataToPopulate),
    //mapFormularyFieldPropsAndDataToUserInputProps(userInputMedicalIdProps, dataToPopulate),
    mapFormularyFieldPropsAndDataToUserInputProps(userInputEmailProps, dataToPopulate),
    mapFormularyFieldPropsAndDataToUserInputProps(userInputPasswordProps, dataToPopulate),
    mapFormularyFieldPropsAndDataToUserInputProps(userInputPhoneProps, dataToPopulate),
    mapFormularyFieldPropsAndDataToUserInputProps(userInputYearsOfExperienceProps, dataToPopulate),
    mapFormularyFieldPropsAndDataToUserInputProps(userInputRatingProps, dataToPopulate),
    mapFormularyFieldPropsAndDataToUserInputProps(userInputHiddenIdProps, dataToPopulate),
  );
  formProps["children"].push(inlineDoctorRegisterButtonsDefaultProps);

  return formProps;
}

const defaultModalProps = {
  props: {
    attributes: new Map(),
    classList: [
      "modal",
      "fade-in",
    ]
  },
  children: []
}

const defaultOverlayProps = {
  props: {
    attributes: new Map(),
    classList: [
      "modal-overlay",
    ]
  },
  children: []
}

const defaultBoxProps = {
  props: {
    attributes: new Map(
      [
        [ "role", "formulary" ]
      ]
    ),
    classList: [
      "modal-box"
    ]
  },
  children: []
}

// TODO: Solucionar el problema de copiar una función de Eventlistner asignada al defaultprops despues de su clonación. Por qué sucede?? ni idea. Seek And Destroy!!
const defaultHeaderProps = {
  props: { },
  children: [
    {
      props: {
        tag: "div",
        classList: [
          "title-container"
        ]
      },
      children: [
        {
          props: {
            tag: "h1",
            textContent: TITLE
          },
          children: []
        },
        {
          props: {
            tag: "h2",
            textContent: SUBTITLE
          },
          children: []
        }
      ]
    },
    {
      props: {
        attributes : new Map(
          [
            [ "id", "closeModalButton" ]
          ]
        ),
        eventListener: {}
      },
      children: []
    }
  ]
}

const defaultBodyProps = {
  props: {
    attributes: new Map(
      [
        [ "id", "modalBody"] ,
        [ "role", "form" ]
      ]),
    classList: [
      "modal-body"
    ]
  },
  children: []
}

const defaultFormularyProps = {
  props: {
    attributes: [
      ["action", ""]
    ],
    eventListener: {}
  },
  children: []
}

const defaultUserInputProps = {
  props: {
    tag: "div",
    classList: ["user-input"],
    component: {
      id: "userInput_FieldName"
    }
  },
  children : [
    {
      props: {
        tag: "label",
        type: "label",
        textContent: "",
        for: "",
        classList: [],
        component: {
          id: ""
        }
      },
      children: []
    },
    {
      props: {
        tag: "input",
        type: "",
        required: "true",
        id: "",
        placeholder: "",
        classList: [],
        component: {
          id: ""
        }
      },
      children: []
    },
    {
      props: {
        tag: "p",
        id: "",
        classList: [
          "complementary-text",
          "error",
          ""
        ],
        component: {
          id: ""
        }
      },
      children: []
    }
  ]
}

const userInputNameProps = {
  props: {
    component: {
      type: "userInput",
      id: "userInputName"
    }
  },
  children: [
    {
      props: {
        textContent: "Name",
        for: "name",
        component: {
          id: "userInputNameLabel"
        }
      },
    },
    {
      props: {
        type: "text",
        required: "true",
        id: "name",
        value: "",
        component: {
          id: "userInputNameInput"
        }
      },
    },
    {
      props: {
        component: {
          id: "userInputNameComplementaryText"
        }
      },
    }
  ]
}

const userInputMedicalIdProps = {
  props: {
    component: {
      type: "userInput",
      id: "userInputMedicalId",
    }
  },
  children: [
    {
      props: {
        textContent: "Medical ID",
        for: "medicalId",
        component: {
          id: "userInputMedicalIdLabel"
        }
      },
    },
    {
      props: {
        type: "text",
        required: "true",
        id: "medicalId",
        value: "",
        component: {
          id: "userInputMedicalIdInput"
        }
      },
    },
    {
      props: {
        component: {
          id: "userInputMedicalIdComplementaryText"
        }
      },
    }
  ]
}

const userInputEmailProps = {
  props: {
    component: {
      type: "userInput",
      id: "userInputEmail"
    }
  },
  children: [
    {
      props: {
        textContent: "Email",
        for: "email",
        component: {
          id: "userInputEmailLabel"
        }
      },
    },
    {
      props: {
        type: "email",
        required: "true",
        id: "email",
        value: "",
        placeholder: "name@smartclinic.com",
        component: {
          id: "userInputEmailInput"
        }
      },
    },
    {
      props: {
        component: {
          id: "userInputEmailComplementaryText"
        }
      },
    }
  ]
}

const userInputPasswordProps = {
  props: {
    component: {
      type: "userInput",
      id: "userInputPassword"
    }
  },
  children: [
    {
      props: {
        textContent: "Password",
        for: "password",
        component: {
          id: "userInputPasswordLabel"
        }
      },
    },
    {
      props: {
        type: "password",
        required: "true",
        id: "password",
        value: "",
        component: {
          id: "userInputPasswordInput"
        }
      },
    },
    {
      props: {
        component: {
          id: "userInputPasswordComplementaryText"
        }
      },
    }
  ]
}

const userInputPhoneProps = {
  props: {
    component: {
      type: "userInput",
      id: "userInputPhone"
    }
  },
  children: [
    {
      props: {
        textContent: "Phone",
        for: "phone",
        component: {
          id: "userInputPhoneLabel"
        }
      },
    },
    {
      props: {
        type: "tel",
        required: "true",
        id: "phone",
        value: "",
        placeholder: "e.g. 123-45-678-90",
        pattern: "[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{2}",
        component: {
          id: "userInputPhoneInput"
        }
      },
    },
    {
      props: {
        component: {
          id: "userInputPhoneComplementaryText"
        }
      },
    }
  ]
}

const userInputYearsOfExperienceProps = {
  props: {
    component: {
      type: "userInput",
      id: "userInputYearsOfExperience"
    }
  },
  children: [
    {
      props: {
        textContent: "Years of experience",
        for: "yearsOfExperience",
        component: {
          id: "userInputYearOfExperienceLabel"
        }
      },
    },
    {
      props: {
        type: "number",
        required: "true",
        id: "yearsOfExperience",
        value: "",
        pattern: "\d{1,2}",
        component: {
          id: "userInputYearOfExperienceInput"
        }
      },
    },
    {
      props: {
        component: {
          id: "userInputYearOfExperienceComplementaryText"
        }
      },
    }
  ]
}

const userInputRatingProps = {
  props: {
    component: {
      type: "userInput",
      id: "userInputRating"
    }
  },
  children: [
    {
      props: {
        textContent: "Rating",
        for: "rating",
        component: {
          id: "userInputRatingLabel"
        }
      },
    },
    {
      props: {
        type: "number",
        required: "true",
        id: "rating",
        value: "",
        pattern: "[0-5]{1}",
        min: 0,
        max: 5,
        component: {
          id: "userInputRatingInput"
        }
      },
    },
    {
      props: {
        component: {
          id: "userInputRatingComplementaryText"
        }
      },
    }
  ]
}

const userInputHiddenIdProps = {
  props: {
    component: {
      type: "userInput",
      id: "userInputHiddenId"
    }
  },
  children: [
    {
      props: {
        textContent: "",
        for: "",
        component: {
          id: "userInputHiddenIdLabel"
        }
      },
    },
    {
      props: {
        type: "hidden",
        required: "",
        formularyData: 'id',
        id: "id",
        value: "",
        component: {
          id: "userInputHiddenIdInput"
        }
      },
    },
    {
      props: {
        component: {
          id: "userInputHiddenIdComplementaryText"
        }
      },
    }
  ]
}

//const doctorRegisterButtonsProps = {
const inlineDoctorRegisterButtonsDefaultProps = {
  props: {
    component: {
      type: "inlineButtons",
      id: "inlineSubmitButtonsDoctorRegister"
    }
  },
  children: [
    {
      props: {
        attributes: new Map(
          [
            ["id", CANCEL_FORMULARY_BUTTON_ID]
          ]),
        textContent: "Cancel",
        classList: [],
        component: {
          id: "cancelSubmitButtonDoctorRegister"
        }
      },
      children: [],
    },
    {
      props: {
        attributes: new Map(
          [
            ["id", "registerDoctorModalButton"]
          ]),
        textContent: "Register",
        classList: [],
        component: {
          id: "submitButtonDoctorRegister"
        }
      },
      children: []
    }
  ]
}

// const doctorUpdateButtonsProps = {
// TODO: en realidad estas Props son una mezcla entre inlineButtonsDefaultProps y DoctorUpdateButtons, hay que separarlas en defaultProps y getCustomizedInlineDoctorUpdateButtonsProps() ...
const inlineDoctorUpdateButtonsDefaultProps = {
  props: {
    component: {
      type: "inlineButtons",
      id: "inlineSubmitButtonsDoctorUpdate"
    }
  },
  children: [
    {
      props: {
        attributes: new Map(
          [
            ["id", CANCEL_FORMULARY_BUTTON_ID]
          ]),
        textContent: "Cancel",
        classList: [],
        component: {
          id: "cancelSubmitButtonDoctorUpdate"
        }
      },
      children: [],
    },
    {
      props: {
        attributes: new Map(
          [
            ["id", "updateDoctorModalButton"]
          ]),
        textContent: "Update",
        classList: [],
        component: {
          id: "submitButtonDoctorUpdate"
        }
      },
      children: []
    }
  ]
}

/*
export function mapDoctorDataToPersonalDataInputsProps(name, email, password, phone) {
  return {
    props: {
      type: 'personalDataInputs',
    },
    children: [
      {
        props: {
          type: 'userInput',
          formularyData: 'name',
        },
        children: [
          {
            props: {
              tag: 'label',
              type: 'title',
              textContent: 'Name',
              setAttribute: {
                qualifiedName: 'for',
                value: 'name',
              },
            },
            children: []
          },
          {
            props: {
              tag: 'input',
              type: 'text',
              required: true,
              value: name,
              id: 'name',
              placeholder: 'Type full name',
              className: 'input-field',
            },
            children: []
          },
          {
            props: {
              tag: 'label',
              type: 'error',
              id: 'nameErrorLabel',
              setAttribute: {
                qualifiedName: 'for',
                value: 'name',
              },
              className: 'error-label hide',
            },
            children: []
          }
        ],
      },
      {
        props: {
          type: 'userInput',
          formularyData: 'email',
        },
        children: [
          {
            props: {
              tag: 'label',
              type: 'title',
              textContent: 'Email',
              setAttribute: {
                qualifiedName: 'for',
                value: 'email',
              },
            },
            children: []
          },
          {
            props: {
              tag: 'input',
              type: 'text',
              required: true,
              value: email,
              id: 'email',
              placeholder: 'e.g. name.firstname@smartclinic.com',
              className: 'input-field',
            },
            children: []
          },
          {
            props: {
              tag: 'label',
              type: 'error',
              id: 'emailErrorLabel',
              setAttribute: {
                qualifiedName: 'for',
                value: 'email',
              },
              className: 'error-label hide',
            },
            children: []
          }
        ],
      },
      {
        props: {
          type: 'userInput',
          formularyData: 'password',
        },
        children: [
          {
            props: {
              tag: 'label',
              type: 'title',
              textContent: 'Password',
              setAttribute: {
                qualifiedName: 'for',
                value: 'password',
              },
            },
            children: []
          },
          {
            props: {
              tag: 'input',
              type: 'password',
              required: true,
              value: password,
              id: 'password',
              placeholder: 'Type your password',
              className: 'input-field',
            },
            children: []
          },
          {
            props: {
              tag: 'label',
              type: 'error',
              id: 'passwordErrorLabel',
              setAttribute: {
                qualifiedName: 'for',
                value: 'password',
              },
              className: 'error-label hide',
            },
            children: []
          }
        ],
      },
      {
        props: {
          type: 'userInput',
          formularyData: 'phone',
        },
        children: [
          {
            props: {
              tag: 'label',
              type: 'title',
              textContent: 'Phone',
              setAttribute: {
                qualifiedName: 'for',
                value: 'phone',
              },
            },
            children: []
          },
          {
            props: {
              tag: 'input',
              type: 'tel',
              required: true,
              value: phone,
              id: 'phone',
              placeholder: 'e.g. 123-45-678-90',
              pattern: "[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{2}",
              className: 'input-field',
            },
            children: []
          },
          {
            props: {
              tag: 'label',
              type: 'error',
              id: 'phoneErrorLabel',
              setAttribute: {
                qualifiedName: 'for',
                value: 'phone',
              },
              className: 'error-label hide',
            },
            children: []
          }
        ],
      },
    ]
  }
}
 */

/*
  TODO: Mapear los Props Profesionales: yearsOfExperience, rating, id
 */
/*
export function mapDoctorDataToProfessionalDataInputsProps(yearsOfExperience, rating, id) {
  return {
    props: {
      type: 'professionalDataInputs',
    },
    children: [
      {
        props: {
          type: 'userInput',
          formularyData: 'yearsOfExperience',
        },
        children: [
          {
            props: {
              tag: 'label',
              type: 'title',
              textContent: 'Years of Experience',
              setAttribute: {
                qualifiedName: 'for',
                value: 'yearsOfExperience',
              },
            },
            children: []
          },
          {
            props: {
              tag: 'input',
              type: 'number',
              min: 0,
              max: 99,
              required: true,
              value: yearsOfExperience,
              id: 'yearsOfExperience',
              className: 'input-field',
            },
            children: []
          },
          {
            props: {
              tag: 'label',
              type: 'error',
              id: 'yearsOfExperienceErrorLabel',
              setAttribute: {
                qualifiedName: 'for',
                value: 'yearsOfExperience',
              },
              className: 'error-label hide',
            },
            children: []
          }
        ],
      },
      {
        props: {
          type: 'userInput',
          formularyData: 'rating',
        },
        children: [
          {
            props: {
              tag: 'label',
              type: 'title',
              textContent: 'Rating',
              setAttribute: {
                qualifiedName: 'for',
                value: 'rating',
              },
            },
            children: []
          },
          {
            props: {
              tag: 'input',
              type: 'text',
              required: true,
              value: rating,
              id: 'rating',
              min: 0,
              max: 5,
              className: 'input-field',
            },
            children: []
          },
          {
            props: {
              tag: 'label',
              type: 'error',
              id: 'emailErrorLabel',
              setAttribute: {
                qualifiedName: 'for',
                value: 'email',
              },
              className: 'error-label hide',
            },
            children: []
          }
        ],
      },
      {
        props: {
          type: 'hidden',
          formularyData: 'id',
        },
        children: [
          {
            props: {
              tag: 'input',
              type: 'hidden',
              value: id,
              id: 'id',
            },
            children: []
          },
        ],
      },
    ]
  };
}
 */

export function getAvailableTimesCheckboxesProps(availableTimes) {
  return {
    props: {
      type: 'checkboxesContainer',
      name: 'availableTimes',
      tag: 'div',
      className: 'availability-container',
    },
    children: [
      {
        props: {
          type: 'caption',
          tag: 'label',
          className: 'availability-label',
          textContent: 'Select Availability',
        },
        children: []
      },
      {
        props: {
          type: 'checkboxesGroup',
          tag: 'div',
          className: 'checkbox-group',
          id: 'availabilityCheckboxesGroup',
        },
        children: [
          ...setupCheckboxGroupOptionsProps(Config.AVAILABLE_TIMES_SELECT_OPTIONS, availableTimes)
        ]
      }
    ]
  };
}

function setupCheckboxGroupOptionsProps(checkboxGroupOptionsData, availableTimes) {
  const optionsProps = [];

  for (let optionData in checkboxGroupOptionsData) {
    const isChecked = availableTimes.includes(checkboxGroupOptionsData[optionData]);
    const optionProps = {
      props: {
        type: 'checkboxOption',
        tag: 'label',
      },
      children: [
        {
          props: {
            type: 'checkbox',
            tag: 'input',
            value: 'Config.AVAILABLE_TIMES_SELECT_OPTIONS[option]',
            name: 'availabilityCheckbox',
            className: 'input-field',
            checked: isChecked
          },
          children: []
        },
        {
          props: {
            type: 'text',
            tag: 'text',
            name: 'availabilityText',
            value: checkboxGroupOptionsData[optionData]
          },
          children: []
        }
      ]
    }
    optionsProps.push(optionData);
  }
  return optionsProps;
}

export function getSpecialtySelectProps() {
  const optionsProps = setupSelectOptionsProps(Config.SPECIALTIES);
  return {
    props: {
      id: 'specialty',
      eventListener: {
        type: 'change',
        handler: document.filterBySpecialty
      }
    },
    children: [
      {
        props: {
          type: 'caption',
          textContent: "Choose Specialty",
          value: ''
        },
        children: []
      },
      ...optionsProps
    ]
  }
}

function setupSelectOptionsProps(optionsValues) {
  const optionsProps = [];

  optionsValues.forEach(value => {
    const optionProps = {
      props: {
        type: 'option',
        tag: 'option',
        value: value,
        textContent: value,
        selected: false
      },
      children: []
    }
    optionsProps.push(optionProps);
  })

  return optionsProps;
}

// TODO: Pattern para phone y otros.
/*
  userInputType -> text, number, tel, email, url, hidden
  formulary field -> yearsOfExperience, phone, email -> userInputYearsOfExperienceLabel, userInputPhoneComplementaryText
  formulary data -> 4 (years of experience), dr.samuel@smartclinic.com, ...
 */
function mapFormularyFieldPropsAndDataToUserInputProps(fieldProps, fieldData) {
  // clones y configuramos
  const customizedUserInputProps = structuredClone(defaultUserInputProps);
  const labelProps = customizedUserInputProps["children"][0];
  const inputProps = customizedUserInputProps["children"][1];
  const complementaryTextProps = customizedUserInputProps["children"][2];

  customizedUserInputProps["props"]["component"]["id"] = fieldProps["props"]["component"]["id"];

  labelProps["props"]["textContent"] = fieldProps["children"][0]["props"]["textContent"];
  labelProps["props"]["for"] = fieldProps["children"][0]["props"]["for"];
  labelProps["props"]["component"]["id"] = fieldProps["children"][0]["props"]["component"]["id"];

  inputProps["props"]["type"] = fieldProps["children"][1]["props"]["type"];
  inputProps["props"]["id"] = fieldProps["children"][1]["props"]["id"];
  inputProps["props"]["component"]["id"] = fieldProps["children"][1]["props"]["component"]["id"];
  if (fieldProps["children"][1]["props"]["placeholder"]) {
    inputProps["props"]["placeholder"] = fieldProps["children"][1]["props"]["placeholder"];
  }
  if (fieldProps["children"][1]["props"]["required"]) {
    inputProps["props"]["required"] = true
  }
  inputProps["props"]["value"] = fieldData;

  complementaryTextProps["props"]["component"]["id"] = fieldProps["children"][2]["props"]["component"]["id"];

  return customizedUserInputProps;
}
