import axios from "axios";
const API = axios.create({
    baseURL: "http://localhost:5000/api/location_management",
});


// Emirate APIs

export const createEmirate = (data) => API.post("/emirates/create", data);

export const getAllEmirates = (page = 1, limit = 10) =>
     API.get(`/emirates/list?page=${page}&limit=${limit}`);



export const getEmirateById = (id) => API.get(`/emirates/list/${id}`);

export const updateEmirate = (id, data) => API.put(`/emirates/${id}`, data);
export const deleteEmirate = (id) =>
  API.delete(`/emirates/${id}`);



// Area APIs

export const createArea = (data) => API.post("/areas/create", data);

export const getAllAreas = (page = 1, limit = 10) => 
    API.get(`/areas/list?page=${page}&limit=${limit}`);


export const getAreaById = (id) => API.get(`/areas/list/${id}`);

export const updateArea = (id, data) => API.put(`/areas/update/${id}`, data);

export const deleteArea = (id) => API.delete(`/areas/delete/${id}`);
