<template>
  <div>
    <PageHeader title="个人主页" />
    <el-tabs v-model="activeTab">
      <!-- 已发布文章 -->
      <el-tab-pane label="已发布" name="published">
        <div v-if="publishedArticles.length > 0" class="article-manage-list">
          <div v-for="article in publishedArticles" :key="article.id" class="list-item">
            <router-link :to="`/articles/${article.id}`" class="item-title">{{ article.title }}</router-link>
            <div class="item-actions">
              <span class="item-date">发布于: {{ new Date(article.createdAt).toLocaleDateString() }}</span>
              <el-button size="small" @click="editArticle(article.id)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleDeleteArticle(article.id)">删除</el-button>
            </div>
          </div>
        </div>
        <el-empty v-else description="您还没有发布任何文章" />
      </el-tab-pane>

      <!-- 草稿箱 -->
      <el-tab-pane label="草稿箱" name="drafts">
        <div v-if="draftArticles.length > 0" class="article-manage-list">
          <div v-for="article in draftArticles" :key="article.id" class="list-item">
            <span class="item-title">{{ article.title }}</span>
            <div class="item-actions">
              <span class="item-date">保存于: {{ new Date(article.createdAt).toLocaleDateString() }}</span>
              <el-button size="small" @click="editArticle(article.id)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleDeleteArticle(article.id)">删除</el-button>
            </div>
          </div>
        </div>
        <el-empty v-else description="您的草稿箱是空的" />
      </el-tab-pane>

      <!-- 收到的评论 (占位符) -->
      <el-tab-pane label="收到的评论" name="received_comments">
        <el-alert
          title="功能待开发"
          type="info"
          description="管理您文章收到的评论的功能正在开发中，敬请期待。"
          :closable="false"
          show-icon
        />
      </el-tab-pane>

      <!-- 我发表的评论 (占位符) -->
      <el-tab-pane label="我发表的评论" name="my_comments">
        <el-alert
          title="功能待开发"
          type="info"
          description="管理您在他人文章下发表的评论的功能正在开发中，敬请期待。"
          :closable="false"
          show-icon
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/modules/user';
import { getArticlesByUserId, deleteArticle } from '@/services/article';
import { ElMessage, ElMessageBox } from 'element-plus';
import PageHeader from '@/components/common/PageHeader.vue';

const router = useRouter();
const userStore = useUserStore();

const allArticles = ref([]);
const activeTab = ref('published');

// 计算属性：筛选已发布的文章
const publishedArticles = computed(() => 
  allArticles.value.filter(article => article.isPublished)
);

// 计算属性：筛选草稿
const draftArticles = computed(() => 
  allArticles.value.filter(article => !article.isPublished)
);

// 获取用户文章
const fetchUserArticles = async () => {
  if (!userStore.id) return;
  try {
    const res = await getArticlesByUserId(userStore.id);
    allArticles.value = res.data || [];
  } catch (error) {
    console.error('获取用户文章失败', error);
    ElMessage.error('加载您的文章失败');
  }
};

// 编辑文章
const editArticle = (articleId) => {
  router.push(`/articles/edit/${articleId}`);
};

// 删除文章
const handleDeleteArticle = async (articleId) => {
  try {
    await ElMessageBox.confirm('您确定要永久删除这篇文章吗？此操作不可撤销。', '确认删除', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });

    await deleteArticle(articleId);
    ElMessage.success('文章已删除');
    // 重新加载文章列表以更新UI
    fetchUserArticles();

  } catch (error) {
    // 如果用户点击取消，ElMessageBox会抛出一个 'cancel' 字符串，我们不需要处理它
    if (error !== 'cancel') {
      console.error('删除文章失败', error);
      ElMessage.error('删除失败');
    }
  }
};

onMounted(() => {
  fetchUserArticles();
});
</script>

<style scoped>
.article-manage-list .list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.list-item:hover {
  background-color: #f9f9f9;
}

.item-title {
  font-size: 1.1rem;
  color: #333;
  text-decoration: none;
  transition: color 0.3s;
}

.item-title:hover {
  color: #409eff;
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.item-date {
  font-size: 0.9rem;
  color: #999;
}
</style>
