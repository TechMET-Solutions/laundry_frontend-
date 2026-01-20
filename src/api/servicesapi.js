import axios from "axios";
const API = axios.create({
    baseURL: "http://localhost:5000/api/service/types/",
});
export const getAllServicesType = () => API.get("/list");




const API2 = axios.create({
    baseURL: "http://localhost:5000/api/service/categories/",
});

export const getAllServicesCategory = () => API2.get("/list");



 

 
 
   