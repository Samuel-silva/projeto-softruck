import axios from 'axios';

const baseURL = "http://localhost:3001/vehicles"

const api = axios.create({
	baseURL,
})

export default api;