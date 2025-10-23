<template>
  <div class="auth-page-wrapper">
    <!-- Home Button -->
    <router-link to="/" class="home-link">
      <el-icon><ArrowLeftBold /></el-icon>
      <span>返回主页</span>
    </router-link>

    <div class="auth-container">
      <h2>注册</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="username">用户名</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="email">邮箱</label> 
          <input type="email" id="email" v-model="email" required> 
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit" class="btn-submit">注册</button>
      </form>
      <div class="login-link">
        <p>已有账号？ <router-link to="/login">去登录</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/modules/user';
import { ElMessage } from 'element-plus';
import { ArrowLeftBold } from '@element-plus/icons-vue'; // Import icon

const username = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();
const userStore = useUserStore();

const handleRegister = async () => {
  try {
    const res = await userStore.register({
      username: username.value,
      password: password.value,
      email: email.value,
      role: 'USER'
    });
    if (res && res.code === 200) {
      ElMessage.success('注册成功，请登录');
      router.push('/login');
    } else {
      ElMessage.error(res.message || '注册失败');
    }
  } catch (error) {
    console.error('注册请求失败', error);
    ElMessage.error('注册请求失败，请检查网络或服务器');
  }
};
</script>

<style scoped>
/* Using the same styles as Login.vue for consistency */
.auth-page-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  position: relative;
}

.home-link {
  position: absolute;
  top: 2rem;
  left: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #606266;
  text-decoration: none;
  font-weight: 500;
}
.home-link:hover {
  color: #409eff;
}

.auth-container { 
  width: 100%;
  max-width: 400px; 
  padding: 2rem; 
  box-shadow: 0 4px 12px rgba(0,0,0,0.1); 
  border-radius: 8px; 
  background: white; 
}
h2 { text-align: center; margin-bottom: 1.5rem; color: #333; }
.form-group { margin-bottom: 1rem; }
label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
input { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; }
.btn-submit { width: 100%; padding: 0.75rem; background-color: #409eff; color: white; border: none; cursor: pointer; border-radius: 4px; font-size: 1rem; }
.btn-submit:hover { background-color: #66b1ff; }

.login-link {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #666;
}
.login-link a {
  color: #409eff;
  text-decoration: none;
  font-weight: 500;
}
.login-link a:hover {
  text-decoration: underline;
}
</style>
