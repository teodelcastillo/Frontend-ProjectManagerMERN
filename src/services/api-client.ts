// api-client.ts
import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // Update the baseURL to include /api
});

export default apiClient;
