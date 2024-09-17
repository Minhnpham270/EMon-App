import axios, { AxiosInstance } from 'axios';
import { store } from '../redux/store';

const apiClient: AxiosInstance = axios.create({
  baseURL:
    'https://814f-2001-ee0-4a69-8e80-2590-342c-8d57-edcf.ngrok-free.app' ||
    'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + store.getState().auth.token || '',
  },
});

export default apiClient;
