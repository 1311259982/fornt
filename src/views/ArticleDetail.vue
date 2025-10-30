<template>
  <div>
    <PageHeader title="文章详情" />
    <div v-if="article" class="article-detail-container">
      <h2>{{ article.title }}</h2>
      <!-- FIXED: Use 'authorName' instead of 'author' -->
      <p class="article-meta">作者: {{ article.authorName || '匿名作者' }} | 发布日期: {{ new Date(article.createdAt).toLocaleDateString() }}</p>
      <div class="article-content" v-html="article.content"></div>
    </div>
    <div v-else>
      <p>文章加载中或未找到文章 (ID: {{ $route.params.id }})...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getArticleById } from '@/services/article';
import PageHeader from '@/components/common/PageHeader.vue';

const route = useRoute();
const article = ref(null);

const fetchArticleDetail = async () => {
  try {
    const articleId = route.params.id;
    if (articleId) {
      const res = await getArticleById(articleId);
      if (res && res.data) {
        article.value = res.data;
      } else {
        console.warn('未找到文章或API返回空数据', res);
        article.value = null;
      }
    } else {
      console.error('文章ID缺失');
      article.value = null;
    }
  } catch (error) {
    console.error('获取文章详情失败', error);
    article.value = null;
  }
};

onMounted(() => {
  fetchArticleDetail();
});
</script>

<style scoped>
.article-detail-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
h2 { margin-bottom: 1rem; color: #333; }
.article-meta { color: #666; font-size: 0.9rem; margin-bottom: 1.5rem; }
.article-content { line-height: 1.8; color: #444; }
/* Basic styling for content, adjust as needed */
.article-content p { margin-bottom: 1em; }
.article-content h3 { margin-top: 1.5em; margin-bottom: 0.8em; }
</style>
