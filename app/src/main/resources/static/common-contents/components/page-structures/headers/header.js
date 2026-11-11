import * as SessionManager from "../../../../infrastructure/adapters/storage/sessionManager.js";

export const mainContentsNames = ['about', 'community', 'services', 'pricing'];
const linkIdPostfix = "HeaderLink";
export const mainContentsLinkNames = [
  mainContentsNames[0] + linkIdPostfix,
  mainContentsNames[1] + linkIdPostfix,
  mainContentsNames[2] + linkIdPostfix,
  mainContentsNames[3] + linkIdPostfix,
]
export const mainContentsLinks = new Map();

const avatarMenuOptions = [
  {
    name: "Dashboard",
    iconSrc: "/assets/images/common/menus/icons/dashboard.svg"
  }, {
    name: "Account",
    iconSrc: "/assets/images/common/menus/icons/account_circle.svg"
  }, {
    name: "Settings",
    iconSrc: "/assets/images/common/menus/icons/settings.svg"
  }, {
    name: "Notifications",
    iconSrc: "/assets/images/common/menus/icons/notifications.svg"
  }, {
    name: "Logout",
    iconSrc: "/assets/images/common/menus/icons/logout.svg"
  }
];
/*
const mainContentLink = {
  name: 'about',
  label: 'About us',
  id: 'aboutHeaderLink',
  element: document.createElement('a'),
  href: '#'
  contentTarget: 'about'
}
*/

export function init() {
  setup();
  addEventEventListenerToLoginSection();
}

export function clearContents() {
  document?.getElementById("header")?.replaceChildren();
}

export function styleSelectedMainContentLink(type) {
  mainContentsLinks
    .forEach((link, content) => {
      (content === type)
        ? link.classList.add("selected")
        : link.classList.remove("selected"); });

  /*
  mainContentsLinks.currentSelected = "about";

  if (!type || type not instanceOf String) return;

  const typeLower = type.toLowerCase();

  if (type not in mainContentsLinks.key())

  mainContentsLinks[type]
   */
  // Ejemplo del libro Front-end para comprobación de nulos con OR operator.
  // let companyStreet = user?.company?.address?.street || 'No company street';
  // let msg = mainConstentsLinks[type]?.textContent || "No link or text content of type: " + type;

  /* Map[type] NO es Object -> map.get(type) -> value
  if (mainContentsLinks[type]) {
    mainContentsLinks[type].classList.add("selected");
  }
  */
  /*
  mainContentsLinks
    .filter(link => link.id === type)
    .map(link => link.classList.add("selected"));
  */
  /*
  switch (type.toLowerCase()) {
    case "about":
      const aboutLink = document.getElementById("aboutLink");
      aboutLink.classList.add("selected");
      break;


    default:
  }

   */
}

export function setup(entityType) {
  const header = document.getElementById("header");
  header.appendChild(createLogoSection());

  if (window.location.pathname === "/") {
    header.appendChild(createMainNavigationSection());
    header.appendChild(createQuickServicesSection());
  }

  if (SessionManager.isCurrentSessionValid()) {
    header.appendChild(createAvatarSection());
  } else {
    header.appendChild(createLoginSection());
  }
}

function createLogoSection() {
  const section = document.createElement("section");
  const img = document.createElement("img");
  const text = document.createElement("span");

  section.className = "logo-section";
  section.addEventListener("click", () => window.location.href = "/");
  img.className = "logo-img-heart";
  img.src = "/assets/images/logo/logo.svg";
  img.alt = "Smart Clinic Logo";
  img.scrollIntoView();
  text.className = "logo-text";
  text.textContent = "Smart Clinic";

  section.append(img, text);
  return section;
}

function createMainNavigationSection() {
  const nav = document.createElement("nav");
  nav.className = "services-nav";
  nav.id = "servicesNav";

  setupMainNavigationLinks()
  nav.append(...mainContentsLinks.values());
  return nav;
}

function createQuickServicesSection() {
  const btn = document.createElement("button");
  btn.href = "#";
  //btn.addEventListener("click", () => SessionManager.selectRole("doctor"));
  btn.textContent = "Book an appointment";
  btn.className = "alternative-btn";
  return btn;
}

function createLoginSection() {
  const btn = document.createElement("button");
  btn.href = "#";
  btn.textContent = "Login";
  btn.className = "default-btn";
  btn.id = "loginBtn";

  btn.addEventListener("click", document.initLoginHandler);

  return btn;
}

function createAvatarSection() {
  const section = document.createElement("section");
  const portrait = document.createElement("div");
  const avatarPhoto = document.createElement("img");
  const moreMenuContainer = document.createElement("div");
  const moreMenuIcon = document.createElement("img");

  section.className = "avatar-section";
  section.addEventListener("click", () => {
    toggleVisibilityOfMenuDropdown();
  });
  portrait.className = "avatar-portrait";
  avatarPhoto.className = "avatar-profile-img";
  avatarPhoto.src = "/assets/images/user-profiles/avatar-photos/admin_user-profile-photo_avatar-image.png";
  avatarPhoto.alt = "User profile photo";

  moreMenuContainer.className = "more-menu-container";
  moreMenuIcon.className = "more-menu-icon";
  moreMenuIcon.src = "/assets/images/common/menus/icons/menu-more-actions-vert_icon.svg";
  moreMenuIcon.alt = "More menu options icon";

  portrait.appendChild(avatarPhoto);
  moreMenuContainer.appendChild(moreMenuIcon);
  section.appendChild(portrait);
  section.appendChild(moreMenuContainer);
  section.appendChild(createAvatarMenu(avatarMenuOptions));
  /*
  switch (role) {
    case "doctor":
      const doctorHomeLink = document.createElement("a");
      doctorHomeLink.href = "#";
      doctorHomeLink.addEventListener("click", () => SessionManager.selectRole("doctor"));
      doctorHomeLink.textContent = "Home";

      nav.appendChild(doctorHomeLink);
      break;
    case "loggedPatient":
      const patientHomeLink = document.createElement("a");
      patientHomeLink.href = "#";
      patientHomeLink.addEventListener("click", () =>
        window.location.href="../../../pages/loggedPatientDashboard.html");
      patientHomeLink.textContent = "Home";

      const patientAppointmentsHomeLink = document.createElement("a");
      patientAppointmentsHomeLink.href = "#";
      patientAppointmentsHomeLink.addEventListener("click", () =>
        window.location.href="../../../pages/patientAppointments.html");
      patientAppointmentsHomeLink.textContent = "Appointments";
      patientAppointmentsHomeLink.id = "patientAppointments";

      nav.append(patientHomeLink, patientAppointmentsHomeLink);
      break;
    default:
      console.log('Wrong role type');
      SessionManager.resetUserSession();
      break;
  }

  const logoutLink = document.createElement("a");
  logoutLink.href = "#";
  logoutLink.addEventListener("click", () => SessionManager.logout());
  logoutLink.textContent = "Logout";

  nav.appendChild(logoutLink);
  return nav;
    */
  return section;
}

function createAvatarMenu(options) {
  const menuDropdown = document.createElement("div");
  const menuSeparator = document.createElement("hr");

  menuSeparator.className = "menu-dropdown-separator";
  menuDropdown.className = "menu-dropdown";
  menuDropdown.id = "avatarMenuDropdown";

  options.forEach(option => {
    const optionContainer = document.createElement("span");
    const link = document.createElement("a");
    const icon = document.createElement("img");

    optionContainer.className = "menu-option-container";
    link.href = "#";
    link.textContent = option.name;
    link.className = "menu-option";
    icon.className = "menu-option-icon";
    icon.src = option.iconSrc;

    if (option.name === "Dashboard") {
      //link.addEventListener("click", () => {
      optionContainer.addEventListener("click", () => {
        window.location.href = `/adminDashboard/${SessionManager.getToken()}`;
      });
    }

    if (option.name === "Logout") {
      menuDropdown.appendChild(menuSeparator);
      //link.addEventListener("click", document.logout);
      optionContainer.addEventListener("click", document.logout);
    }

    optionContainer.append(icon, link);
    menuDropdown.appendChild(optionContainer);
  })

  return menuDropdown;
}

function toggleVisibilityOfMenuDropdown() {
  if (document.getElementById("avatarMenuDropdown").style.getPropertyValue("visibility") === "visible") {
    document.getElementById("avatarMenuDropdown").style.setProperty("visibility", "hidden");
  } else {
    document.getElementById("avatarMenuDropdown").style.setProperty("visibility", "visible");
  }
}

function setupMainNavigationLinks() {
  const about = document.createElement("a");
  about.href = "#";
  about.textContent = "About us";
  about.id = mainContentsLinkNames[0];
  about.classList.add("services-nav-item", "selected");

  const community = document.createElement("a");
  community.href = "#";
  community.textContent = "Community";
  community.id = mainContentsLinkNames[1];
  community.className = "services-nav-item";

  const services = document.createElement("a");
  services.href = "#";
  services.textContent = "Services";
  services.id = mainContentsLinkNames[2];
  services.className = "services-nav-item";

  const pricing = document.createElement("a");
  pricing.href = "#";
  pricing.textContent = "Pricing";
  pricing.id = mainContentsLinkNames[3];
  pricing.className = "services-nav-item";

  //mainContentsLinks.push(about, community, services, pricing);
  mainContentsLinks.set(mainContentsNames[0], about);
  mainContentsLinks.set(mainContentsNames[1], community);
  mainContentsLinks.set(mainContentsNames[2], services);
  mainContentsLinks.set(mainContentsNames[3], pricing);
}

function addEventEventListenerToLoginSection() {
  document?.getElementById("headerLogoSection")?.addEventListener(
    "click",
    document.logoSectionOnClickHandling
  );
}