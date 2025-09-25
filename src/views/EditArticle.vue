<template>
  <div>
    <h2>编辑文章 (ID: {{ $route.params.id }})</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">标题</label>
        <input type="text" id="title" v-model="title" required>
      </div>
      <div class="form-group">
        <label for="content">内容</label>
        <textarea id="content" v-model="content" rows="10" required></textarea>
      </div>
      <button type="submit" class="btn-submit">更新</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getArticleById, updateArticle } from '@/services/article';
import { ElMessage } from 'element-plus';

const title = ref('');
const content = ref('');
const router = useRouter();
const route = useRoute();

const fetchArticleToEdit = async () => {
  try {
    const articleId = route.params.id;
    if (articleId) {
      const res = await getArticleById(articleId);
      if (res && res.data) {
        title.value = res.data.title;
        content.value = res.data.content;
      } else {
        ElMessage.error('未找到文章或获取失败');
        router.push('/articles'); // Redirect if article not found
      }
    } else {
      ElMessage.error('文章ID缺失');
      router.push('/articles');
    }
  } catch (error) {
    console.error('获取文章详情失败', error);
    ElMessage.error('获取文章详情请求失败');
    router.push('/articles');
  }
};

onMounted(() => {
  fetchArticleToEdit();
});

const handleSubmit = async () => {
  try {
    const articleId = route.params.id;
    const res = await updateArticle(articleId, { title: title.value, content: content.value });
    if (res && res.code === 200) {
      ElMessage.success('文章更新成功');
      router.push(`/articles/${articleId}`);
    } else {
      ElMessage.error(res.message || '更新失败');
    }
  } catch (error) {
    console.error('更新文章失败', error);
    ElMessage.error('更新文章请求失败');
  }
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
