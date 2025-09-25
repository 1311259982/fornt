<template>
  <div>
    <h2>文章详情</h2>
    <p>正在查看 ID 为 <strong>{{ $route.params.id }}</strong> 的文章。</p>
    <div class="content-placeholder">
      <h3>文章标题占位符</h3>
      <p>这里是文章的完整内容。目前为静态调试模式。</p>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

// Accessing route params in script setup (optional, as it's used in template directly)
const route = useRoute();
console.log('Current Article ID:', route.params.id);
</script>

<style scoped>
.content-placeholder {
  background: white;
  padding: 2rem;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-top: 1rem;
}
h3 { margin-bottom: 1rem; }
</style>
