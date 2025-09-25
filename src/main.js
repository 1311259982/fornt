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

// --- DEBUGGING: Navigation guard is temporarily disabled ---
/*
const userStore = useUserStore();

router.beforeEach((to, from, next) => {
    const isLoggedIn = userStore.isLogin;

    if (to.meta.requiresAuth && !isLoggedIn) {
        console.log(`Redirecting to /login because route requires auth and user is not logged in.`);
        next('/login');
    } else {
        next();
    }
});
*/
// --- END OF DEBUGGING BLOCK ---

// Finally, mount the app.
app.mount('#app')
