<template>
  <div class="auth-page-wrapper">
    <!-- Home Button -->
    <router-link to="/" class="home-link">
      <el-icon><ArrowLeftBold /></el-icon>
      <span>返回主页</span>
    </router-link>

    <div class="auth-container">
      <h2>登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="identifier">用户名或邮箱</label> 
          <input type="text" id="identifier" v-model="identifier" required> 
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit" class="btn-submit">登录</button>
      </form>
      <div class="register-link">
        <p>没有账号？ <router-link to="/register">点击注册</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/modules/user';
import { login as apiLogin } from '@/services/auth';
import { ElMessage } from 'element-plus';
import { ArrowLeftBold } from '@element-plus/icons-vue'; // Import icon

const identifier = ref('');
const password = ref('');
const router = useRouter();
const userStore = useUserStore();

const handleLogin = async () => {
  try {
    let loginPayload = { password: password.value };

    if (identifier.value.includes('@')) {
      loginPayload.email = identifier.value;
    } else {
      loginPayload.username = identifier.value;
    }

    const res = await apiLogin(loginPayload);
    
    if (res && res.code === 200) {
      userStore.login(res.data);
      ElMessage.success('登录成功');
      router.push('/');
    } else {
      ElMessage.error(res.message || '登录失败');
    }
  } catch (error) {
    console.error('登录请求失败', error);
    ElMessage.error('登录请求失败，请检查网络或服务器');
  }
};
</script>

<style scoped>
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

.register-link {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #666;
}
.register-link a {
  color: #409eff;
  text-decoration: none;
  font-weight: 500;
}
.register-link a:hover {
  text-decoration: underline;
}
</style>
