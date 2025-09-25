<template>
  <div>
    <h2>发布新文章</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">标题</label>
        <input type="text" id="title" v-model="title" @blur="generateSlug" required>
      </div>
      <div class="form-group">
        <label for="slug">Slug (URL片段)</label>
        <input type="text" id="slug" v-model="slug" required>
      </div>
      <div class="form-group">
        <label for="content">内容</label>
        <textarea id="content" v-model="content" rows="10" required></textarea>
      </div>
      <div class="form-group-checkbox">
        <input type="checkbox" id="isPublished" v-model="isPublished">
        <label for="isPublished">立即发布</label>
      </div>
      <button type="submit" class="btn-submit">发布</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createArticle } from '@/services/article';
import { ElMessage } from 'element-plus';

const title = ref('');
const slug = ref('');
const content = ref('');
const isPublished = ref(true);
const router = useRouter();

// Helper to generate a URL-friendly slug from the title
const generateSlug = () => {
  if (title.value && !slug.value) {
    slug.value = title.value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove non-word chars
      .replace(/\s+/g, '-')      // Replace spaces with -
      .replace(/--+/g, '-');     // Replace multiple - with single -
  }
};

const handleSubmit = async () => {
  try {
    // Create the article object
    const articleData = {
      title: title.value,
      content: content.value,
      slug: slug.value,
      isPublished: isPublished.value
    };

    // CRITICAL FIX: Wrap the object in an array as required by the backend
    const res = await createArticle([articleData]);

    if (res && res.code === 201) { // Backend returns 201 Created
      ElMessage.success('文章发布成功');
      // The API for creation doesn't return the new object, so we redirect to the list
      router.push('/articles');
    } else {
      ElMessage.error(res.message || '发布失败');
    }
  } catch (error) {
    console.error('发布文章失败', error);
    ElMessage.error('发布文章请求失败');
  }
};
</script>

<style scoped>
/* Reusing auth form styles for consistency */
.form-group { margin-bottom: 1rem; }
label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
input, textarea { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; font-family: inherit; }
.form-group-checkbox { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; }
.form-group-checkbox label { margin-bottom: 0; }
.btn-submit { padding: 0.75rem 1.5rem; background-color: #409eff; color: white; border: none; cursor: pointer; border-radius: 4px; font-size: 1rem; }
.btn-submit:hover { background-color: #66b1ff; }
</style>
