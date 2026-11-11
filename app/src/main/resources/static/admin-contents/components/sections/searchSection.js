
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