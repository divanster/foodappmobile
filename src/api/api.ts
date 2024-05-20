import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshAccessToken } from './auth';

const API_URL = 'http://10.0.2.2:8000/api'; // Ensure this is correct for the emulator

axios.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshAccessToken();
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        originalRequest.headers.Authorization = `Bearer ${token}`;
      }
      return axios(originalRequest);
    }
    return Promise.reject(error);
  },
);

export const getItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/items/`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching items: ', error);
    throw error;
  }
};

export const getItem = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/items/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching item: ', error);
    throw error;
  }
};

export const addItem = async (item: {
  item_name: string;
  item_desc: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/items/`, item);
    return response.data;
  } catch (error) {
    console.error('Error adding item: ', error);
    throw error;
  }
};

export const deleteItem = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/items/${id}/`);
  } catch (error) {
    console.error('Error deleting item: ', error);
    throw error;
  }
};

export const getComments = async (itemId: number) => {
  try {
    const response = await axios.get(`${API_URL}/comments/?item=${itemId}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching comments: ', error);
    throw error;
  }
};

export const addComment = async (comment: {
  content: string;
  item: number;
}) => {
  try {
    const response = await axios.post(`${API_URL}/comments/`, comment);
    return response.data;
  } catch (error) {
    console.error('Error adding comment: ', error);
    throw error;
  }
};

export const rateItem = async (id: number, rating: number) => {
  try {
    const response = await axios.post(`${API_URL}/items/${id}/rate/`, {
      rating,
    });
    return response.data;
  } catch (error) {
    console.error('Error rating item: ', error);
    throw error;
  }
};
