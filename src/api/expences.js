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

//EXPENSE CATEGORIES
const API2 = axios.create({
    baseURL: "http://localhost:5000/api/expenses/category",
});

export const createExpenseCategory = (data) => API2.post("/create", data);

export const getAllExpensesCategories = (page = 1, limit = 10) =>
    API.get(`/list?page=${page}&limit=${limit}`);

export const getExpenseCategoryById = (id) => API2.get(`/list/${id}`);

export const updateExpenseCategory = (id, data) => API2.put(`/update/${id}`, data);  

export const deleteExpenseCategory = (id) => API2.delete(`/delete/${id}`);
  
  