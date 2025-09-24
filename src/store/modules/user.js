// src/store/modules/user.js
import { defineStore } from 'pinia';
import { login as apiLogin, register as apiRegister } from '@/services/auth';

export const useUserStore = defineStore('user', {
    state: () => ({
        id: null,
        username: '',
        role: '',
        token: localStorage.getItem('token') || '',
        isLogin: !!localStorage.getItem('token')
    }),
    actions: {
        async login(loginInfo) {
            this.id = loginInfo.id;
            this.username = loginInfo.username;
            this.role = loginInfo.role;
            this.token = loginInfo.jwtToken;
            this.isLogin = true;
            localStorage.setItem('token', loginInfo.jwtToken);
        },
        logout() {
            this.id = null;
            this.username = '';
            this.role = '';
            this.token = '';
            this.isLogin = false;
            localStorage.removeItem('token');
        },
        async register(user) {
            return await apiRegister(user);
        }
    }
});