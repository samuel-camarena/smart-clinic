
export function createEl(props) {
  const section = document.createElement("section");
  const container = createInlineContainerEl(props.inlineContainerProps);

  if (props.sectionProps?.className) {
    section.className = props.sectionProps.className;
  }
  if (props.titleProps) {
    section.appendChild(createTitleEl(props.titleProps));
  }
  if (props.labelProps) {
    container.appendChild(createLabelEl(props.labelProps));
  }
  if (props.buttonsProps) {
    container.append(...createButtonEls(props.buttonsProps));
  }
  if (props.inputBarsProps) {
    container.append(...createInputBarEls(props.inputBarsProps));
  }
  if (props.selectsProps) {
    container.append(...createSelectEls(props.selectsProps));
  }

  section.appendChild(container)
  return section;
}

function createTitleEl({ tag, textContent, className }) {
  const title = (tag)
    ? document.createElement(tag)
    : document.createElement("span");

  if (textContent) {
    title.textContent = textContent;
  }
  if (className) {
    title.className = className;
  }

  return title;
}

function createLabelEl(labelProps) {
  const label = document.createElement('label')
  if (labelProps.textContent) {
    label.textContent = labelProps.textContent;
  }
  if (labelProps.className) {
    label.className = labelProps.className;
  }
  if (labelProps.id) {
    label.id = labelProps.id;
  }
  return label;
}

function createInlineContainerEl({ className }) {
  const container = document.createElement("span");
  if (className) {
    container.className = className;
  }
  return container;
}

function createButtonEls(buttonsProps) {
  const btns = [];

  if (buttonsProps) {
    buttonsProps
      .forEach(buttonProps => {
        btns.push(createButtonEl(buttonProps));
      })
  }
  return btns;
}

function createButtonEl(buttonProps) {
  const btn = document.createElement("button");

  if (buttonProps.textContent) {
    btn.textContent = buttonProps.textContent;
  }
  if (buttonProps.id) {
    btn.id = buttonProps.id;
  }
  if (buttonProps.className) {
    btn.className = buttonProps.className;
  }
  if (buttonProps?.eventListener?.type && buttonProps?.eventListener?.handler) {
    btn.addEventListener(
      buttonProps.eventListener.type,
      buttonProps.eventListener.handler,
    );
  }

  return btn;
}

function createInputBarEls(inputBarsProps) {
  const inputBars = [];

  if (inputBarsProps) {
    inputBarsProps
      .forEach(inputBarProps => {
        inputBars.push(createInputBarEl(inputBarProps));
      })
  }
  return inputBars;
}

function createInputBarEl(props) {
  const input = document.createElement("input");

  input.type = props.type;
  if (props.className) {
    input.className = props.className;
  }
  if (props.id) {
    input.id = props.id;
  }
  if (props.placeholder) {
    input.placeholder = props.placeholder;
  }
  if (props?.eventListener?.type && props?.eventListener?.handler) {
    input.addEventListener(
      props.eventListener.type,
      props.eventListener.handler,
    );
  }

  return input;
}

function createSelectEls(selectsProps) {
  const selects = [];

  if (selectsProps) {
    selectsProps
      .forEach(selectProps => {
        selects.push(
          createSelectEl(selectProps, ""));
      })
  }
  return selects;
}

function createSelectEl(selectProps, selectedOption) {
  const select = document.createElement("select");
  const opCaption = document.createElement("option");

  if (selectProps.id) {
    select.id = selectProps.id;
  }
  if (selectProps.className) {
    select.className = selectProps.className;
  }
  if (selectProps?.optionCaptionProps?.value || selectProps?.optionCaptionProps?.value === "") {
    opCaption.value = selectProps.optionCaptionProps.value;
  }
  if (selectProps?.optionCaptionProps?.textContent) {
    opCaption.textContent = selectProps.optionCaptionProps.textContent;
  }

  select.add(opCaption);
  if (selectProps?.eventListener?.type && selectProps.eventListener?.handler) {
    select.addEventListener(
      selectProps.eventListener.type,
      selectProps.eventListener.handler,
    );
  }

  selectProps
    ?.optionsProps
      .forEach(opProps => {
        const op = document.createElement("option");
        op.value = opProps.value ? opProps.value : "";
        op.textContent = opProps.textContent ? opProps.textContent : "";
        op.selected = opProps === selectedOption;
        select.add(op);
      })

  return select;
}
