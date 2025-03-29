import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://api.themoviedb.org/3';

// Create an Axios instance with the base URL and API key
export const api = axios.create({
	baseURL: BASE_URL,
	params: {
		api_key: API_KEY,
	},
});