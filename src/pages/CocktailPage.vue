<template>
  <div class="cocktail-page">
    <div v-if="errorMessage" class="cocktail-page__error">
      {{ errorMessage }}
    </div>

    <div v-else-if="isLoading" class="cocktail-page__loading">Загрузка...</div>

    <div v-else>
      <h1 class="cocktail-page__title">
        {{ cocktailCode.toUpperCase() }} cocktails
      </h1>

      <div class="cocktail-page__list">
        <CocktailCard
          v-for="drink in cocktails"
          :key="drink.idDrink"
          :drink="drink"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCocktailsStore } from '@/store/cocktails'
import CocktailCard from '@/components/CocktailCard.vue'

const route = useRoute()
const store = useCocktailsStore()

const cocktailCode = computed(() => route.params.cocktailCode as string)

watch(
  () => cocktailCode.value,
  (newVal) => {
    const drinks = store.getCocktails(newVal)
    if (drinks.length === 0) {
      store.fetchCocktailsByCode(newVal)
    }
  },
  { immediate: true },
)

const cocktails = computed(() => store.getCocktails(cocktailCode.value))

const isLoading = computed(() => store.isLoading)
const errorMessage = computed(() => store.errorMessage)
</script>

<style scoped lang="scss">
.cocktail-page {
  width: 100%;
  max-width: 100%;
  margin: 0;

  @media (min-width: 768px) {
    max-width: 768px;
    margin: 0 auto;
  }

  @media (min-width: 1024px) {
    max-width: 1024px;
  }
}

.cocktail-page__error {
  color: red;
  padding: 16px;
}

.cocktail-page__loading {
  padding: 16px;
}

.cocktail-page__title {
  margin-bottom: 16px;
}

.cocktail-page__list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
