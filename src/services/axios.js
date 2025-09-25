import axios from 'axios';
import { useUserStore } from '@/store/modules/user';
import { ElMessage } from 'element-plus';

// 1. 创建 Axios 实例
const service = axios.create({
    // 关键：在生产环境中，您的 API 基础 URL
    // 您应该创建一个 .env.production 文件，并在其中定义 VITE_API_BASE_URL = 'http://your-backend-api.com/api'
    // Vite 在打包时会自动读取这个环境变量
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 10000, // 请求超时时间
});

// 2. 请求拦截器
service.interceptors.request.use(
    config => {
        const userStore = useUserStore();
        if (userStore.token) {
            // 为每个请求的 Header 添加 token
            config.headers['Authorization'] = `Bearer ${userStore.token}`;
        }
        return config;
    },
    error => {
        console.error('Request error:', error); // for debug
        return Promise.reject(error);
    }
);

// 3. 响应拦截器
service.interceptors.response.use(
    response => {
        // 直接返回后端响应的 data 部分
        return response.data;
    },
    error => {
        console.error('Response error:', error);
        if (error.response) {
            switch (error.response.status) {
                case 401: // Unauthorized
                    ElMessage.error('认证失败，请重新登录');
                    useUserStore().logout(); // 清除本地登录状态
                    // 可以选择跳转到登录页
                    window.location = '/login';
                    break;
                default:
                    ElMessage.error(error.response.data.message || '服务器错误');
                    break;
            }
        }
        return Promise.reject(error);
    }
);

export default service;
