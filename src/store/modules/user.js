// src/store/modules/user.js
import { defineStore } from 'pinia';

// API imports are intentionally commented out for this phase.
// import { login as apiLogin, register as apiRegister } from '@/services/auth';

export const useUserStore = defineStore('user', {
    state: () => ({
        id: null,
        username: 'Guest', // Default value for testing
        role: '',
        token: localStorage.getItem('token') || '',
        // Initialize isLogin based on token presence, for testing refresh persistence.
        isLogin: !!localStorage.getItem('token')
    }),
    actions: {
        // Mock login action for UI testing
        login(loginInfo) {
            this.id = loginInfo.id || 1;
            this.username = loginInfo.username || 'TestUser';
            this.role = loginInfo.role || 'user';
            this.token = loginInfo.jwtToken || 'fake-token-for-testing';
            this.isLogin = true;
            localStorage.setItem('token', this.token);
        },
        logout() {
            this.id = null;
            this.username = 'Guest';
            this.role = '';
            this.token = '';
            this.isLogin = false;
            localStorage.removeItem('token');
        },
        // Mock register action for UI testing
        async register(user) {
            console.log('Register function called in debug mode:', user);
            return Promise.resolve({ success: true });
        }
    }
});
