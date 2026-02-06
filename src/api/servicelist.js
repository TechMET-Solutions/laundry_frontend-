import axios from "axios";
import { API_URL } from "./index";

const API = axios.create({
  baseURL: `${API_URL}/api/service_list`,
});

export const createNewServiceList = (data) => API.post("/create", data);

export const getAllServiceListSelect = () => API.get("/list");


export const getAllServicesList = (page = 1, limit = 10, search = "", category = "", status = "", sortField = "", sortDirection = "asc") => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (search) params.append("search", search);
  if (category) params.append("category", category);
  if (status) params.append("status", status);
  if (sortField) params.append("sortField", sortField);

  return API.get(`/list?${params.toString()}`);
};

export const getServiceByIdList = (id) => API.get(`/list/${id}`);

export const updateServiceList = (id, data) => API.put(`/update/${id}`, data);  

export const deleteServiceList = (id) => API.delete(`/delete/${id}`);
  