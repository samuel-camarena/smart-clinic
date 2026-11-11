// Cabecera de Clase LandingBannerSection() ...
const sectionProps = {
  container: {
    className: "search-container",
  },
  title: {
    textComplete: "The best professionals",
    textPartitions: [
      "The best",
      "professionals"
    ],
    className: "title"
  },
  searchBar: {
    container: {
      className: "search-bar-container",
    },
    input: {
      type: "text",
      className: "search-bar-input",
      placeholder: "Choose yours",
      id: "indexSearchBar",
    },
    loupeImg: {
      src: "assets/images/common/search.svg",
      alt: "Loupe of search bar",
      className: "loupe-img"
    }
  }
};

export function create() {
  return createSection(sectionProps);
}

export function createSection(props) {
  const section = document.createElement("section");
  const secContainer = document.createElement("div");
  const header = document.createElement("header");
  const titleH1 = document.createElement("h1");
  const searchBarContainer = document.createElement("div");
  const searchBarInput = document.createElement("input");
  const searchBarLoupeImg = document.createElement("img");

  //section.backgroundImage =
    //const sectionBackgroundImg = document.createElement("img");

  section.className = "search-pro-section";
  secContainer.className = props.container.className;

  titleH1.appendChild(document.createTextNode(props.title.textPartitions[0]));
  titleH1.appendChild(document.createElement("br"));
  titleH1.appendChild(document.createTextNode(props.title.textPartitions[1]));
  titleH1.className = props.title.className;
  //titleH1.appendChild(document.)professionals";
  /*
  searchBarContainer.className = "search-bar-container";
  searchBarInput.type = "text";
  searchBarInput.className = "search-bar-input";
  searchBarInput.placeholder = "Choose yours";
  searchBarInput.id = "indexSearchBar";
   */
  searchBarContainer.className = props.searchBar.container.className;
  searchBarInput.type = props.searchBar.input.type;
  searchBarInput.className = props.searchBar.input.className;
  searchBarInput.placeholder = props.searchBar.input.placeholder;
  searchBarInput.id = props.searchBar.input.id;
  searchBarLoupeImg.className = props.searchBar.loupeImg.className;
  //searchBarLoupeImg.src = "assets/images/common/search.svg";
  searchBarLoupeImg.src = props.searchBar.loupeImg.src;
  searchBarLoupeImg.alt = props.searchBar.loupeImg.alt;

  //sectionBackgroundImg.src = "assets/images/index/Rectangle%2067.png";
  //sectionBackgroundImg.alt = "Search background image";

  section.appendChild(secContainer);

  //sectionSearchDiv.appendChild(sectionBackgroundImg);
  header.appendChild(titleH1);
  secContainer.appendChild(header);

  secContainer.appendChild(searchBarContainer);
  searchBarContainer.appendChild(searchBarInput);
  searchBarContainer.appendChild(searchBarLoupeImg);

  return section;
}