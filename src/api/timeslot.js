import axios from "axios";
import { API_URL } from ".";

const API = axios.create({
    baseURL: "http://localhost:5000/api/timeslot",
    // baseURL: `${API_URL}/api/timeslot`,
});

// CREATE
export const createTimeSlot = (data) => API.post("/create", data);

// GET ALL (Pagination)
export const getAllTimeSlot = () => API.get(`/list`);

//GET BY ID 
export const getTimeSlotById = (id) => API.get(`/list/${id}`);

// UPDATE
export const updateTimeSlot = (id, data) => API.put(`/update/${id}`, data);

//DELETE 
export const deleteTimeSlot = (id) => API.delete(`/delete/${id}`);

