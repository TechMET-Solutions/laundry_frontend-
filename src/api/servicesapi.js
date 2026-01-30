import axios from "axios";
const API = axios.create({
    baseURL: "http://localhost:5000/api/service",
});
export const getAllServiceTypes = () => API.get("/service_types/list");
export const createServiceType = (data) => API.post("/service_types/create", data);
export const updateServiceType = (id, data) => API.put(`/service_types/update/${id}`, data);
export const deleteServiceType = (id) => API.delete(`/service_types/delete/${id}`);

const API2 = axios.create({
    baseURL: "http://localhost:5000/api/service",
});

export const getAllServicesCategory = () => API2.get("/service_categories/list");
export const createServiceCategory = (data) => API2.post("/service_categories/create", data);
export const updateServiceCategory = (id, data) => API2.put(`/service_categories/update/${id}`, data);
export const deleteServiceCategory = (id) => API2.delete(`/service_categories/delete/${id}`);

const API3 = axios.create({
    baseURL: "http://localhost:5000/api/service",
});
export const getAllServicesAddon = () => API3.get("/service_addon/list");
export const createNewServiceAddon = (data) => API3.post("/service_addon/create", data);
export const updateServiceAddon = (id, data) => API3.put(`/service_addon/update/${id}`, data);  
export const deleteServiceAddon = (id) => API3.delete(`/service_addon/delete/${id}`);



 

 
 
   