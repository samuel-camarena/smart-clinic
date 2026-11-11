/*
  Interfaz KebabProps:
  - containerProps
  - togglerMenuProps
  - imgProps
  - dropdownMenuProps
  - entityValue.id
 */
//export function createEl() {
export function createEl({ containerProps, togglerMenuProps, imgProps, dropdownMenuProps, entityValue }) {
  const container = document.createElement('div');
  const img = document.createElement('img');
  const togglerMenu = document.createElement('div');

  container.className = containerProps.className;
  //container.addEventListener("click", toggleDropdownVisibility);
  togglerMenu.className = togglerMenuProps.className;
  togglerMenu.addEventListener(togglerMenuProps.eventListener.type, toggleDropdownVisibility);
  img.className = imgProps.className;
  img.src = imgProps.src;

  togglerMenu.appendChild(img);
  container.append(
    togglerMenu,
    createDropDownMenuEl({ ...dropdownMenuProps }, entityValue.id),
  );

  return container;
}

function createDropDownMenuEl({ className, name, optionsProps, }, entityId) {
  const container = document.createElement('div');
  container.className = className;
  container.name = name;

  optionsProps.forEach(optionProps => {
    if (optionProps.separatorProps) {
      container.appendChild(createSeparatorEl(optionProps));
    } else {
      container.appendChild(createOptionEl({ ...optionProps} , entityId));
    }
  });

  return container;
}

function createOptionEl({ containerProps, iconProps, linkProps} , entityId) {
  const container = document.createElement('span');
  const link = document.createElement('a');
  const icon = document.createElement('img');

  container.className = containerProps.className;
  icon.className = iconProps.className; //"menu-option-icon";
  icon.src = iconProps.src;
  link.className = linkProps.className; // "menu-option";
  link.href = linkProps.href; // "#";
  link.textContent = linkProps.textContent;
  container.addEventListener('click', (e) => {
    linkProps.eventListener.handler(entityId)
  })

  container.append(icon, link);
  return container;
}

function createSeparatorEl({ separatorProps }) {
  const separator = document.createElement('hr');
  separator.className = separatorProps.className;
  return separator;
}

function toggleDropdownVisibility(event) {
  if (!document.currentlyOpenedDropdownMenuEl) {
    document.currentlyOpenedDropdownMenuEl = event.currentTarget.nextSibling;

  } else if (document.currentlyOpenedDropdownMenuEl?.dataset?.dropdownId
    !== event.currentTarget.nextSibling?.dataset?.dropdownId) {

    document.currentlyOpenedDropdownMenuEl.classList.remove('show');
    document.currentlyOpenedDropdownMenuEl = event.currentTarget.nextSibling;
  }

  event.currentTarget.nextSibling.classList.toggle('show');
}

//export default KebabMenuFactory;