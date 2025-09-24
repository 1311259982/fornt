<!-- src/views/ArticleList.vue -->
<template>
  <div class="article-list-page">
    <div class="filter-bar">
      <el-select v-model="categoryId" placeholder="选择分类" @change="handleFilterChange">
        <el-option label="全部" value=""></el-option>
        <!-- 分类选项 -->
      </el-select>
      <el-input v-model="tagName" placeholder="输入标签" @change="handleFilterChange"></el-input>
      <el-button type="primary" @click="handleFilterChange">筛选</el-button>
    </div>

    <div class="article-card" v-for="article in articles" :key="article.id">
      <h3 class="article-title">
        <router-link :to="`/articles/${article.id}`">{{ article.title }}</router-link>
      </h3>
      <p class="article-meta">
        发布时间: {{ formatDate(article.createdAt) }} |
        浏览量: {{ article.views }}
      </p>
      <p class="article-excerpt">{{ article.content.substring(0, 100) }}...</p>
      <div class="article-actions">
        <router-link :to="`/articles/${article.id}`" class="read-more">阅读全文</router-link>
        <template v-if="isAuthor(article.userId)">
          <el-button type="text" :to="`/articles/edit/${article.id}`">编辑</el-button>
          <el-button type="text" danger @click="deleteArticle(article.id)">删除</el-button>
        </template>
      </div>
    </div>

    <el-pagination
        :current-page="page"
        :page-size="size"
        :total="total"
        @current-change="handlePageChange"
        layout="prev, pager, next"
    ></el-pagination>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getArticleList, deleteArticle } from '@/services/article';
import { useStore } from '@/store';
import { formatDate } from '@/utils/date';
import { ElMessage } from 'element-plus';

const page = ref(0);
const size = ref(10);
const categoryId = ref('');
const tagName = ref('');
const articles = ref([]);
const total = ref(0);
const store = useStore();

const isAuthor = (userId) => {
  return store.state.user.id === userId;
};

const fetchArticles = async () => {
  try {
    const response = await getArticleList({
      page: page.value,
      size: size.value,
      categoryId: categoryId.value,
      tagName: tagName.value
    });
    articles.value = response.data;
    // 实际项目中需要后端返回总数
    total.value = 100;
  } catch (error) {
    ElMessage.error('获取文章列表失败');
  }
};

const handlePageChange = (newPage) => {
  page.value = newPage - 1; // 后端页码从0开始
  fetchArticles();
};

const handleFilterChange = () => {
  page.value = 0;
  fetchArticles();
};

const handleDelete = async (id) => {
  try {
    await deleteArticle(id);
    ElMessage.success('删除成功');
    fetchArticles();
  } catch (error) {
    ElMessage.error('删除失败');
  }
};

onMounted(() => {
  fetchArticles();
});
</script>

<style scoped>
.filter-bar {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}
.article-card {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 20px;
  transition: box-shadow 0.3s;
}
.article-card:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
.article-title {
  margin: 0 0 10px 0;
}
.article-title a {
  color: #333;
  text-decoration: none;
}
.article-title a:hover {
  color: #409eff;
}
.article-meta {
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
}
.article-excerpt {
  color: #333;
  margin-bottom: 15px;
}
.article-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.read-more {
  color: #409eff;
  text-decoration: none;
}
</style>