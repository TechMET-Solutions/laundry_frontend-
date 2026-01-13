import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/employees",
});

// CREATE
export const createEmployee = (data) => API.post("/create", data);

// GET ALL
export const getAllEmployees = () => API.get("/list");

// GET BY ID
export const getEmployeeById = (id) => API.get(`/list/${id}`);

// UPDATE
export const updateEmployee = (id, data) => API.put(`/update/${id}`, data);

// DELETE
export const deleteEmployee = (id) => API.delete(`/delete/${id}`);
