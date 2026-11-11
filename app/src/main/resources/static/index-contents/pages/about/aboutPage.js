import * as LandingBannerSection from "./sections/landingBannerSection.js";
import * as MetricsOfMeritsSection from "./sections/metricsOfMeritsSection.js";
import * as ClinicOverviewSection from "./sections/clinicOverviewSection.js";
import * as SeparationSection from "../../../common-contents/components/sections/separationSection.js";

export function init() {
  return [
    LandingBannerSection.create(),
    MetricsOfMeritsSection.create(),
    SeparationSection.create(),
    ClinicOverviewSection.create(),
  ];
}

/*
function createSearchProfessionalsSection() {
  const searchProSection = document.createElement("section");

  const searchProContentDiv = document.createElement("div");
  const titleH1 = document.createElement("h1");
  const searchBarDiv = document.createElement("div");
  const searchBarInput = document.createElement("input");
  const searchLoupeImg = document.createElement("img");

  searchProSection.backgroundImage =
  //const sectionBackgroundImg = document.createElement("img");

  searchProSection.className = "search-pro-section";

  searchProContentDiv.className = "search-content";
  titleH1.className = "title";
  titleH1.appendChild(document.createTextNode("The best"));
  titleH1.appendChild(document.createElement("br"));
  titleH1.appendChild(document.createTextNode("professionals"));
  //titleH1.appendChild(document.)professionals";
  searchBarDiv.className = "search-bar-container";
  searchBarInput.type = "text";
  searchBarInput.className = "search-bar";
  searchBarInput.placeholder = "Choose yours";
  searchBarInput.id = "indexSearchBar";
  searchLoupeImg.className = "loupe-img";
  searchLoupeImg.src = "assets/images/common/search.svg";
  searchLoupeImg.alt = "Loupe of search bar";

  //sectionBackgroundImg.src = "assets/images/index/Rectangle%2067.png";
  //sectionBackgroundImg.alt = "Search background image";


  searchProSection.appendChild(searchProContentDiv);

  //sectionSearchDiv.appendChild(sectionBackgroundImg);
  searchProContentDiv.appendChild(titleH1);
  searchProContentDiv.appendChild(searchBarDiv);
  searchBarDiv.appendChild(searchBarInput);
  searchBarDiv.appendChild(searchLoupeImg);

  return searchProSection;
}
*/