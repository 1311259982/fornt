import axios from './axios'

export const getArticleList = (params) => {
    return axios.get('/posts', { params })
}

export const getArticleDetail = (id) => {
    return axios.get(`/posts/${id}`)
}

export const createArticle = (article) => {
    return axios.post('/posts', [article])
}

export const updateArticle = (id, article) => {
    return axios.put(`/posts/${id}`, article)
}

export const deleteArticle = (id) => {
    return axios.delete(`/posts/${id}`)
}
