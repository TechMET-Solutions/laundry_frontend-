import axios from 'axios';
import { API_URL } from './index';

const API = axios.create({
    baseURL: `${API_URL}/api/users`,
});

export const loginUser = (data) => API.post('/create', data);