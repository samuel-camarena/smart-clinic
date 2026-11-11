import * as KebabMenus from '../../middle/menus/kebab-menus/kebabMenusFactory.js';

export function createIconAndTextRowEl({ props, children }) {
  const container = document.createElement("span");
  const icon = document.createElement("img");
  const text = document.createElement("p");

  container.className = props.className;
  icon.className = children['icon'].props.className;
  icon.src = children['icon'].props.src;
  icon.alt = children['icon'].props.alt;
  text.className = children['text'].props.className;
  text.textContent = children['text'].props.textContent;

  container.append(icon, text);
  if (children['tooltip']) {
    container.appendChild(
      createTextAndIconTooltipEl(children['tooltip'])
    );
  }

  return container;
}

//export function createIconAndTextWithTooltipRowEl({ props, children }) {

function createTextAndIconTooltipEl({ props, children }) {
  const container = document.createElement("span");
  const text = document.createElement("p");
  const icon = document.createElement("img");

  container.className = props.className;
  text.className = children['text'].props.className;
  text.textContent = children['text'].props.textContent;
  icon.className = children['icon'].props.className;
  icon.src = children['icon'].props.src;
  icon.alt = children['icon'].props.alt;

  container.append(
    text,
    icon
  );
  return container;
}

export function createTitleAndKebabMenuRowEl({ spanProps, textProps, kebabProps }) {
  const container = document.createElement('span');
  const text = document.createElement('h1');

  container.className = spanProps.className;
  text.className = textProps.className;
  text.textContent = textProps.textContent;

  container.append(
    text,
    KebabMenus.createEl(
      {
        ...kebabProps,
      })
  );
  return container;
}

/*
export function createWithIconAndManyTextsEl({ containerProps, iconProps, textsProps }) {
  const container = document.createElement("span");
  const icon = document.createElement("img");
  const text1 = document.createElement("p");
  const text2 = document.createElement("p");

  container.className = containerProps.className;
  icon.className = iconProps.className;
  icon.src = iconProps.src;
  icon.alt = iconProps.alt;
  container.appendChild(icon);

  textsProps.forEach(textProps => {
    const text = document.createElement("p");
    text.className = textProps.className;
    text.textContent = textProps.textContent;

    container.appendChild(text);
  })

  return container;
}
*/
