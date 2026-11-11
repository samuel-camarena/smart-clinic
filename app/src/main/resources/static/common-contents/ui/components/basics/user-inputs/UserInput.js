
export function createEl(userInputProps) {
  const userInputEl = document.createElement("div");

  userInputProps["props"]["classList"]?.forEach((styleClass) => {
    if (styleClass !== "") {
      userInputEl.classList.add(styleClass);
    }
  });

  userInputEl.append(
    createLabelEl(userInputProps["children"][0]),
    createInputEl(userInputProps["children"][1]),
    createComplementaryTextEl(userInputProps["children"][2])
  )
  return userInputEl;
}

function createLabelEl({ props, children }) {
  const label = document.createElement(props["tag"]);
  label.textContent = props["textContent"];
  label.setAttribute("for", props["for"]);

  props["classList"]?.forEach((styleClass) => {
    if (styleClass !== "") {
      label.classList.add(styleClass);
    }
  });
  return label;
}

function createInputEl({ props, children }) {
  const input = document.createElement(props["tag"]);
  input.setAttribute("type",props["type"]);
  input.setAttribute("required", props["required"]);
  input.setAttribute("id", props["id"]);
  //input.setAttribute("name", props["name"]);
  input.setAttribute("placeholder",props["placeholder"]);

  props["classList"]?.forEach((styleClass) => {
    if (styleClass !== "") {
      input.classList.add(styleClass);
    }
  });
  return input;
}

function createComplementaryTextEl({ props, children }) {
  const p = document.createElement(props["tag"]);
  p.setAttribute("id", props["id"]);
  p.textContent = props["textContent"];

  props["classList"]?.forEach((styleClass) => {
    if (styleClass !== "") {
      p.classList.add(styleClass);
    }
  });
  return p;
}
