import axios from 'axios';

const axiosRequests = {
  getAnimal: (animal_name) => axios.get(`http://localhost:8081/api/get-animal/${animal_name}`),
  getForecast: (city) => axios.get(`http://localhost:8081/api/get-forecast/${city}`),
};

export default axiosRequests;