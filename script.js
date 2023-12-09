const API_KEY = "b357fdc9fb644a4187abcaa8027cab1f";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));
function reload() {
  window.location.reload();
}
const pageSize = 30;

async function fetchNews(query, page) {
  heading.innerHTML = capitalizeFirstLetter(query);
  const sortBy = "publishedAt";
  const res = await fetch(
    `${url}${query}&apiKey=${API_KEY}&sortBy=${sortBy}&pageSize=${pageSize}&page=${page}`
  );
  const data = await res.json();
  totalResults = data.totalResults;
  bindData(data);
  console.log(data);
}

function bindData(data) {
  const articles = data.articles;

  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;

    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-image");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");
  newsImg.src = article.urlToImage;

  newsImg.style.height = "300px";

  newsTitle.innerHTML = article.title;

  const truncatedDesc = article.description.split(" ").slice(0, 50).join(" ");
  newsDesc.innerHTML = `${truncatedDesc}...`;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });

  newsSource.innerHTML = `${article.source.name} .  ${date}`;
  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

const curSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});
