import axios from './axios'

export const login = (userData) => {
    return axios.post('/auth/login', userData)
}

export const register = (userData) => {
    return axios.post('/auth/register', userData)
}

export const getUserInfo = () => {
    return axios.get('/auth/info')
}
