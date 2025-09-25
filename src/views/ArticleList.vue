<template>
  <div>
    <PageHeader title="文章列表" />
    <div v-if="articles.length > 0" class="article-list-container">
      <ArticleCard 
        v-for="article in articles" 
        :key="article.id" 
        :article="article" 
      />
    </div>
    <div v-else>
      <p>暂无文章，或正在加载中...</p>
    </div>
    <!-- You can add pagination controls here later -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getArticleList } from '@/services/article';
import ArticleCard from '@/components/common/ArticleCard.vue';
import PageHeader from '@/components/common/PageHeader.vue'; // Import the new component

const articles = ref([]);

const fetchArticles = async () => {
  try {
    // Assuming the list API doesn't require pagination for now
    const res = await getArticleList(); 
    if (res && res.data) {
      // Adjust based on your actual API response structure, e.g., res.data.content
      articles.value = res.data.content || res.data;
    } else {
      articles.value = [];
    }
  } catch (error) {
    console.error('获取文章列表失败', error);
    articles.value = [];
  }
};

onMounted(() => {
  fetchArticles();
});
</script>

<style scoped>
.article-list-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
</style>
