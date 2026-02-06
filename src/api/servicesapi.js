import axios from "axios";
import { API_URL } from "./index";

const API = axios.create({
    baseURL: `${API_URL}/api/service`,
});
export const getAllServiceTypes = () => API.get("/service_types/list");
export const createServiceType = (data) => API.post("/service_types/create", data);
export const updateServiceType = (id, data) => API.put(`/service_types/update/${id}`, data);
export const deleteServiceType = (id) => API.delete(`/service_types/delete/${id}`);

export const getAllServicesCategory = () => API.get("/service_categories/list");
export const createServiceCategory = (data) => API.post("/service_categories/create", data);
export const updateServiceCategory = (id, data) => API.put(`/service_categories/update/${id}`, data);
export const deleteServiceCategory = (id) => API.delete(`/service_categories/delete/${id}`);

export const getAllServicesAddon = () => API.get("/service_addon/list");
export const createNewServiceAddon = (data) => API.post("/service_addon/create", data);
export const updateServiceAddon = (id, data) => API.put(`/service_addon/update/${id}`, data);  
export const deleteServiceAddon = (id) => API.delete(`/service_addon/delete/${id}`);



 

 
 
   