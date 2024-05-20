// src/api/auth.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://127.0.0.1:8000/api';

export const refreshAccessToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refresh_token');
    const response = await axios.post(`${API_URL}/token/refresh/`, {
      refresh: refreshToken,
    });
    const { access } = response.data;
    await AsyncStorage.setItem('access_token', access);
    return access;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

// Ensure you also export other auth functions if needed
