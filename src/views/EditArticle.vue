<template>
  <div>
    <PageHeader :title="isFromDraft ? '编辑草稿' : '编辑文章'" />
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">标题</label>
        <input type="text" id="title" v-model="title" required>
      </div>
      <div class="form-group">
        <label for="content">内容</label>
        <textarea id="content" v-model="content" rows="10" required></textarea>
      </div>

      <!-- Dynamic Buttons -->
      <div class="button-group">
        <template v-if="isFromDraft">
          <button type="button" class="btn-secondary" @click="updateDraft">更新草稿</button>
          <button type="button" class="btn-submit" @click="updateAndPublish">更新并发布</button>
        </template>
        <template v-else>
          <button type="submit" class="btn-submit">更新</button>
        </template>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router';
import { getArticleById, updateArticle } from '@/services/article';
import { ElMessage, ElMessageBox } from 'element-plus';
import PageHeader from '@/components/common/PageHeader.vue';

const router = useRouter();
const route = useRoute();

const title = ref('');
const content = ref('');

// --- State for new logic ---
const isFromDraft = ref(false);
const initialTitle = ref('');
const initialContent = ref('');
const hasChanged = ref(false);
const isSubmitting = ref(false);

// Watch for changes to mark the form as dirty
watch([title, content], ([newTitle, newContent]) => {
  if (newTitle !== initialTitle.value || newContent !== initialContent.value) {
    hasChanged.value = true;
  }
});

onMounted(async () => {
  isFromDraft.value = route.query.from === 'draft';
  const articleId = route.params.id;

  if (articleId) {
    try {
      const res = await getArticleById(articleId);
      if (res && res.data) {
        title.value = res.data.title;
        content.value = res.data.content;
        // Store initial state to detect changes
        initialTitle.value = res.data.title;
        initialContent.value = res.data.content;
      } else {
        ElMessage.error('未找到文章或获取失败');
        router.push('/articles');
      }
    } catch (error) {
      console.error('获取文章详情失败', error);
      ElMessage.error('获取文章详情请求失败');
      router.push('/articles');
    }
  } else {
    ElMessage.error('文章ID缺失');
    router.push('/articles');
  }
});

// --- Button Handlers ---

// Generic update function
const performUpdate = async (isPublished) => {
  isSubmitting.value = true;
  try {
    const articleId = route.params.id;
    const res = await updateArticle(articleId, { 
      title: title.value, 
      content: content.value, 
      isPublished 
    });
    if (res && res.code === 200) {
      ElMessage.success(isPublished ? '文章已更新并发布' : '草稿已更新');
      // After successful submission, allow leaving the page
      hasChanged.value = false;
      router.push(`/profile`); // Go to profile to see the result
    } else {
      ElMessage.error(res.message || '更新失败');
      isSubmitting.value = false;
    }
  } catch (error) {
    console.error('更新文章失败', error);
    ElMessage.error('更新文章请求失败');
    isSubmitting.value = false;
  }
};

// For default "Update" button
const handleSubmit = () => {
  performUpdate(true); // Editing a published article keeps it published
};

// For "Update Draft" button
const updateDraft = () => {
  performUpdate(false);
};

// For "Update and Publish" button
const updateAndPublish = () => {
  performUpdate(true);
};

// --- Navigation Guard ---
onBeforeRouteLeave(async (to, from, next) => {
  if (isFromDraft.value && hasChanged.value && !isSubmitting.value) {
    try {
      const action = await ElMessageBox.confirm(
        '您有未保存的更改，请选择操作。',
        '强制保存',
        {
          distinguishCancelAndClose: true,
          confirmButtonText: '更新并发布',
          cancelButtonText: '更新草稿',
          type: 'warning',
        }
      );
      // User clicked "Update and Publish"
      await performUpdate(true);
      next();
    } catch (action) {
      if (action === 'cancel') {
        // User clicked "Update Draft"
        await performUpdate(false);
        next();
      } else {
        // User closed the dialog, prevent navigation
        next(false);
      }
    }
  } else {
    // Allow navigation
    next();
  }
});

</script>

<style scoped>
.form-group { margin-bottom: 1rem; }
label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
input, textarea { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; font-family: inherit; }

.button-group {
  display: flex;
  gap: 1rem;
}

.btn-submit, .btn-secondary {
  padding: 0.75rem 1.5rem;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 1rem;
}

.btn-submit {
  background-color: #409eff;
  color: white;
}
.btn-submit:hover { background-color: #66b1ff; }

.btn-secondary {
  background-color: #f0f2f5;
  color: #606266;
  border: 1px solid #dcdfe6;
}
.btn-secondary:hover { background-color: #e4e7ed; }
</style>
