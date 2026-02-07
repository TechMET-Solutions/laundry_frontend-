import axios from 'axios';
import { API_URL } from '.';

const API_BASE_URL = `${API_URL}/api/reports`; // Replace with your actual URL

export const getAllPaymentReceipts = async (params) => {
    try {
        // Axios automatically converts the params object into query strings
        const response = await axios.get(`${API_BASE_URL}/payments`, {
            params: {
                page: params.page || 1,
                limit: params.limit || 10,
                search: params.search || undefined,
                status: params.status || undefined,
                driver_name: params.driver || undefined,
                start_date: params.startDate || undefined,
                end_date: params.endDate || undefined,
            }
        });
        return response;
    } catch (error) {
        console.error("Error in getAllPaymentReceipts:", error);
        throw error;
    }
};

const API = axios.create({
    baseURL: `${API_URL}/api/reports`,
});

export const exportPaymentExcel = () =>
    API.get("/payments/excel", {
        responseType: "blob",
    });

export const exportPaymentPDF = () =>
    API.get("/payments/print", {
        responseType: "blob",
    });
