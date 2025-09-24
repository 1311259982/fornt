<template>
  <!-- 路由出口：所有页面通过路由规则在此渲染 -->
  <router-view />
</template>

<script setup>
// 根组件无需额外逻辑，仅作为路由容器
</script>

<style>
/* 全局基础样式（作用于整个应用） */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
  background-color: #f9f9f9;
  min-height: 100vh;
}

/* 全局链接样式统一 */
a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  color: #409eff; /* Element Plus 主题色，保持一致性 */
}
</style>
