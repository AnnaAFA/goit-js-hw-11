import './css/styles.css';
import Notiflix from 'notiflix';
import createMarkup from './create_markup';
import GalleryApiService from './gallery_service';

const galleryApiService = new GalleryApiService();

const formRef = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const galleryRef = document.querySelector('div.gallery');

formRef.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', onLoad);

loadMoreBtn.style.display = 'none';
loadMoreBtn.disabled = true;

async function onSubmit(e) {
  e.preventDefault();
  galleryRef.innerHTML = '';

  galleryApiService.page = 1;
  const inputValue = e.currentTarget.elements.searchQuery.value.trim();
  galleryApiService.searchQuery = inputValue;
  try {
    if (inputValue) {
      const articles = await galleryApiService.fetchArticles();
      createMassageOutput(articles);
      createMarkup(articles.data.hits, galleryRef);

      if (articles.data.totalHits > 40) {
        loadMoreBtn.style.display = 'block';
        loadMoreBtn.disabled = false;
      }
    }
  } catch (error) {}
}

async function onLoad() {
  try {
    const articles = await galleryApiService.fetchArticles();
    createMarkup(articles.data.hits, galleryRef);
    createMassageOutput(articles);
  } catch (error) {}
}

function createMassageOutput(articles) {
  const allArticles = document.querySelectorAll('.photo-card');
  if (articles.data.total === 0) {
    console.log(articles.data.total);
    loadMoreBtn.style.display = 'none';
    loadMoreBtn.disabled = true;
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );

    return;
  }

  if (articles.data.totalHits <= allArticles.length) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    loadMoreBtn.style.display = 'none';
  }
}
