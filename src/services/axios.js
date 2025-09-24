import axios from 'axios'
import { ElMessage } from 'element-plus'

const axiosInstance = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// 请求拦截器：添加Token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        ElMessage.error('请求参数错误')
        return Promise.reject(error)
    }
)

// 响应拦截器：处理错误
axiosInstance.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        const message = error.response?.data?.msg || '请求失败'
        ElMessage.error(message)
        return Promise.reject(error)
    }
)

export default axiosInstance
