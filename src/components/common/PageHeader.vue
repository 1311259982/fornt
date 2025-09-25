<template>
  <div class="page-header">
    <el-button 
      class="back-button" 
      @click="goBack" 
      circle 
      :icon="ArrowLeftBold"
    />
    <h2 class="page-title">{{ title }}</h2>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ArrowLeftBold } from '@element-plus/icons-vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
});

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.page-title {
  font-size: 1.8rem;
  color: #333;
  margin: 0; /* Reset default h2 margin */
}

.back-button {
  /* Optional: Adjust size or style if needed */
}
</style>
