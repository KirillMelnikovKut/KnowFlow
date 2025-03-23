import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { useAuthStore } from '@/stores/auth';

const apiClient: AxiosInstance = axios.create({
    baseURL: 'https://your-api-url.com/api', // Замените на ваш API URL
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const authStore = useAuthStore();
    if (authStore.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const authStore = useAuthStore();
            authStore.logout();
        }
        return Promise.reject(error);
    }
);

export default apiClient;