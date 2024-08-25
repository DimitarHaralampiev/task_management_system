import axios from "axios";

const API_URL = 'http://localhost:8000';

export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/token`, {
        username,
        password
    });
    return response.data;
};

export const get_tasks = async (token) => {
    const response = await axios.get(`${API_URL}/tasks/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
};

export const create_task = async (task, token) => {
    const response = await axios.post(`${API_URL}/tasks/`, task,{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
};