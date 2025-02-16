<template>
  <nav class="side-menu">
    <ul class="side-menu__list">
      <li v-for="code in codes" :key="code" :class="['side-menu__item']">
        <router-link
          active-class="side-menu__link--active"
          :to="`/${code}`"
          class="side-menu__link"
        >
          {{ code.toUpperCase() }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { availableCodes } from '@/consts'
const codes = availableCodes
</script>

<style lang="scss" scoped>
.side-menu__list {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (min-width: 768px) {
    flex-direction: column;
  }
}

.side-menu__link {
  text-decoration: none;
  color: inherit;
  display: inline-block;
  padding: 8px;
  width: 100%;

  &--active {
    background-color: #ddd;
  }
}
</style>
