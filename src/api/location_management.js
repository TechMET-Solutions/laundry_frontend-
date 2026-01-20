import axios from "axios";
const API = axios.create({
    baseURL: "http://localhost:5000/api/location_management",
});


// Emirate APIs

export const createEmirate = (data) => API.post("/emirates/create", data);

export const getAllEmirates = (page = 1, limit = 10) =>
     API.get(`/emirates/list?page=${page}&limit=${limit}`);



export const getEmirateById = (id) => API.get(`/emirates/${id}`);

export const updateEmirate = (id, data) => API.put(`/emirates/${id}`, data);
export const deleteEmirate = (id) =>
  API.delete(`/emirates/${id}`);



