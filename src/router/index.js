// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

// Import all components
import MainLayout from '@/components/layout/MainLayout.vue';
import Home from '@/views/Home.vue';
import ArticleList from '@/views/ArticleList.vue';
import ArticleDetail from '@/views/ArticleDetail.vue';
import CreateArticle from '@/views/CreateArticle.vue';
import EditArticle from '@/views/EditArticle.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';

const routes = [
    // Routes that use the main layout
    {
        path: '/',
        component: MainLayout,
        children: [
            { path: '', component: Home },
            { path: 'articles', component: ArticleList },
            { path: 'articles/create', component: CreateArticle, meta: { requiresAuth: true } },
            { path: 'articles/:id', component: ArticleDetail },
            { path: 'articles/edit/:id', component: EditArticle, meta: { requiresAuth: true } }
        ]
    },
    // Standalone routes
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;