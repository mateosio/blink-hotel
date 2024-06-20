import axios from "../utils/axios.js";

export const getAvailable = async (dates)=>{
    try {
        console.log(dates);
        
        const response = await axios.post(
            "/availability",
            dates,
        );
        console.log("Respuesta en el cliente getAvailable", response.data);
        return response.data;
    } catch (error) {
        console.log(error.response);
        throw error;
    }
}