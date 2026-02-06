import axios from "axios";
import { API_URL } from "./index";

const API = axios.create({
    baseURL: `${API_URL}/api/customers`,
});

// CREATE
export const createCustomers = (data) => API.post("/create", data);

// GET ALL (with pagination)
export const getAllCustomers = (page = 1, limit = 10, search = "") => 
    API.get(`/list?search=${search}&page=${page}&limit=${limit}`);

// GET BY ID
export const getCustomersById = (id) => API.get(`/list/${id}`);

export const getCustomersSearch = () => API.get(`/list`);

// UPDATE
export const updateCustomers = (id, data) => API.put(`/update/${id}`, data);

// DELETE
export const deleteCustomers = (id) => API.delete(`/delete/${id}`);

// EXPORT TO EXCEL
export const exportCustomersToExcel = () =>
    API.get("/export-customers", {
        responseType: "blob",
    });
