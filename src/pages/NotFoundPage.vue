<template>
  <div class="not-found-page">
    <h1>404 - Страница не найдена</h1>
    <p>Упс! Кажется, вы забрели не туда.</p>
    <router-link to="/">Вернуться на главную</router-link>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.not-found-page {
  max-width: 1024px;
  margin: 0 auto;
  padding: 16px;
}
</style>
