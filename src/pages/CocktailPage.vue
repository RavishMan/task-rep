<template>
  <div class="cocktail-page">
    <div v-if="error" class="cocktail-page__error">{{ error }}</div>

    <div v-else-if="loading" class="cocktail-page__loading">Загрузка...</div>

    <div v-else>
      <h1 class="cocktail-page__title">
        {{ cocktailCode.toUpperCase() }} cocktails
      </h1>

      <div class="cocktail-page__list">
        <div
          v-for="drink in cocktails"
          :key="drink.idDrink"
          class="cocktail-page__item"
        >
          <div class="cocktail-page__info">
            <h2 class="cocktail-page__info-title">{{ drink.strDrink }}</h2>

            <dl class="cocktail-page__details">
              <dt class="cocktail-page__details-label">Category</dt>
              <dd class="cocktail-page__details-value">
                {{ drink.strCategory }}
              </dd>

              <dt class="cocktail-page__details-label">Glass</dt>
              <dd class="cocktail-page__details-value">
                {{ drink.strGlass }}
              </dd>

              <dt class="cocktail-page__details-label">Type</dt>
              <dd class="cocktail-page__details-value">
                {{ drink.strAlcoholic }}
              </dd>

              <dt class="cocktail-page__details-label">Instructions</dt>
              <dd class="cocktail-page__details-value">
                {{ drink.strInstructions }}
              </dd>
            </dl>

            <div class="cocktail-page__ingredients">
              <h3 class="cocktail-page__ingredients-heading">Ingredients:</h3>
              <ul class="cocktail-page__ingredients-list">
                <li
                  v-for="(ing, idx) in getIngredients(drink)"
                  :key="idx"
                >
                  {{ ing }}
                </li>
              </ul>
            </div>
          </div>
          <img
            :src="drink.strDrinkThumb"
            :alt="drink.strDrink"
            loading="lazy"
            class="cocktail-page__thumb"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCocktailsStore } from '@/store/cocktails'

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
  { immediate: true }
)

const cocktails = computed(() => store.getCocktails(cocktailCode.value))

function getIngredients(drink: Record<string, any>) {
  const ingredients: string[] = []

  for (const key of Object.keys(drink)) {
    if (key.startsWith('strIngredient') && drink[key]) {
      const index = key.replace('strIngredient', '')
      const measureKey = `strMeasure${index}`
      const measure = drink[measureKey] || ''
      ingredients.push(`${drink[key]}${measure ? ' - ' + measure : ''}`)
    }
  }

  return ingredients
}

const loading = computed(() => store.loading)
const error = computed(() => store.error)
</script>

<style lang="scss" scoped>
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

.cocktail-page__item {
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid #ccc;
  padding: 16px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
}

.cocktail-page__thumb {
  width: 100%;
  max-width: 300px;
  height: auto;
  object-fit: cover;
  align-self: center;

  @media (min-width: 768px) {
    width: 200px;
    max-width: none;
    align-self: start;
  }
}

.cocktail-page__info {
  width: 100%;

  @media (min-width: 768px) {
    flex: 1;
  }
}

.cocktail-page__info-title {
  margin-top: 0;
}

.cocktail-page__details {
  margin-top: 8px;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 8px;
  row-gap: 4px;
}

.cocktail-page__details-label {
  font-weight: bold;
}

.cocktail-page__ingredients {
  margin-top: 16px;
}

.cocktail-page__ingredients-heading {
  margin-bottom: 8px;
}

.cocktail-page__ingredients-list {
  padding-left: 20px;
}
</style>
