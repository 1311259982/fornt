<template>
  <div class="app-container">
    <!-- 导航栏 -->
    <header class="navbar">
      <div class="logo">
        <router-link to="/">个人博客</router-link>
      </div>
      <nav class="menu">
        <router-link to="/" :class="{ active: $route.path === '/' }">首页</router-link>
        <router-link to="/articles" :class="{ active: $route.path === '/articles' }">文章</router-link>
      </nav>
      <div class="user-actions">
        <template v-if="userStore.isLogin">
          <router-link to="/articles/create" class="btn-primary">发布文章</router-link>
          <span class="username">{{ userStore.username }}</span>
          <button @click="handleLogout" class="btn-logout">退出</button>
        </template>
        <template v-else>
          <router-link to="/login" class="btn-login">登录</router-link>
          <router-link to="/register" class="btn-register">注册</router-link>
        </template>
      </div>
    </header>

    <!-- 主内容区 (子路由将在这里渲染) -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <p>© 2025 个人博客系统 | 设计与开发</p>
    </footer>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'; // Re-enable ElMessage

const userStore = useUserStore()
const router = useRouter()

const handleLogout = () => {
  userStore.logout()
  ElMessage.success('退出成功'); // Restore ElMessage feedback
  router.push('/login')
}
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 60px;
  background-color: #2c3e50;
  color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.logo a {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}

.menu {
  display: flex;
  gap: 1.5rem;
}

.menu a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s;
}

.menu a:hover, .menu a.active {
  color: #409eff;
}

.menu a.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #409eff;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-actions a, .user-actions button {
  padding: 0.4rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  border: none;
  font-size: 0.9rem;
  transition: background-color 0.3s, color 0.3s;
}

.btn-primary {
  background-color: #409eff;
  color: white;
}
.btn-primary:hover { background-color: #66b1ff; }

.btn-login {
  background-color: transparent;
  color: white;
  border: 1px solid white;
}
.btn-login:hover { background-color: white; color: #2c3e50; }

.btn-register {
  background-color: white;
  color: #2c3e50;
}
.btn-register:hover { background-color: #f0f2f5; }

.btn-logout {
  background-color: #f56c6c;
  color: white;
}
.btn-logout:hover { background-color: #f78989; }

.username {
  color: white;
  font-weight: bold;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  box-sizing: border-box;
}

.footer {
  text-align: center;
  padding: 1.5rem;
  background-color: #f5f5f5;
  color: #666;
  border-top: 1px solid #e5e5e5;
}
</style>
