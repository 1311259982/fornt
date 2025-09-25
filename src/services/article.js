import service from './axios';

/**
 * 获取文章列表
 * @param {object} params - 分页等查询参数
 */
export function getArticleList(params) {
    return service({
        url: '/posts',
        method: 'get',
        params
    });
}

/**
 * 根据用户ID获取文章列表
 * @param {string} userId - 用户 ID
 */
export function getArticlesByUserId(userId) {
    return service({
        url: '/posts',
        method: 'get',
        params: { userId } // Assuming the backend supports filtering by userId
    });
}

/**
 * 根据 ID 获取文章详情
 * @param {string} id - 文章 ID
 */
export function getArticleById(id) {
    return service({
        url: `/posts/${id}`,
        method: 'get'
    });
}

/**
 * 创建新文章
 * @param {object} data - 文章数据 (title, content)
 */
export function createArticle(data) {
    return service({
        url: '/posts',
        method: 'post',
        data
    });
}

/**
 * 更新文章
 * @param {string} id - 文章 ID
 * @param {object} data - 更新的文章数据
 */
export function updateArticle(id, data) {
    return service({
        url: `/posts/${id}`,
        method: 'put',
        data
    });
}

/**
 * 删除文章
 * @param {string} id - 文章 ID
 */
export function deleteArticle(id) {
    return service({
        url: `/posts/${id}`,
        method: 'delete'
    });
}
