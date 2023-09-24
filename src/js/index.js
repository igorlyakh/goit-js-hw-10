import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

import refs from './refs';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

Loading.dots();

const createMarkup = data => {
  const markup = data
    .map(item => {
      return `<option value="${item.id}" >${item.name}</option>`;
    })
    .join('');
  refs.select.insertAdjacentHTML('beforeend', markup);
};

const createCatCard = data => {
  const newData = [...data];
  const cat = newData.map(item => {
    return `<img src="${item.url}" width="650" loading="lazy" >
            <div>
                <h1>${item.breeds[0].name}</h1>
                <p>${item.breeds[0].description}</p>
                <p><span class="bold" >Temperament</span>: ${item.breeds[0].temperament}</p>
            </div>`;
  });
  refs.info.innerHTML = cat;
};

fetchBreeds()
  .then(res => {
    createMarkup(res.data);
  })
  .catch(() =>
    Notify.failure('Oops! Something went wrong! Try reloading the page!')
  )
  .finally(() => Loading.remove());

refs.select.addEventListener('change', e => {
  Loading.dots();
  fetchCatByBreed(e.target.value)
    .then(res => createCatCard(res.data))
    .catch(() =>
      Notify.failure('Oops! Something went wrong! Try reloading the page!')
    )
    .finally(() => Loading.remove());
});
