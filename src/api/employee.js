import axios from "axios";
import { API_URL } from "./index";

const API = axios.create({
    baseURL: `${API_URL}/api/employees`,
});

// Add token to every request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// CREATE
export const createEmployee = (data) => API.post("/create", data);

// GET ALL (with pagination)
export const getAllEmployees = (page = 1, limit = 10) =>
    API.get(`/list?page=${page}&limit=${limit}`);


// GET BY ID
export const getEmployeeById = (id) => API.get(`/list/${id}`);

export const getEmployeeSearch = () => API.get(`/list`);

// UPDATE
export const updateEmployee = (id, data) => API.put(`/update/${id}`, data);

// DELETE
export const deleteEmployee = (id) => API.delete(`/delete/${id}`);
