import axios from "axios";
import { API_URL } from "../config";

// Add token to headers
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (token) {
        return {
            headers: { Authorization: `Bearer ${token}` },
        };
    } else {
        console.log("No token found")
    }
};

// Login request
export const login = async ({ username, password }) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { username, password });
        return response.data;
    } catch (err) {
        console.log(err)
    }

};

// Register request
export const register = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
}

export const getUserProfile = async () => {
    try {
        const response = await axios.get(`${API_URL}/auth/adminuser/get-profile`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error.response ? error.response.data : error);
        throw error; // Re-throw to handle in component
    }
};


// Fetch all users for admin (User Management)
export const getAllUsers = async () => {
    const response = await axios.get(`${API_URL}/auth/admin/users`, getAuthHeaders());
    return response.data;
};

// update a user
export const updateUserProfile = async (id, userData) => {
    const response = await axios.put(`${API_URL}/auth/admin/users/${id}`, userData, getAuthHeaders());
    return response.data;
}
// delete a user by id
export const deleteUser = async (id) => {
    const response = await axios.delete(`${API_URL}/auth/admin/user/${id}`, id, getAuthHeaders());
    return response.data;
}
// get a user by id
export const getUserById = async (id) => {
    const response = await axios.get(`${API_URL}/auth/admin/user/${id}`, id, getAuthHeaders());
    return response.data;
}
