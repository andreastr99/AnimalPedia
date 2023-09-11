import axios from 'axios';
import axiosInterceptors from './axios.interceptors'

const axiosRequests = {
  getAPIAnimal: (animal_name) => axios.get(`http://localhost:8081/api/get-animal/${animal_name}`),
  getForecast: (city) => axios.get(`http://localhost:8081/api/get-forecast/${city}`),
  getImage: (image) => axios.get(`http://localhost:8081/api/get-image/${image}`),
  getFact: () => axios.get('http://localhost:8081/api/get-fact'),

  getAllAnimals: () => axios.get('http://localhost:8081/api/animal/'),
  getAnimalById: (animalId) => axios.get(`http://localhost:8081/api/animal/${animalId}`),
  setLike: (animalId, like) => axios.put(`http://localhost:8081/api/animal/${animalId}`, { favourite: like }),
  // getFavourites: () => axios.get('http://localhost:8081/api/animal/get-favourites'),
  getFavourites: () => axiosInterceptors.get('/api/animal/get-favourites'),


  login: (credentials) => axios.post('http://localhost:8081/auth/login', credentials, { withCredentials: true }),
  logout: () => axios.post('http://localhost:8081/auth/logout', null, { withCredentials: true }),
  checkRefreshToken: () => axios.get('http://localhost:8081/auth/verifyToken', { withCredentials: true }),
};

export default axiosRequests;