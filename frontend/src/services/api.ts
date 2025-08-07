import axios, { AxiosResponse, AxiosError } from 'axios';
import {
    AuthResponse,
    LoginRequest,
    RegisterRequest,
    User,
    Product,
    PagedResponse,
    ApiError
} from '../types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 second timeout
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiError>) => {
        console.error('API Error:', error.response?.data || error.message);

        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Redirect to login page
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

// Authentication API
export const authAPI = {
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const response: AxiosResponse<AuthResponse> = await api.post('/auth/login', data);
        return response.data;
    },

    register: async (data: RegisterRequest): Promise<AuthResponse> => {
        const response: AxiosResponse<AuthResponse> = await api.post('/auth/register', data);
        return response.data;
    },

    getCurrentUser: async (): Promise<User> => {
        const response: AxiosResponse<User> = await api.get('/auth/me');
        return response.data;
    },
};

// Products API
export const productAPI = {
    getProducts: async (
        page: number = 0,
        size: number = 12,
        search?: string,
        sortBy: string = 'createdAt',
        sortDir: string = 'desc'
    ): Promise<PagedResponse<Product>> => {
        const params = new URLSearchParams({
            page: page.toString(),
            size: size.toString(),
            sortBy,
            sortDir
        });

        let url = '/products';
        if (search) {
            url = `/products/search?query=${encodeURIComponent(search)}`;
        }

        const response: AxiosResponse<PagedResponse<Product>> = await api.get(`${url}?${params}`);
        return response.data;
    },

    getProduct: async (id: number): Promise<Product> => {
        const response: AxiosResponse<Product> = await api.get(`/products/${id}`);
        return response.data;
    },

    createProduct: async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
        const response: AxiosResponse<Product> = await api.post('/products', data);
        return response.data;
    },

    updateProduct: async (id: number, data: Partial<Product>): Promise<Product> => {
        const response: AxiosResponse<Product> = await api.put(`/products/${id}`, data);
        return response.data;
    },

    deleteProduct: async (id: number): Promise<void> => {
        await api.delete(`/products/${id}`);
    },

    getProductsInStock: async (): Promise<Product[]> => {
        const response: AxiosResponse<Product[]> = await api.get('/products/in-stock');
        return response.data;
    },

    getProductsByPriceRange: async (minPrice: number, maxPrice: number): Promise<Product[]> => {
        const response: AxiosResponse<Product[]> = await api.get(
            `/products/price-range?minPrice=${minPrice}&maxPrice=${maxPrice}`
        );
        return response.data;
    },
};

// Health check API
export const healthAPI = {
    check: async (): Promise<string> => {
        const response: AxiosResponse<string> = await api.get('/health');
        return response.data;
    },
};

export default api;