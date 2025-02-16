<template>
  <div class="layout">
    <div class="layout__container">
      <div class="layout__content">
        <aside class="layout__menu">
          <SideMenu />
        </aside>

        <main class="layout__main">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SideMenu from '@/components/SideMenu.vue'
</script>

<style scoped lang="scss">
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout__header {
  background-color: #eee;
  padding: 16px;
}

.layout__logo {
  text-decoration: none;
  color: black;
}

.layout__content {
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
}

.layout__menu {
  width: 100%;
  border-bottom: 1px solid #ccc;

  @media (min-width: 768px) {
    width: 200px;
    border-bottom: none;
    border-right: 1px solid #ccc;
  }
}

.layout__main {
  flex: 1;

  @media (min-width: 768px) {
    padding: 16px;
  }
}

.layout__container {
  width: 100%;
  margin: 0 auto;
  padding: 16px;

  @media (min-width: 1024px) {
    max-width: 1024px;
  }
}
</style>
