import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/components/layout/MainLayout.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import ArticleList from '@/views/ArticleList.vue'
import ArticleDetail from '@/views/ArticleDetail.vue'
import CreateArticle from '@/views/CreateArticle.vue'
import EditArticle from '@/views/EditArticle.vue'

// 路由守卫：验证登录状态
const requireAuth = (to, from, next) => {
    const token = localStorage.getItem('token')
    if (token) {
        next()
    } else {
        next('/login')
    }
}

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            { path: '', name: 'Home', component: Home },
            { path: 'articles', name: 'ArticleList', component: ArticleList },
            { path: 'articles/:id', name: 'ArticleDetail', component: ArticleDetail },
            {
                path: 'articles/create',
                name: 'CreateArticle',
                component: CreateArticle,
                beforeEnter: requireAuth
            },
            {
                path: 'articles/edit/:id',
                name: 'EditArticle',
                component: EditArticle,
                beforeEnter: requireAuth
            }
        ]
    },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
