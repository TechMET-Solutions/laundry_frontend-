import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/reports",
});

export const getTaxReport = (startDate, endDate) =>
    API.get(`/tax?start_date=${startDate}&end_date=${endDate}`);

export const getOrderReport = (params) => {
  return API.get("/orders", {
    params,
  });
};

export const getSalesReport = (params) => {
    return API.get("/sales", {
        params,
    });
};
