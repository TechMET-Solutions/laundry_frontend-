import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/orders",
});

export const createOrder = (data) => API.post("/create", data);

export const getAllOrders = (page = 1, limit = 10) =>
  API.get(`/list?page=${page}&limit=${limit}`);

export const getOrderById = (id) => API.get(`/list/${id}`);

export const getTodaysOrdesrs = ()=> API.get(`/list`);

export const softDeleteOrder = (id, data) => API.put(`/update/${id}`, data,);

export const revokeOrder = (id) => {return API.put(`/revoke/${id}`);};

export const hardDeleteOrder = (id) => API.delete(`/delete/${id}`);

export const updateDriver = (id, data) => API.put(`/updatedriver/${id}`, data);

export const updateOrder = (id, data) => API.put(`/updateorder/${id}`, data);