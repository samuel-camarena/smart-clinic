
export function createEl(resourceProps, resourceType) {
  const bodyEl = document.createElement("div");

  const headerEl = document.createElement("header");
  const headerTitleEl = document.createElement("h2");

  const highlightedInfoSectionEl = document.createElement("section");
  const sectionTitleEl = document.createElement("h3");
  const inlineInfoContainerEl = document.createElement("span");

  const normalInfoSectionEl = document.createElement("section");
  const normalSectionTitleEl = document.createElement("h4");

  bodyEl.className = "body";

  headerEl.className = "body-header";
  headerTitleEl.className = "title";
  headerTitleEl.textContent = "Appointments";
  headerEl.appendChild(headerTitleEl);
  bodyEl.appendChild(headerEl);

  highlightedInfoSectionEl.className = "highlighted-info-section";
  sectionTitleEl.className = "title";
  sectionTitleEl.textContent = "Next";

  inlineInfoContainerEl.className = "inline-info-container";
  const infoIcon = document.createElement("img");
  const infoText11El = document.createElement("p");
  const infoText12El = document.createElement("p");

  infoIcon.className = "icon";
  infoIcon.src = "/assets/images/common/cards/calendar_month_icon.svg";
  infoText11El.textContent = "2028 March 23";
  infoText12El.textContent = "Kaiya Kenter";
  infoText11El.className = "text";
  infoText12El.className = "text";

  inlineInfoContainerEl.append(
    infoIcon,
    infoText11El,
    infoText12El
  );

  highlightedInfoSectionEl.append(
    sectionTitleEl,
    inlineInfoContainerEl
  );

  bodyEl.appendChild(highlightedInfoSectionEl);

  normalInfoSectionEl.className = "normal-info-section";
  normalSectionTitleEl.className = "title";
  normalSectionTitleEl.textContent = "Past";

  normalInfoSectionEl.append(
    normalSectionTitleEl,
    ...createInlineContainerWithIconAndTwoTexts()
  );

  bodyEl.append(normalInfoSectionEl);

  return bodyEl;
}

function createInlineContainerWithIconAndTwoTexts(resourceProps) {
  const inlineInfoContainerEl2 = document.createElement("span");
  const infoIcon2 = document.createElement("img");
  const infoText21El = document.createElement("p");
  const infoText22El = document.createElement("p");

  inlineInfoContainerEl2.className = "inline-info-container";
  infoIcon2.className = "icon";
  infoIcon2.src = "/assets/images/common/cards/calendar_month_normal_icon.svg";
  infoText21El.textContent = "2027 January 11";
  infoText21El.className = "text";
  infoText22El.textContent = "Tiana Workman";
  infoText22El.className = "text";

  inlineInfoContainerEl2.append(
    infoIcon2,
    infoText21El,
    infoText22El
  );
  /*
  const inlineContainersProps = [
    ContainersFactory.mapResourceToProps(
      ContainersProps.inlineContainerProps,
      "/assets/images/common/cards/calendar_month_normal_icon.svg",
      "Calendar icon",
      resourceProps.specialty
    ),
    ContainersFactory.mapResourceToProps(
      ContainersProps.inlineContainerProps,
      "/assets/images/common/cards/mail.svg",
      "Main icon",
      resourceProps.email
    ),
    ContainersFactory.mapResourceToProps(
      ContainersProps.inlineContainerProps,
      "/assets/images/common/cards/phone_enabled.svg",
      "Phone icon",
      resourceProps.phone
    )
  ];

  const inline1 =  ContainerFactory.createWithIconAndManyTextsEl(inlineContainersProps[0]);
  */
  const inlineInfoContainerEl3 = document.createElement("span");
  const inlineInfoContainerEl4 = document.createElement("span");
  inlineInfoContainerEl3.className = "inline-info-container";
  const infoIcon3 = document.createElement("img");
  const infoText31El = document.createElement("p");
  const infoText32El = document.createElement("p");

  infoIcon3.className = "icon";
  infoIcon3.src = "/assets/images/common/cards/calendar_month_normal_icon.svg";
  infoText31El.textContent = "2026 December 22";
  infoText31El.className = "text";
  infoText32El.textContent = "Jaydon Vaccaro";
  infoText32El.className = "text";

  inlineInfoContainerEl3.append(
    infoIcon3,
    infoText31El,
    infoText32El
  );

  inlineInfoContainerEl4.className = "inline-info-container";
  const infoIcon4 = document.createElement("img");
  const infoText41El = document.createElement("p");
  const infoText42El = document.createElement("p");

  infoIcon4.className = "icon";
  infoIcon4.src = "/assets/images/common/cards/calendar_month_normal_icon.svg";
  infoText41El.textContent = "2020 June 02";
  infoText41El.className = "text";
  infoText42El.textContent = "Tiana Workman";
  infoText42El.className = "text";

  inlineInfoContainerEl4.append(
    infoIcon4,
    infoText41El,
    infoText42El
  );

  return [
    inlineInfoContainerEl2,
    inlineInfoContainerEl3,
    inlineInfoContainerEl4
  ];
}