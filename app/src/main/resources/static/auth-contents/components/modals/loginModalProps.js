import * as ModalProps from "../../../admin-contents/components/modals/doctorModalProps.js";

export const IDENTIFIER_INPUT_ID = "identifier";
export const IDENTIFIER_COMPLEMENTARY_TEXT_ID = "idComplementaryText";
export const PASSWORD_INPUT_ID = "password";
export const PASSWORD_COMPLEMENTARY_TEXT_ID = "passwordComplementaryText";

//const LOGIN_MODAL_OVERLAY_ID = "loginModalOverlay";
//const LOGIN_MODAL_BOX_ID = "loginModalBox";
const MODAL_ID = "loginModal"
const TITLE = "Login";
const SUBTITLE = "Please enter your login credentials below";

export function getProps() {
  const props = structuredClone(modalProps);
  const overlayProps = getOverlayProps();
  overlayProps["children"].push(
    getBoxProps()
  );
  props["props"]["attributes"].set("id", MODAL_ID);
  props["children"].push(overlayProps);
  return props;
}

function getOverlayProps() {
  return structuredClone(overlayProps);
}

function getBoxProps() {
  const props = structuredClone(boxProps);
  props["children"].push(getHeaderProps());
  props["children"].push(getBodyProps());
  props["children"].push(getFooterProps());
  return props;
}

function getHeaderProps() {
  const props = structuredClone(headerProps);
  const inlineTitleProps = props["children"][0];
  const titleProps = inlineTitleProps["children"][0];
  const subtitleProps = inlineTitleProps["children"][1];
  const closeButton = props["children"][1];

  titleProps["props"]["textContent"] = TITLE;
  subtitleProps["props"]["textContent"] = SUBTITLE;
  closeButton["props"]["eventListener"] = {
    type: "click",
    handler: () => document.closeModal()
  }

  return props;
}

function getBodyProps() {
  const props = structuredClone(bodyProps);
  const formProps = structuredClone(formularyProps);

  // TODO: Nombre de la función: handleLoginSubmit ... handleRegisterDoctorSubmit
  formProps["props"]["eventListener"] = {
    type: "submit",
    handler: (event) => {
      event.preventDefault();
      document.loginSubmitHandle();
    }
  }
  formProps["children"].push(userInputIdentifierProps);
  formProps["children"].push(userInputPasswordProps);
  formProps["children"].push(getInlineLoginButtonProps());

  props["children"].push(formProps);
  return props;
}

function getFooterProps() {
  const props = structuredClone(footerProps);
  // TODO: añadir props de los links (forgotten password y demás).
  return props;
}

const modalProps = {
  props: {
    attributes: new Map(),
    classList: [
      "modal",
      "fade-in",
    ]
  },
  children: []
}

const overlayProps = {
  props: {
    attributes: new Map(),
    classList: [
      "modal-overlay",
    ]
  },
  children: []
}

const boxProps = {
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

const headerProps = {
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

const bodyProps = {
  props: {
    attributes: new Map(
      [
        ["id", "modalBody"],
        ["role", "form"]
      ]),
    classList: [
      "modal-body"
    ]
  },
  children: []
}

const footerProps = {
  props: {
    attributes: new Map(
      [
        ["id", "modalFooter"],
      ]),
    classList: []
  },
  children: []
}

const formularyProps = {
  props: {
    attributes: [
      ["action", ""]
    ],
    eventListener: {}
  },
  children: []
}

const userInputIdentifierProps = {
  props: {
    tag: "div",
    classList: ["user-input"],
    id: "userInputIdentifier"
  },
  children : [
    {
      props: {
        tag: "label",
        type: "label",
        textContent: "Your email",
        for: "identifier",
        classList: []
      },
      children: []
    },
    {
      props: {
        tag: "input",
        type: "email",
        required: "true",
        id: IDENTIFIER_INPUT_ID,
        placeholder: "name@smartclinic.com",
        classList: []
      },
      children: []
    },
    {
      props: {
        tag: "p",
        id: IDENTIFIER_COMPLEMENTARY_TEXT_ID,
        classList: [
          "complementary-text",
          "error",
          ""
        ]
      },
      children: []
    }
  ]
}

const userInputPasswordProps = {
  props: {
    tag: "div",
    classList: ["user-input"],
    id: "userInputPassword"
  },
  children : [
    {
      props: {
        tag: "label",
        type: "label",
        textContent: "Your password",
        for: PASSWORD_INPUT_ID,
        classList: []
      },
      children: []
    },
    {
      props: {
        tag: "input",
        type: "password",
        required: "true",
        id: PASSWORD_INPUT_ID,
        placeholder: "password",
        classList: []
      },
      children: []
    },
    {
      props: {
        tag: "p",
        id: PASSWORD_COMPLEMENTARY_TEXT_ID,
        classList: [
          "complementary-text",
          "error",
          ""
        ]
      },
      children: []
    }
  ]
}

const inlineButtonDefaultProps = {
  props: {
    component: {
      type: "inlineButton",
      id: "inlineSubmitLoginButton"
    },
    classList: ["inline-button"]
  },
  children: []
}

const buttonDefaultProps = {
  props: {
    attributes: new Map(
      [
        ["id", ""]
      ]),
    textContent: "",
    classList: []
  },
  children: []
}

function getInlineLoginButtonProps() {
  const propsToCustomize = structuredClone(inlineButtonDefaultProps);
  propsToCustomize["children"].push(
    getLoginButtonProps()
  );
  return propsToCustomize;
}

function getLoginButtonProps() {
  const propsToCustomize = structuredClone(buttonDefaultProps);
  propsToCustomize["props"]["attributes"].set("id", "loginModalButton");
  propsToCustomize["props"]["textContent"] = "Login";
  return propsToCustomize;
}