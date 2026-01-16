import axios from "axios";
const API = axios.create({
    baseURL: "http://localhost:5000/api/location_management",
});


// Emirate APIs

export const createEmirate = (data) => API.post("/emirates/create", data);

export const getAllEmirates = () => API.get("/emirates/list");

export const getEmirateById = (id) => API.get(`/emirates/list/${id}`);

export const updateEmirate = (id, data) => API.put(`/emirates/update/${id}`, data);

export const deleteEmirate = (id) => API.delete(`/emirates/delete/${id}`);


// Area APIs

export const createArea = (data) => API.post("/areas/create", data);

export const getAllAreas = () => API.get("/areas/list");

export const getAreaById = (id) => API.get(`/areas/list/${id}`);

export const updateArea = (id, data) => API.put(`/areas/update/${id}`, data);

export const deleteArea = (id) => API.delete(`/areas/delete/${id}`);

