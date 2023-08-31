import axios from 'axios';

const axiosRequests = {
  getAnimal: (animal_name) => axios.get(`http://localhost:8081/api/get-animal/${animal_name}`),
  getForecast: (city) => axios.get(`http://localhost:8081/api/get-forecast/${city}`),
  getImage: (image) => axios.get(`http://localhost:8081/api/get-image/${image}`),
  getFact: () => axios.get('http://localhost:8081/api/get-fact'),
  
  getAllAnimals: () => axios.get('http://localhost:8081/api/animal/'),
  getAnimalBy: (showBy) => axios.get(`http://localhost:8081/api/animal/${showBy}`),
};

export default axiosRequests;