const API_KEY = 'vlxnrZYqcAeLV9LPQaaCMcBkNHlnyceCHPqEkqSdKaU';
const search = document.querySelector('#userInput');
const search_button = document.querySelector('#search');
const form_search_img = document.querySelector('#search_img');
const formEl = document.querySelector('form');
const searchResult = document.querySelector('.search_result');
const showMore = document.querySelector('#show_more');

let inputData = '';
let page = 1;

async function search_images() {
  inputData = search.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    searchResult.innerHTML = '';
  }

  results.map((result) => {
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('search_result_div');
    const image = document.createElement('img');
    image.src = result.urls.small; // Fix property name
    image.alt = result.alt_description;
    const imageLink = document.createElement('a');
    imageLink.href = result.links.html; // Fix property name
    imageLink.target = '_blank';
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResult.appendChild(imageWrapper); // Fix appending to searchResult
  });
  page++;

  if (page > 1) {
    showMore.style.display = 'block';
  }
}

formEl.addEventListener('submit', function (e) {
  e.preventDefault();
  page = 1;
  search_images();
});

showMore.addEventListener('click', function () {
  search_images();
});
