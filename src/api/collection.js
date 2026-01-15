import axios from "axios";
import { API_URL } from "./index";

const API = axios.create({
  baseURL: `${API_URL}/api/collections`,
});

export const createCollection = (data) =>
  API.post("/create", data);

// GET ALL COLLECTIONS (pagination)
export const getAllCollections = (page = 1, limit = 10) =>
  API.get(`/list?page=${page}&limit=${limit}`);


export const deleteCollection = (id) =>
  API.delete(`/delete/${id}`);

export const updateCollection = (id, data) =>
  API.put(`/update/${id}`, data);


