import axios from 'axios';

const baseURL = "https://softruck-73388-default-rtdb.firebaseio.com/vehicles.json"

const api = axios.create({
	baseURL,
})

export default api;