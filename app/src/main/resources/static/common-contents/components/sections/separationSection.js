
const sectionProps = {};

export function create() {
  return createSection(sectionProps);
}

function createSection(props) {
  const section = document.createElement("section");
  const separator = document.createElement("hr");

  section.className = "separation-section";
  separator.className = "section-separator";
  //separator.src = "/assets/images/common/section-separator.svg";

  section.appendChild(separator);
  return section;
}
