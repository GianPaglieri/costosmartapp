import axios from 'axios';
import Constants from 'expo-constants';

export const API_URL = Constants.expoConfig?.extra?.API_URL;

const api = axios.create({
  baseURL: API_URL,
});

export default api;
