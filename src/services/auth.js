import service from './axios';

/**
 * 登录 API
 * @param {object} data - 包含 username 和 password
 */
export function login(data) {
    return service({
        url: '/auth/login',
        method: 'post',
        data
    });
}

/**
 * 注册 API
 * @param {object} data - 包含 username 和 password
 */
export function register(data) {
    return service({
        url: '/auth/register',
        method: 'post',
        data
    });
}
