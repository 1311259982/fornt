<template>
  <div>
    <PageHeader title="个人主页" />
    <el-tabs v-model="activeTab">
      <!-- 已发布文章 -->
      <el-tab-pane label="已发布" name="published">
        <div v-if="publishedArticles.length > 0" class="article-manage-list">
          <div v-for="article in publishedArticles" :key="article.id" class="list-item">
            <div class="item-main">
              <router-link :to="`/articles/${article.id}`" class="item-title">{{ article.title }}</router-link>
              <div class="item-meta">
                <span class="meta-item">最后更新: {{ new Date(article.updatedAt).toLocaleDateString() }}</span>
                <span class="meta-item">浏览: {{ article.views || 0 }}</span>
              </div>
            </div>
            <div class="item-actions">
              <el-button size="small" @click="editArticle(article.id, false)">编辑</el-button>
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
            <div class="item-main">
              <router-link :to="{ path: `/articles/edit/${article.id}`, query: { from: 'draft' } }" class="item-title-draft">{{ article.title }}</router-link>
              <div class="item-meta">
                <span class="meta-item">保存于: {{ new Date(article.createdAt).toLocaleDateString() }}</span>
              </div>
            </div>
            <div class="item-actions">
              <el-button size="small" type="success" @click="handlePublishDraft(article.id)">发布</el-button>
              <el-button size="small" @click="editArticle(article.id, true)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleDeleteArticle(article.id)">删除</el-button>
            </div>
          </div>
        </div>
        <el-empty v-else description="您的草稿箱是空的" />
      </el-tab-pane>

      <!-- ... other tabs ... -->
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/modules/user';
import { getMyArticles, deleteArticle, publishDraft } from '@/services/article';
import { ElMessage, ElMessageBox } from 'element-plus';
import PageHeader from '@/components/common/PageHeader.vue';

const router = useRouter();
const userStore = useUserStore();

const allUserArticles = ref([]);
const activeTab = ref('published');

const isArticlePublished = (article) => {
  return [true, 'true', 1, '1'].includes(article.isPublished);
};

const publishedArticles = computed(() => 
  allUserArticles.value.filter(article => isArticlePublished(article))
);

const draftArticles = computed(() => 
  allUserArticles.value.filter(article => !isArticlePublished(article))
);

const fetchUserArticles = async () => {
  if (!userStore.id) return;
  try {
    const res = await getMyArticles();
    allUserArticles.value = res.data || [];
  } catch (error) {
    console.error('获取用户文章失败', error);
    ElMessage.error('加载您的文章失败');
  }
};

// REFACTORED: editArticle now accepts a flag to determine the source
const editArticle = (articleId, isDraft = false) => {
  const route = {
    path: `/articles/edit/${articleId}`,
  };
  if (isDraft) {
    route.query = { from: 'draft' };
  }
  router.push(route);
};

const handlePublishDraft = async (articleId) => {
  try {
    await ElMessageBox.confirm('您确定要发布这篇草稿吗？', '确认发布', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'info',
    });

    const res = await publishDraft(articleId);
    if (res && res.code === 200) {
        ElMessage.success('草稿已发布');
        fetchUserArticles();
    } else {
        ElMessage.error(res.msg || '发布失败');
    }

  } catch (error) {
    if (error !== 'cancel') {
      console.error('发布草稿失败', error);
      ElMessage.error('发布失败');
    }
  }
};

const handleDeleteArticle = async (articleId) => {
  try {
    await ElMessageBox.confirm('您确定要永久删除这篇文章吗？此操作不可撤销。', '确认删除', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });

    await deleteArticle(articleId);
    ElMessage.success('文章已删除');
    fetchUserArticles();

  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除文章失败', error);
      ElMessage.error('删除失败');
    }
  }
};

watchEffect(() => {
  if (userStore.id) {
    fetchUserArticles();
  }
});

</script>

<style scoped>
/* ... styles ... */
.article-manage-list .list-item { display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid #f0f0f0; }
.list-item:hover { background-color: #f9f9f9; }
.item-main { display: flex; flex-direction: column; gap: 0.5rem; }
.item-title { font-size: 1.1rem; color: #333; text-decoration: none; font-weight: 500; transition: color 0.3s; }
.item-title:hover { color: #409eff; }
.item-title-draft { font-size: 1.1rem; color: #606266; text-decoration: none; font-weight: 500; transition: color 0.3s; }
.item-title-draft:hover { color: #409eff; }
.item-meta { display: flex; gap: 1rem; font-size: 0.9rem; color: #999; }
.item-actions { display: flex; align-items: center; gap: 1rem; }
</style>
