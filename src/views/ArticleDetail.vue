<template>
  <div class="home-page">
    <!-- 欢迎区域 -->
    <section class="hero">
      <div class="hero-content">
        <h1>欢迎来到我的个人博客</h1>
        <p>记录生活，分享知识，交流思想</p>
        <router-link to="/articles" class="btn-explore">浏览文章</router-link>
      </div>
    </section>

    <!-- 最新文章 -->
    <section class="latest-articles">
      <h2>最新文章</h2>
      <div class="articles-grid">
        <ArticleCard
            v-for="article in latestArticles"
            :key="article.id"
            :article="article"
        />
      </div>
      <div class="view-all">
        <router-link to="/articles">查看全部 →</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ArticleCard from '@/components/common/ArticleCard.vue'
import { getArticleList } from '@/services/article'

const latestArticles = ref([])

// 获取最新的5篇文章
const fetchLatestArticles = async () => {
  try {
    const res = await getArticleList({ page: 0, size: 5 })
    latestArticles.value = res.data || []
  } catch (error) {
    console.error('获取最新文章失败', error)
  }
}

onMounted(() => {
  fetchLatestArticles()
})
</script>

<style scoped>
.hero {
  background-color: #f5f7fa;
  padding: 4rem 2rem;
  text-align: center;
  margin-bottom: 3rem;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.hero p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.btn-explore {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: #409eff;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s;
}

.btn-explore:hover {
  background-color: #3088e6;
}

.latest-articles {
  max-width: 1200px;
  margin: 0 auto;
}

.latest-articles h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333;
  border-bottom: 2px solid #409eff;
  padding-bottom: 0.5rem;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.view-all {
  text-align: right;
}

.view-all a {
  color: #409eff;
  text-decoration: none;
  font-weight: 500;
}

.view-all a:hover {
  text-decoration: underline;
}
</style>
