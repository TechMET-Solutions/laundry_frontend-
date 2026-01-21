import axios from "axios";
const API = axios.create({
    baseURL: "http://localhost:5000/api/servicesapi/service_types",
});
export const getAllServiceType = () => API.get("/list");
export const createServiceType = (data) => API.post("/create", data);
export const updateServiceType = (id, data) => API.put(`/update/${id}`, data);
export const deleteServiceType = (id) => API.delete(`/delete/${id}`);

const API2 = axios.create({
    baseURL: "http://localhost:5000/api/servicesapi/service_categories",
});

export const getAllServicesCategory = () => API2.get("/list");
export const createServiceCategory = (data) => API2.post("/create", data);
export const updateServiceCategory = (id, data) => API2.put(`/update/${id}`, data);
export const deleteServiceCategory = (id) => API2.delete(`/delete/${id}`);

const API3 = axios.create({
    baseURL: "http://localhost:5000/api/servicesapi/service_addon",
});
export const getAllServicesAddon = () => API3.get("/list");
export const createNewServiceAddon = (data) => API3.post("/create", data);
export const updateServiceAddon = (id, data) => API3.put(`/update/${id}`, data);  
export const deleteServiceAddon = (id) => API3.delete(`/delete/${id}`);



 

 
 
   