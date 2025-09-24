import axios from './axios';

/**
 * 获取所有文章分类
 * @returns {Promise} 分类列表数据
 */
export const getCategories = () => {
    return axios.get('/categories');
};

/**
 * 创建新分类
 * @param {Object} category - 分类信息 { name: string }
 * @returns {Promise} 新创建的分类数据
 */
export const createCategory = (category) => {
    return axios.post('/categories', category);
};

/**
 * 更新分类
 * @param {number} id - 分类ID
 * @param {Object} category - 更新后的分类信息 { name: string }
 * @returns {Promise} 更新后的分类数据
 */
export const updateCategory = (id, category) => {
    return axios.put(`/categories/${id}`, category);
};

/**
 * 删除分类
 * @param {number} id - 分类ID
 * @returns {Promise} 操作结果
 */
export const deleteCategory = (id) => {
    return axios.delete(`/categories/${id}`);
};
