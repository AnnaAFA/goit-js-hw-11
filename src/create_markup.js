export default function createMarkup(arr, galleryRef) {
  const img = arr
    .map(img => {
      return `<div class="photo-card"><a href=${img.largeImageURL}>
  <img src=${img.webformatURL} alt=${img.tags} loading="lazy" width="300" height="200"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${img.likes}
    </p>
    <p class="info-item">
      <b>Views</b>${img.views}
    </p>
    <p class="info-item">
      <b>Comments</b>${img.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${img.downloads}
    </p>
  </div>
</div>`;
    })
    .join('');
  galleryRef.insertAdjacentHTML('beforeend', img);
}
