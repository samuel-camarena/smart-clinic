import * as Header from "../../common-contents/components/page-structures/headers/header.js";
import * as Footer from "../../common-contents/components/page-structures/footers/footer.js";
import * as DashboardUtils from "../../common-contents/pages/dashboards/commonDashboardUtils.js";
import * as AboutPage from "./about/aboutPage.js";
import * as CommunityPage from "./community/communityPage.js";
//import * as Auth from "../../auth-contents/auth.js";
//import * as SessionManager from "../../infrastructure/adapters/storage/sessionManager.js";

export function init(pageType) {
  Header.init(pageType);
  setup(pageType);
  Footer.init();
  initEventListeners();
}

export function setup(pageType) {
  DashboardUtils.clearMainContent();
  //Header.clearContents();
  //Footer.clearContents();
  //DashboardUtils.clearMainContentStyling();

  const mainDiv = document.getElementById("main");
  switch (pageType) {
    case "about":
      mainDiv.append(...AboutPage.init());
      break;
    case "community":
      mainDiv.append(CommunityPage.init());
      break;
    case "services":
      mainDiv.append(ServicesPage.createContent());
      break;
    case "pricing":
      mainDiv.append(PrincingPage.createContent());
      break;
    default:
      mainDiv.append("<h1>❗ Content Not Found<h1>");
      break;
  }
}

function initEventListeners() {
  //addEventListenersToWindow();
  addEventListenersToHeader();
  // main
  // aside
  // footer
}

function addEventListenersToHeader() {
  addEventListenersToMainContentsOnHeader();
}

function addEventListenersToMainContentsOnHeader() {
  const aboutLink = document.getElementById("aboutHeaderLink");
  const communityLink = document.getElementById("communityHeaderLink");
  const servicesLink = document.getElementById("servicesHeaderLink");
  const pricingLink = document.getElementById("pricingHeaderLink");

  if (aboutLink) {
    aboutLink.addEventListener("click", () => {
      Header.styleSelectedMainContentLink("about");
      setup("about");
    });
  }
  if (communityLink) {
    communityLink.addEventListener("click", () => {
      Header.styleSelectedMainContentLink("community");
      setup("community");
    });
  }
  if (servicesLink) {
    servicesLink.addEventListener("click", () => {
      Header.styleSelectedMainContentLink("services");
      setup("services");
    });
  }
  if (pricingLink) {
    pricingLink.addEventListener("click", () => {
      Header.styleSelectedMainContentLink("pricing");
      setup("pricing");
    });
  }
}



