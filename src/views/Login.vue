<template>
  <div class="auth-container">
    <h2>登录</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">用户名</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit" class="btn-submit">登录</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/modules/user';

const username = ref('');
const password = ref('');
const router = useRouter();
const userStore = useUserStore();

const handleLogin = async () => {
  console.log('Attempting login with (mock):', { username: username.value });
  // Using the mock store action, no API call is made.
  userStore.login({ username: username.value });
  console.log('Mock login successful, redirecting to home...');
  router.push('/');
};
</script>

<style scoped>
.auth-container { max-width: 400px; margin: 5rem auto; padding: 2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-radius: 8px; background: white; }
h2 { text-align: center; margin-bottom: 1.5rem; color: #333; }
.form-group { margin-bottom: 1rem; }
label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
input { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; }
.btn-submit { width: 100%; padding: 0.75rem; background-color: #409eff; color: white; border: none; cursor: pointer; border-radius: 4px; font-size: 1rem; }
.btn-submit:hover { background-color: #66b1ff; }
</style>
