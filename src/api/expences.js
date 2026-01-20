import axios from "axios";
const API = axios.create({
    baseURL: "http://localhost:5000/api/expenses",
});

export const createExpense = (data) => API.post("/create", data);

export const getAllExpenses = (page = 1, limit = 10) =>
    API.get(`/list?page=${page}&limit=${limit}`);

export const getExpenseById = (id) => API.get(`/list/${id}`);

export const updateExpense = (id, data) => API.put(`/update/${id}`, data);  

export const deleteExpense = (id) => API.delete(`/delete/${id}`);
  