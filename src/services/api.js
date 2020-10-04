import axios from 'axios';

const api = axios.create({
  baseURL: 'https://warrior-gamer.herokuapp.com',
})

export default api;