import axios from "axios";
const API = axios.create({
    baseURL: "http://localhost:5000/api/areas",
});



export const createArea = (data) => API.post("/create", data);

export const getAllAreas = (page = 1, limit = 10) => 
    API.get(`/list?page=${page}&limit=${limit}`);

export const getAreaById = (id) => API.get(`/list/${id}`);

export const updateArea = (id, data) => API.put(`/update/${id}`, data);

export const deleteArea = (id) => API.delete(`/delete/${id}`);