import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { useUserStore } from '@/store/modules/user';

// Re-importing ElementPlus as per original setup
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// Re-importing global styles
import './assets/css/variables.css'

const app = createApp(App)

// Install all plugins first
app.use(store)
app.use(router)
app.use(ElementPlus)

// --- CRITICAL STEP: Set up navigation guard AFTER all plugins are installed ---

// 1. Get a store instance here, in a safe context.
const userStore = useUserStore();

// 2. Add the navigation guard.
router.beforeEach((to, from, next) => {
    const isLoggedIn = userStore.isLogin;

    if (to.meta.requiresAuth && !isLoggedIn) {
        // If the route requires auth and user is not logged in, redirect to login page.
        console.log(`Redirecting to /login because route requires auth and user is not logged in.`);
        next('/login');
    } else {
        // Otherwise, allow navigation.
        next();
    }
});

// Finally, mount the app.
app.mount('#app')
