import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/customers",
});

// CREATE
export const createCustomers = (data) => API.post("/create", data);

// GET ALL (with pagination)
export const getAllCustomers = (page = 1, limit = 10, search = "") => 
    API.get(`/list?search=${search}&page=${page}&limit=${limit}`);

// GET BY ID
export const getCustomersById = (id) => API.get(`/list/${id}`);

// UPDATE
export const updateCustomers = (id, data) => API.put(`/update/${id}`, data);

// DELETE
export const deleteCustomers = (id) => API.delete(`/delete/${id}`);
