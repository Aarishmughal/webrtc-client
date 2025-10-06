import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

class Api {
    private client: AxiosInstance;

    constructor(baseURL = "") {
        this.client = axios.create({ baseURL });
    }
    
    setToken(token?: string) {
        if (token) {
            this.client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete this.client.defaults.headers.common["Authorization"];
        }
    }

    async get<T = any>(endpoint: string, params?: Record<string, any>) {
        const res = await this.client.get<T>(endpoint, { params });
        return res.data;
    }

    async post<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig) {
        const res = await this.client.post<T>(endpoint, data, config);
        return res.data;
    }

    async put<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig) {
        const res = await this.client.put<T>(endpoint, data, config);
        return res.data;
    }

    async patch<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig) {
        const res = await this.client.patch<T>(endpoint, data, config);
        return res.data;
    }

    async delete<T = any>(endpoint: string, config?: AxiosRequestConfig) {
        const res = await this.client.delete<T>(endpoint, config);
        return res.data;
    }

    // helper for multipart/form-data submissions (keeps old API)
    async postData<T = any>(endpoint: string, formData: FormData, config: AxiosRequestConfig = {}) {
        const cfg = {
            headers: { "Content-Type": "multipart/form-data" },
            ...config,
        } as AxiosRequestConfig;
        return this.post<T>(endpoint, formData, cfg);
    }
}

const base = (import.meta as any).env?.VITE_API_URL ?? "";
const api = new Api(base);
export default api;