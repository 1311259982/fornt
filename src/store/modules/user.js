// src/store/modules/user.js
import { defineStore } from 'pinia';
import { register as apiRegister } from '@/services/auth';

export const useUserStore = defineStore('user', {
    state: () => ({
        // ULTIMATE FIX: Try to initialize ID from 'userId' or 'id' from localStorage
        id: localStorage.getItem('userId') || localStorage.getItem('id') || null,
        username: '',
        role: '',
        token: localStorage.getItem('token') || '',
        isLogin: !!localStorage.getItem('token')
    }),
    actions: {
        login(loginInfo) {
            // ULTIMATE FIX: Defensively get the user ID from either 'userId' or 'id' field
            const userId = loginInfo.userId || loginInfo.id;

            this.id = userId;
            this.username = loginInfo.username;
            this.role = loginInfo.role;
            this.token = loginInfo.token;
            this.isLogin = true;

            // Store both token and the found user ID in localStorage
            localStorage.setItem('token', loginInfo.token);
            localStorage.setItem('userId', userId);
        },
        logout() {
            this.id = null;
            this.username = '';
            this.role = '';
            this.token = '';
            this.isLogin = false;

            // Remove all user-related items from localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('id'); // Also remove old 'id' key for cleanup
        },
        async register(user) {
            return await apiRegister(user);
        }
    }
});
