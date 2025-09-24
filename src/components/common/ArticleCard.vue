<template>
  <div class="article-card">
    <h3 class="article-title">
      <router-link :to="`/articles/${article.id}`">{{ article.title }}</router-link>
    </h3>
    <div class="article-meta">
      <span>作者: {{ article.username }}</span>
      <span>发布时间: {{ formatDate(article.createdAt) }}</span>
    </div>
    <p class="article-excerpt">{{ getExcerpt(article.content) }}</p>
    <div class="article-footer">
      <div class="article-tags">
        <el-tag
            v-for="(tag, index) in article.tags"
            :key="index"
            size="mini"
            v-if="index < 3"
        >
          {{ tag }}
        </el-tag>
        <el-tag
            size="mini"
            v-if="article.tags && article.tags.length > 3"
        >
          +{{ article.tags.length - 3 }}
        </el-tag>
      </div>
      <router-link :to="`/articles/${article.id}`" class="read-more">阅读全文 →</router-link>
    </div>
  </div>
</template>

<script setup>
import { formatDate } from '@/utils/date'

// 接收父组件传递的文章数据
const props = defineProps({
  article: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

// 获取文章摘要（前150个字符）
const getExcerpt = (content) => {
  if (!content) return '暂无内容'
  // 简单处理HTML标签
  const plainText = content.replace(/<[^>]+>/g, '')
  return plainText.length > 150 ? plainText.slice(0, 150) + '...' : plainText
}
</script>

<style scoped>
.article-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.article-title {
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  line-height: 1.4;
}

.article-title a {
  color: #333;
  text-decoration: none;
}

.article-title a:hover {
  color: #409eff;
}

.article-meta {
  display: flex;
  gap: 1rem;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.article-excerpt {
  color: #555;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.article-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.read-more {
  color: #409eff;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
}
</style>
