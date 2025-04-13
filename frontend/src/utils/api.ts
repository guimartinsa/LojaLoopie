import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/', // substitua pela URL da sua API se for diferente
});

export default api;

