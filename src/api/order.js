import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/orders",
});

export const createOrder = (data) => API.post("/create", data);

export const getAllOrders = (page = 1, limit = 10) =>
  API.get(`/list?page=${page}&limit=${limit}`);

export const getOrderById = (id) => API.get(`/list/${id}`);

export const updateOrder = (id, data) => API.put(`/update/${id}`, data);

export const deleteOrder = (id) => API.delete(`/delete/${id}`);
