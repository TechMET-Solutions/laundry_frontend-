import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/reports'; // Replace with your actual URL

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