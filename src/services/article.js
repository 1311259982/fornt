import service from './axios';

/**
 * 获取文章列表
 * @param {object} params - 分页等查询参数
 */
export function getArticleList(params) {
    return service({
        url: '/posts', // Corrected from /articles
        method: 'get',
        params
    });
}

/**
 * 根据 ID 获取文章详情
 * @param {string} id - 文章 ID
 */
export function getArticleById(id) {
    return service({
        url: `/posts/${id}`, // Corrected from /articles
        method: 'get'
    });
}

/**
 * 创建新文章
 * @param {object} data - 文章数据 (title, content)
 */
export function createArticle(data) {
    return service({
        url: '/posts', // Corrected from /articles
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
        url: `/posts/${id}`, // Corrected from /articles
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
        url: `/posts/${id}`, // Corrected from /articles
        method: 'delete'
    });
}
