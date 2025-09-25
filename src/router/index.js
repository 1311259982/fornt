// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

import MainLayout from '@/components/layout/MainLayout.vue';
import Home from '@/views/Home.vue';
import ArticleList from '@/views/ArticleList.vue';
import ArticleDetail from '@/views/ArticleDetail.vue';
import CreateArticle from '@/views/CreateArticle.vue';
import EditArticle from '@/views/EditArticle.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Profile from '@/views/Profile.vue'; // Import the new Profile component

const routes = [
    {
        path: '/',
        component: MainLayout,
        meta: { title: '首页' },
        children: [
            { path: '', component: Home, meta: { title: '首页' } },
            { path: 'articles', component: ArticleList, meta: { title: '文章' } },
            { path: 'articles/create', component: CreateArticle, meta: { requiresAuth: true, title: '发布文章' } },
            { path: 'articles/:id', component: ArticleDetail, meta: { title: '文章详情' } },
            { path: 'articles/edit/:id', component: EditArticle, meta: { requiresAuth: true, title: '编辑文章' } },
            { path: 'profile', component: Profile, meta: { requiresAuth: true, title: '个人主页' } } // Add the profile route
        ]
    },
    {
        path: '/login',
        component: Login,
        meta: { title: '登录' }
    },
    {
        path: '/register',
        component: Register,
        meta: { title: '注册' }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;