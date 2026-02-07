import axios from "axios";
import { API_URL } from "./index";

const API = axios.create({
    baseURL: `${API_URL}/api/reports`
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

export const getClothWiseReport = (params) => {
    return API.get("/cloth-wise", { params });
};

// 📄 PDF download
export const exportClothWisePDF = (params) =>
    API.get("/cloth-wise/print", {
        params,
        responseType: "blob",
    });

// 🖨️ Direct print preview
export const printClothWisePDF = (params) =>
    API.get("/cloth-wise/print", {
        params,
        responseType: "blob",
    });