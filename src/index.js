import Notiflix from 'notiflix';
import axios from 'axios';

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const input = document.querySelector('[name="searchQuery"]');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
loadMoreBtn.style.display = 'none';

formRef.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', onLoad);

loadMoreBtn.disabled = true;

function onSubmit(e) {
  e.preventDefault();
  galleryRef.innerHTML = '';
  page = 1;
  loadMoreBtn.disabled = false;
  loadMoreBtn.style.display = 'none';

  if (!input.value) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  getImages(input.value).then(({ hits }) =>
    hits.map(element => {
      galleryRef.insertAdjacentHTML('beforeend', createGallery(element));
      loadMoreBtn.style.display = 'block';
    })
  );
}

function onLoad() {
  page += 1;
  getImages(input.value).then(({ hits, totalHits }) =>
    hits.map(element => {
      galleryRef.insertAdjacentHTML('beforeend', createGallery(element));
      if (galleryRef.children.length === totalHits) {
        loadMoreBtn.style.display = 'none';
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
  );
}

async function getImages(value) {
  const key = '33013595-4823d8185f154f9ff04c1de28';
  const perPage = 40;

  const response = await axios.get(
    `https://pixabay.com/api/?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`
  );

  return await response.data;
}

function createGallery(card) {
  return `
   <div class="photo-card">
  <img src="${card.webformatURL}" alt="${card.tags}" loading="lazy" width=300/>
  <div class="info">
    <p class="info-item">
      <b>likes: ${card.likes}</b>
    </p>
    <p class="info-item">
      <b>views: ${card.views}</b>
    </p>
    <p class="info-item">
      <b>comments: ${card.comments}</b>
    </p>
    <p class="info-item">
      <b>downloads: ${card.downloads}</b>
    </p>
  </div>
</div>`;
}
