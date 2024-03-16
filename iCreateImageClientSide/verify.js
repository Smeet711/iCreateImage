import axios from "axios";

export const verifyUser = async (token) => {
    try {
        const response = await axios.get(`https://icreate-admin-backend.onrender.com/api/verify-jwt/${token}`);
        return response.data;
    } catch (error) {
        console.error("Error verifying user:", error.message);
        throw error;
    }
};
