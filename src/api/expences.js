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

export const createExpenseCategory = (data) => API.post("/category/create", data);

export const getAllExpensesCategories = (page = 1, limit = 10) =>
    API.get(`/category/list?page=${page}&limit=${limit}`);

export const getExpenseCategoryById = (id) => API.get(`/category/list/${id}`);

export const updateExpenseCategory = (id, data) => API.put(`/category/update/${id}`, data);  

export const deleteExpenseCategory = (id) => API.delete(`/category/delete/${id}`);
  
export const getExpensesReport = (startDate, endDate) =>
    API.get(`/report?start_date=${startDate}&end_date=${endDate}`);