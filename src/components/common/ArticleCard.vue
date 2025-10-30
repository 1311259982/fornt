<template>
  <div class="article-card">
    <div class="card-content">
      <h3 class="card-title">
        <router-link :to="`/articles/${article.id}`">{{ article.title }}</router-link>
      </h3>
      <!-- ADDED: Author and Date Info -->
      <div class="card-meta">
        <span class="meta-author">{{ article.authorName || '匿名作者' }}</span>
        <span class="meta-date">发布于 {{ new Date(article.createdAt).toLocaleDateString() }}</span>
      </div>
      <p class="card-excerpt">{{ truncatedContent }}</p>
    </div>
    <div class="card-footer">
      <router-link :to="`/articles/${article.id}`" class="read-more">阅读全文 &rarr;</router-link>
      <span class="views">浏览: {{ article.views || 0 }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
});

// Create a truncated version of the content for the excerpt
const truncatedContent = computed(() => {
  if (!props.article.content) return '';
  const strippedContent = props.article.content.replace(/<[^>]*>?/gm, ''); // Strip HTML tags
  return strippedContent.length > 100
    ? strippedContent.substring(0, 100) + '...'
    : strippedContent;
});
</script>

<style scoped>
.article-card {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.3s ease-in-out;
}

.article-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-content {
  padding: 1.5rem;
  flex-grow: 1;
}

.card-title {
  margin: 0 0 0.75rem 0;
  font-size: 1.4rem;
}

.card-title a {
  text-decoration: none;
  color: #333;
  transition: color 0.3s;
}

.card-title a:hover {
  color: #409eff;
}

.card-meta {
  display: flex;
  gap: 1rem;
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.card-excerpt {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.card-footer {
  background-color: #f9f9f9;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #e5e5e5;
}

.read-more {
  color: #409eff;
  text-decoration: none;
  font-weight: 500;
}

.read-more:hover {
  text-decoration: underline;
}

.views {
  font-size: 0.9rem;
  color: #999;
}
</style>
