// src/store/modules/user.js
import { defineStore } from 'pinia';
import { register as apiRegister } from '@/services/auth';

export const useUserStore = defineStore('user', {
    state: () => ({
        id: null,
        username: '',
        role: '',
        token: localStorage.getItem('token') || '',
        isLogin: !!localStorage.getItem('token')
    }),
    actions: {
        // This action commits user data to the store after a successful login.
        // It now correctly maps backend's 'token' to store's 'token' and 'userId' to 'id'.
        login(loginInfo) {
            this.id = loginInfo.userId; // Map backend's userId to store's id
            this.username = loginInfo.username;
            this.role = loginInfo.role;
            this.token = loginInfo.token; // Map backend's token to store's token
            this.isLogin = true;
            localStorage.setItem('token', loginInfo.token);
        },
        logout() {
            this.id = null;
            this.username = '';
            this.role = '';
            this.token = '';
            this.isLogin = false;
            localStorage.removeItem('token');
        },
        // This action calls the registration API.
        async register(user) {
            return await apiRegister(user);
        }
    }
});
