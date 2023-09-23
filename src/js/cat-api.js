import axios from 'axios';

function fetchBreeds() {
  axios.defaults.headers.common['x-api-key'] =
    'live_Nz0JWipIUqpPRbmlBlYUaTvm0WHmZaOERv1LnKbgSzVgq1cA366UOQSkgXVwJ8jW';

  return axios('https://api.thecatapi.com/v1/breeds');
}

function fetchCatByBreed(catId) {
  return axios(`https://api.thecatapi.com/v1/images/search?breed_ids=${catId}`);
}

export { fetchBreeds, fetchCatByBreed };
