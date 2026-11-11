/*
export const mainContentsNames = [
  'about',
  'community',
  'services',
  'pricing'
];
const linkIdPostfix = "HeaderLink";
export const mainContentsLinkNames = [
  mainContentsNames[0] + linkIdPostfix,
  mainContentsNames[1] + linkIdPostfix,
  mainContentsNames[2] + linkIdPostfix,
  mainContentsNames[3] + linkIdPostfix,
]
export const mainContentsLinks = new Map();
*/
const footerEl = document.getElementById("footer");

export function init() {
  setup();
}

export function clearContents() {
  document?.getElementById("footer")?.replaceChildren();
}

function setup() {
  setupLayout();
  footerEl.appendChild(createSocialMediaAndLogoAndCopyrightSection())
  footerEl.appendChild(createOurReviewsSection());
  footerEl.appendChild(createFaqSection());
  footerEl.appendChild(createLegalDocsSection());
  //addEventListenerToHomeRedirection();
}

function setupLayout() {
  footerEl.id = "footer";
  footerEl.className = "footer";
}

function createSocialMediaAndLogoAndCopyrightSection() {
  const nav = document.createElement("nav");

  nav.className = "column-section";

  nav.append(createSocialMediaSection());
  nav.appendChild(createLogoSection());
  nav.appendChild(createCopyright());
  return nav;
}

function createOurReviewsSection() {
  const reviewsNav = document.createElement("nav");
  const sectionTitle = document.createElement("h4");

  sectionTitle.className = "title";
  sectionTitle.textContent = "Our Reviews";
  reviewsNav.className = "column-section";

  reviewsNav.appendChild(sectionTitle);
  reviewsNav.append(...createOurReviewsLinks());
  return reviewsNav;
}

function createFaqSection() {
  const faqNav = document.createElement("nav");
  const sectionTitle = document.createElement("h4");

  sectionTitle.className = "title";
  sectionTitle.textContent = "FAQ";
  faqNav.className = "column-section";

  faqNav.append(sectionTitle);
  faqNav.append(...createFaqLinks());
  return faqNav;
}

function createLegalDocsSection() {
  const legalsNav = document.createElement("nav");
  const sectionTitle = document.createElement("h4");

  sectionTitle.className = "title";
  sectionTitle.textContent = "Legal Documentation";
  legalsNav.className = "column-section";

  legalsNav.append(sectionTitle);
  legalsNav.append(...createLegalDocsLinks());
  return legalsNav;
}

function createSocialMediaSection() {
  const nav = document.createElement("nav");
  const xLink = document.createElement("a");
  const xIconLink = document.createElement("img");
  const instaLink = document.createElement("a");
  const instaIconLink = document.createElement("img");
  const yTubeLink = document.createElement("a");
  const yTubeIconLink = document.createElement("img");
  const linkedInLink = document.createElement("a");
  const linkedInIconLink = document.createElement("img");

  xLink.href = "#"; // https://youtube.com
  xLink.target = "_blank";
  xLink.className = "section-links";
  xLink.id = "xFooterLink";
  xIconLink.src = "../../../assets/images/socialMedia/x-logo.svg";
  xLink.appendChild(xIconLink);

  instaLink.href = "#";
  instaLink.target = "_blank";
  instaLink.className = "section-links";
  instaLink.id = "instaFooterLink";
  instaIconLink.src = "../../../assets/images/socialMedia/instagram-logo.svg";
  instaLink.appendChild(instaIconLink);

  yTubeLink.href = "#";
  yTubeLink.target = "_blank";
  yTubeLink.className = "section-links";
  yTubeLink.id = "youtubeFooterLink";
  yTubeIconLink.src = "../../../assets/images/socialMedia/youtube-logo.svg";
  yTubeLink.appendChild(yTubeIconLink);

  linkedInLink.href = "#";
  linkedInLink.target = "_blank";
  linkedInLink.className = "section-links";
  linkedInLink.id = "linkedInFooterLink";
  linkedInIconLink.src = "../../../assets/images/socialMedia/linkedin-logo.svg";
  linkedInLink.appendChild(linkedInIconLink);

  nav.className = "social-media-links-nav";
  nav.append(
    xLink,
    instaLink,
    yTubeLink,
    linkedInLink,
  )
  return nav;
}

/**
 * Refactorizar con LogoSection de Header
 */

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

function createCopyright() {
  const info = document.createElement("small");
  info.textContent = "©2026 Smart Clinic. All Rights Reserved.";
  return info;
}

function createOurReviewsLinks() {
  const ourPatientsLink = document.createElement("a");
  const ourDoctorsLink = document.createElement("a");
  const communityLink = document.createElement("a");

  ourPatientsLink.href = "#";
  ourPatientsLink.target = "_blank";
  ourPatientsLink.className = "section-links";
  ourPatientsLink.id = "ourPatientsLink";
  ourPatientsLink.textContent = "Our patients"; // TODO: ¿Our "Patients" en vez de "patients"?

  ourDoctorsLink.href = "#";
  ourDoctorsLink.target = "_blank";
  ourDoctorsLink.className = "section-links";
  ourDoctorsLink.id = "ourDoctorsLink";
  ourDoctorsLink.textContent = "Our doctors";

  communityLink.href = "#";
  communityLink.target = "_blank";
  communityLink.className = "section-links";
  communityLink.id = "ourDoctorsLink";
  communityLink.textContent = "The community";

  return [
    ourPatientsLink,
    ourDoctorsLink,
    communityLink
  ];
}

function createFaqLinks() {
  const howChooseDoctorLink = document.createElement("a");
  const findPricePlanLink = document.createElement("a");
  const moreLink = document.createElement("a");

  howChooseDoctorLink.href = "#";
  howChooseDoctorLink.target = "_blank";
  howChooseDoctorLink.className = "section-links";
  howChooseDoctorLink.id = "howChooseDoctorLink";
  howChooseDoctorLink.textContent = "How to choose a Doctor";

  findPricePlanLink.href = "#";
  findPricePlanLink.target = "_blank";
  findPricePlanLink.className = "section-links";
  findPricePlanLink.id = "findPricePlanLink";
  findPricePlanLink.textContent = "Where to find a Pricing plan";

  moreLink.href = "#";
  moreLink.target = "_blank";
  moreLink.className = "section-links";
  moreLink.id = "moreLink";
  moreLink.textContent = "More...";

  return [
    howChooseDoctorLink,
    findPricePlanLink,
    moreLink,
  ];
}

function createLegalDocsLinks() {
  const termsAndConditionsLink = document.createElement("a");
  const privacyPolicyLink = document.createElement("a");
  const isoStandardsLink = document.createElement("a");

  termsAndConditionsLink.href = "#";
  termsAndConditionsLink.target = "_blank";
  termsAndConditionsLink.className = "section-links";
  termsAndConditionsLink.id = "termsAndConditionsLink";
  termsAndConditionsLink.textContent = "Terms and Conditions";

  privacyPolicyLink.href = "#";
  privacyPolicyLink.target = "_blank";
  privacyPolicyLink.className = "section-links";
  privacyPolicyLink.id = "privacyPolicyLink";
  privacyPolicyLink.textContent = "Privacy Policy";

  isoStandardsLink.href = "#";
  isoStandardsLink.target = "_blank";
  isoStandardsLink.className = "section-links";
  isoStandardsLink.id = "isoStandardsLink";
  isoStandardsLink.textContent = "ISO Standards (preview)";

  return [
    termsAndConditionsLink,
    privacyPolicyLink,
    isoStandardsLink,
  ];
}