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
          <!-- Changed username span to a router-link -->
          <router-link to="/profile" class="username-link">{{ userStore.username }}</router-link>
          <button @click="handleLogout" class="btn-logout">退出</button>
        </template>
        <template v-else>
          <router-link to="/login" class="btn-login">登录</router-link>
          <router-link to="/register" class="btn-register">注册</router-link>
        </template>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 面包屑导航 -->
      <div class="breadcrumb-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item 
            v-for="item in breadcrumbs" 
            :key="item.path" 
            :to="{ path: item.path }"
          >
            {{ item.meta.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      
      <router-view />
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <p>© 2025 个人博客系统 | 设计与开发</p>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/store/modules/user';
import { ElMessage } from 'element-plus';

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const handleLogout = () => {
  userStore.logout();
  ElMessage.success('退出成功');
  router.push('/login');
};

// 计算面包屑路径
const breadcrumbs = computed(() => {
  return route.matched.filter(item => item.meta && item.meta.title && item.path !== '/');
});
</script>

<style scoped>
.username-link {
  color: white;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s;
}
.username-link:hover {
  color: #409eff;
}

.breadcrumb-container {
  padding: 1rem 0;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e5e5e5;
}

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
