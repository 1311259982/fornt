<template>
  <div>
    <PageHeader title="发布新文章" />
    <form @submit.prevent="publishArticle">
      <div class="form-group">
        <label for="title">标题</label>
        <input type="text" id="title" v-model="title">
      </div>
      <div class="form-group">
        <label for="content">内容</label>
        <textarea id="content" v-model="content" rows="10"></textarea>
      </div>
      <button type="submit" class="btn-submit">发布</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, onBeforeRouteLeave } from 'vue-router';
import { createArticle } from '@/services/article';
import { ElMessage, ElMessageBox } from 'element-plus';
import PageHeader from '@/components/common/PageHeader.vue'; // Import the new component

const title = ref('');
const content = ref('');
const router = useRouter();

//标志位，用于防止在成功提交后触发离开守卫
const isSubmitting = ref(false);

// --- 主要操作：发布文章 ---
const publishArticle = async () => {
  if (!title.value.trim() || !content.value.trim()) {
    ElMessage.warning('标题和内容不能为空');
    return;
  }

  isSubmitting.value = true; // 标记开始提交

  try {
    const articleData = {
      title: title.value,
      content: content.value,
      isPublished: true // “发布”意味着 isPublished 为 true
    };

    const res = await createArticle([articleData]);

    if (res && res.code === 201) {
      ElMessage.success('文章发布成功');
      router.push('/articles');
    } else {
      ElMessage.error(res.message || '发布失败');
      isSubmitting.value = false; // 失败时重置标志位
    }
  } catch (error) {
    console.error('发布文章失败', error);
    ElMessage.error('发布文章请求失败');
    isSubmitting.value = false; // 失败时重置标志位
  }
};

// --- 辅助操作：保存为草稿 ---
const saveAsDraft = async () => {
  const articleData = {
    title: title.value.trim() || '无标题草稿', // 如果标题为空，提供默认值
    content: content.value,
    isPublished: false // “草稿”意味着 isPublished 为 false
  };

  try {
    const res = await createArticle([articleData]);
    if (res && res.code === 201) {
      ElMessage.success('已保存为草稿');
      return true; // 返回成功状态
    } else {
      ElMessage.error(res.message || '草稿保存失败');
      return false;
    }
  } catch (error) {
    console.error('草稿保存失败', error);
    ElMessage.error('草稿保存请求失败');
    return false;
  }
};

// --- 导航守卫：在离开页面前触发 ---
onBeforeRouteLeave(async (to, from, next) => {
  // 如果正在提交，或者内容和标题都为空，则直接允许离开
  if (isSubmitting.value || (!title.value.trim() && !content.value.trim())) {
    next();
    return;
  }

  // 如果有内容，则弹出确认对话框
  try {
    await ElMessageBox.confirm(
      '您有未保存的内容，要将其保存为草稿吗？',
      '提示',
      {
        confirmButtonText: '保存为草稿',
        cancelButtonText: '放弃保存',
        type: 'warning',
      }
    );
    
    // 用户点击了“保存为草稿”
    isSubmitting.value = true; // 标记开始提交，防止重复触发守卫
    const success = await saveAsDraft();
    if (success) {
      next(); // 保存成功后，允许跳转
    } else {
      next(false); // 如果保存失败，则停留在当前页面
      isSubmitting.value = false; // 重置标志位
    }

  } catch (action) {
    // 用户点击了“放弃保存”或关闭了对话框
    next(); // 直接允许跳转
  }
});
</script>

<style scoped>
.form-group { margin-bottom: 1rem; }
label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
input, textarea { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; font-family: inherit; }
.btn-submit { padding: 0.75rem 1.5rem; background-color: #409eff; color: white; border: none; cursor: pointer; border-radius: 4px; font-size: 1rem; }
.btn-submit:hover { background-color: #66b1ff; }
</style>
