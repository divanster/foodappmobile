// src/api/api.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.0.2.2:8000/api';

axios.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('access_token');
    if (token && config?.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await AsyncStorage.getItem('refresh_token');
        const response = await axios.post(`${API_URL}/token/refresh/`, {
          refresh: refreshToken,
        });
        await AsyncStorage.setItem('access_token', response.data.access);
        axios.defaults.headers.common.Authorization = `Bearer ${response.data.access}`;
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
        return axios(originalRequest);
      } catch (err) {
        console.error('Error refreshing access token:', err);
      }
    }
    return Promise.reject(error);
  },
);

export const getItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/items/`);
    console.log('API response in getItems:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Error fetching items:',
        error.response?.data || error.message,
      );
    } else {
      console.error('Error fetching items:', error);
    }
    throw error;
  }
};

export const getItem = async (id: number) => {
  try {
    console.log(`Fetching item with ID: ${id}`);
    const response = await axios.get(`${API_URL}/items/${id}/`);
    console.log('API response in getItem:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `Error fetching item ${id}:`,
        error.response?.data || error.message,
      );
    } else {
      console.error(`Error fetching item ${id}:`, error);
    }
    throw error;
  }
};

export const rateItem = async (id: number, rating: number) => {
  try {
    console.log(`Rating item with ID: ${id} with rating: ${rating}`);
    const response = await axios.post(`${API_URL}/items/${id}/rate/`, {
      rating,
    });
    console.log('API response in rateItem:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `Error rating item ${id}:`,
        error.response?.data || error.message,
      );
    } else {
      console.error(`Error rating item ${id}:`, error);
    }
    throw error;
  }
};

export const addItem = async (itemData: {
  item_name: string;
  item_desc: string;
  item_image: string;
}) => {
  try {
    console.log('Adding item with data:', itemData);
    const response = await axios.post(`${API_URL}/items/`, itemData);
    console.log('API response in addItem:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Error adding item:',
        error.response?.data || error.message,
      );
    } else {
      console.error('Error adding item:', error);
    }
    throw error;
  }
};
