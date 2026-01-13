import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/employees",
});

// CREATE
export const createEmployee = (data) => API.post("/create", data);

// GET ALL (with pagination)
export const getAllEmployees = (page = 1, limit = 10) =>
    API.get(`/list?page=${page}&limit=${limit}`);

// GET BY ID
export const getEmployeeById = (id) => API.get(`/list/${id}`);

// UPDATE
export const updateEmployee = (id, data) => API.put(`/update/${id}`, data);

// DELETE
export const deleteEmployee = (id) => API.delete(`/delete/${id}`);
