import axios from "axios";
const API = axios.create({
    baseURL: "http://localhost:5000/api/expenses",
});

export const createExpense = (data) => API.post("/create", data);

export const getAllExpenses = () => API.get("/list");

export const getExpenseById = (id) => API.get(`/list/${id}`);

export const updateExpense = (id, data) => API.put(`/update/${id}`, data);  

export const deleteExpense = (id) => API.delete(`/delete/${id}`);
  