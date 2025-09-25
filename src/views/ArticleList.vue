<template>
  <div>
    <h2>文章列表</h2>
    <p>这里将显示所有文章。目前为静态调试模式。</p>
    <!-- In a real scenario, you would loop over articles here -->
    <div class="article-placeholder">
      <p><strong>文章标题示例</strong></p>
      <p>这是一个文章摘要的占位符...</p>
    </div>
    <div class="article-placeholder">
      <p><strong>另一个很棒的文章</strong></p>
      <p>这是另一个文章摘要的占位符...</p>
    </div>
  </div>
</template>

<script setup>
// No API calls in this phase
</script>

<style scoped>
.article-placeholder {
  background: white;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-top: 1rem;
}
</style>
