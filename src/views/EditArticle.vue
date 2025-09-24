<template>
  <div class="article-form-page">
    <el-loading v-loading="loading" target=".el-card">
      <el-card>
        <el-form
            :model="form"
            :rules="rules"
            ref="formRef"
            label-width="80px"
        >
          <el-form-item label="标题" prop="title">
            <el-input
                v-model="form.title"
                placeholder="请输入文章标题"
                maxlength="100"
                show-word-limit
            ></el-input>
          </el-form-item>

          <el-form-item label="分类" prop="categoryId">
            <el-select
                v-model="form.categoryId"
                placeholder="请选择分类"
            >
              <el-option
                  v-for="category in categories"
                  :key="category.id"
                  :label="category.name"
                  :value="category.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="标签" prop="tags">
            <el-input
                v-model="form.tags"
                placeholder="请输入标签，用逗号分隔"
            ></el-input>
            <div class="form-hint">提示：多个标签用英文逗号分隔</div>
          </el-form-item>

          <el-form-item label="内容" prop="content">
            <el-input
                v-model="form.content"
                type="textarea"
                placeholder="请输入文章内容"
                rows="15"
            ></el-input>
          </el-form-item>

          <el-form-item label="发布状态">
            <el-radio-group v-model="form.isPublished">
              <el-radio :label="true">已发布</el-radio>
              <el-radio :label="false">草稿</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleSubmit">保存修改</el-button>
            <el-button @click="handleCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-loading>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getArticleDetail, updateArticle } from '@/services/article'
import { getCategories } from '@/services/category'
import { ElMessage } from 'element-plus'

const formRef = ref(null)
const route = useRoute()
const router = useRouter()
const loading = ref(true)
const categories = ref([])
const articleId = ref(route.params.id)

// 表单数据
const form = reactive({
  title: '',
  content: '',
  categoryId: '',
  tags: '',
  isPublished: true
})

// 表单验证规则
const rules = {
  title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' },
    { min: 3, max: 100, message: '标题长度在3-100个字符之间', trigger: 'blur' }
  ],
  categoryId: [
    { required: true, message: '请选择分类', trigger: 'change' }
  ],
  content: [
    { required: true, message: '请输入文章内容', trigger: 'blur' },
    { min: 10, message: '内容不能少于10个字符', trigger: 'blur' }
  ]
}

// 获取文章详情
const fetchArticleDetail = async () => {
  try {
    const res = await getArticleDetail(articleId.value)
    const article = res.data || {}

    // 填充表单数据
    form.title = article.title || ''
    form.content = article.content || ''
    form.categoryId = article.categoryId || ''
    form.isPublished = article.isPublished !== undefined ? article.isPublished : true

    // 标签数组转为逗号分隔的字符串
    form.tags = article.tags ? article.tags.join(',') : ''
  } catch (error) {
    ElMessage.error('获取文章详情失败')
    console.error(error)
    router.back()
  } finally {
    loading.value = false
  }
}

// 获取分类列表
const fetchCategories = async () => {
  try {
    const res = await getCategories()
    categories.value = res.data || []
  } catch (error) {
    ElMessage.error('获取分类失败')
    console.error(error)
  }
}

// 提交修改
const handleSubmit = async () => {
  try {
    await formRef.value.validate()

    // 处理标签格式：转为数组
    const tagsArray = form.tags
        ? form.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        : []

    // 构造提交数据
    const articleData = {
      ...form,
      tags: tagsArray
    }

    // 调用更新文章接口
    await updateArticle(articleId.value, articleData)
    ElMessage.success('文章更新成功')
    router.push(`/articles/${articleId.value}`)
  } catch (error) {
    // 表单验证失败不处理
  }
}

// 取消操作
const handleCancel = () => {
  router.back()
}

// 页面加载时获取数据
onMounted(() => {
  fetchCategories()
  fetchArticleDetail()
})
</script>

<style scoped>
.article-form-page {
  max-width: 1000px;
  margin: 0 auto;
}

.el-card {
  padding: 20px;
}

.form-hint {
  color: #666;
  font-size: 0.85rem;
  margin-top: 5px;
}

.el-form-item {
  margin-bottom: 20px;
}
</style>
