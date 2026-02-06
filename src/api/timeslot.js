import axios from "axios";
import { API_URL } from "./index";

const API = axios.create({
    baseURL: `${API_URL}/api/timeslot`,
});

// CREATE
export const createTimeSlot = (data) => API.post("/create", data);

// GET ALL (Pagination)
export const getAllTimeSlot = (page = 1, limit = 10) => 
    API.get(`/list?page=${page}&limit=${limit}`);

//GET BY ID 
export const getTimeSlotById = (id) => API.get(`/list/${id}`);

// UPDATE
export const updateTimeSlot = (id, data) => API.put(`/update/${id}`, data);

//DELETE 
export const deleteTimeSlot = (id) => API.delete(`/delete/${id}`);

