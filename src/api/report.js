import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/reports",
});

export const getTaxReport = (startDate, endDate) =>
    API.get(`/tax?start_date=${startDate}&end_date=${endDate}`);
