
//function MetricsOfMeritsSection() {
const articlesProps = [
  {
    title: "Healthcare advantages",
    description: "Enjoy personalized treatment plans tailored to your unique wellness needs. Experience peace of mind with our dedicated patient support team.",
    imgSrc: "/assets/images/index/about/sections/healthcare-advantages_characteristics-overview_about-page.png",
  }, {
    title: "Experienced Doctors",
    description: "Connect with board-certified specialists who truly listen to you. Trust in decades of combined expertise across multiple fields. Feel confident receiving care from recognized leaders in medicine.",
    imgSrc: "/assets/images/index/about/sections/experienced-doctors_characteristics-overview_about-page.png",
  }, {
    title: "Modern facilities",
    description: "Relax in welcoming spaces built for your ultimate comfort. Benefit from cutting-edge technology that ensures highly accurate diagnoses. Experience seamless visits with our advanced digital check-in systems.",
    imgSrc: "/assets/images/index/about/sections/modern-facilities_characteristics-overview_about-page.png",
  },
];

export function create() {
  const section = document.createElement("section");
  section.className = "clinic-overview-section";

  articlesProps.forEach(props =>
    section.appendChild(createArticle(props))
  )
  return section;
}

function createArticle({ title, description, imgSrc }) {
  const article = document.createElement("article");
  const artTextContainer = document.createElement("div");
  const artHeader = document.createElement("header");
  const artTitle = document.createElement("h4");
  const artDesc = document.createElement("p");
  const artImg = document.createElement("img");

  article.className = "clinic-overview-article";
  artTextContainer.className = "article-text-container";
  artHeader.className = "article-header";
  artTitle.className = "article-title";
  artTitle.textContent = title;
  artDesc.className = "article-description";
  artDesc.textContent = description;
  artImg.className = "article-img";
  artImg.src = imgSrc;

  article.appendChild(artTextContainer);
  artHeader.appendChild(artTitle);
  artTextContainer.appendChild(artHeader);
  artTextContainer.appendChild(artDesc);
  article.appendChild(artImg);
  return article;
}