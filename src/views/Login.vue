<!-- src/views/Login.vue -->
<template>
  <div class="auth-page">
    <div class="auth-card">
      <h2>登录</h2>
      <el-form :model="user" :rules="rules" ref="formRef" label-width="80px">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="user.email" type="email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="user.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" class="full-width">登录</el-button>
        </el-form-item>
      </el-form>
      <p class="link-text">
        还没有账号？<router-link to="/register">去注册</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import { login } from '@/services/auth';
import { ElMessage } from 'element-plus';

const user = ref({ email: '', password: '' });
const formRef = ref(null);
const router = useRouter();
const store = useStore();

const rules = {
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
};

const handleLogin = async () => {
  await formRef.value.validate();
  try {
    const response = await login(user.value);
    store.dispatch('user/login', response.data);
    router.push('/');
  } catch (error) {
    ElMessage.error(error.response?.data?.msg || '登录失败');
  }
};
</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}
.auth-card {
  width: 400px;
  padding: 30px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
.auth-card h2 {
  text-align: center;
  margin-bottom: 20px;
}
.full-width {
  width: 100%;
}
.link-text {
  text-align: center;
  margin-top: 15px;
}
</style>