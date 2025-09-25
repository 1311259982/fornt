<template>
  <div>
    <h2>发布新文章</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">标题</label>
        <input type="text" id="title" v-model="title" required>
      </div>
      <div class="form-group">
        <label for="content">内容</label>
        <textarea id="content" v-model="content" rows="10" required></textarea>
      </div>
      <button type="submit" class="btn-submit">发布</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const title = ref('');
const content = ref('');
const router = useRouter();

const handleSubmit = () => {
  console.log('Mock Submit:', { title: title.value, content: content.value });
  alert('文章已“发布”！(静态模式)');
  router.push('/articles');
};
</script>

<style scoped>
/* Reusing auth form styles for consistency */
.form-group { margin-bottom: 1rem; }
label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
input, textarea { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; font-family: inherit; }
.btn-submit { padding: 0.75rem 1.5rem; background-color: #409eff; color: white; border: none; cursor: pointer; border-radius: 4px; font-size: 1rem; }
.btn-submit:hover { background-color: #66b1ff; }
</style>
