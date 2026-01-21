import axios from "axios";
const API = axios.create({
    baseURL: "http://localhost:5000/api/service_list",
});

export const createNewServiceList = (data) => API.post("/create", data);

export const getAllServicesList = () => API.get("/list");

export const getServiceByIdList = (id) => API.get(`/list/${id}`);

export const updateServiceList = (id, data) => API.put(`/update/${id}`, data);  

export const deleteServiceList = (id) => API.delete(`/delete/${id}`);
  