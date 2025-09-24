<template>
  <div class="article-form-page">
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
            <el-radio :label="true">立即发布</el-radio>
            <el-radio :label="false">保存为草稿</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { createArticle } from '@/services/article'
import { getCategories } from '@/services/category'
import { ElMessage } from 'element-plus'

const formRef = ref(null)
const router = useRouter()
const categories = ref([])

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

// 提交表单
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

    // 调用创建文章接口
    await createArticle(articleData)
    ElMessage.success(form.isPublished ? '文章发布成功' : '草稿保存成功')
    router.push('/articles')
  } catch (error) {
    // 表单验证失败不处理
  }
}

// 取消操作
const handleCancel = () => {
  router.back()
}

// 页面加载时获取分类
onMounted(() => {
  fetchCategories()
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
