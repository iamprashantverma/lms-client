import { getAccessToken } from "./authService";
import axios from 'axios';

const accessToken = getAccessToken();
const API_BASE_URL = 'http://localhost:8080/member';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
});

export const getAllBooks = async (page) => {
    try {
        const response = await apiClient.get(`/book?page=${page}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}
