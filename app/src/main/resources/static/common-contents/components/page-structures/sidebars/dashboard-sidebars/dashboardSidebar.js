
const sidebarTitleSectionProps = {
  header: {
    className: "sidebar-header"
  },
  title: {
    textContent: "My Dashboard",
    className: "title"
  },
};

const sidebarMenuSectionProps = {
  menuItems: [
    {
      htmlEl: "a",
      href: "#",
      textContent: "Appointments",
      className: "sidebar-menu-item",
    }, {
      htmlEl: "a",
      href: "#",
      textContent: "Doctors",
      className: "sidebar-menu-item selected",
    }, {
      htmlEl: "a",
      href: "#",
      textContent: "Patients",
      className: "sidebar-menu-item",
    }
  ]
}

export function init() {
  setup();
  //addEventListenerToLoginSection();
}

export function setup(entityType) {
  const sidebar = document.getElementById("sidebar");
  sidebar.appendChild(createTitleSection(sidebarTitleSectionProps));
  sidebar.appendChild(createNavigationMenu({ menuItems: sidebarMenuSectionProps.menuItems }))
}

function createTitleSection(props) {
  const header = document.createElement("header");
  const title = document.createElement("h1");

  header.className = props.header.className;
  title.className = props.title.className;
  title.textContent = props.title.textContent;

  header.appendChild(title);
  return header;
}

function createNavigationMenu(props) {
  const menu = document.createElement("nav");

  props.menuItems.forEach(menuItem => {
    const item = document.createElement(menuItem.htmlEl);
    item.href = menuItem.href;
    item.textContent = menuItem.textContent;
    item.className = menuItem.className;

    menu.appendChild(item);
  })
  return menu;
}