<template>
  <div class="cocktail-card">
    <!-- Левая (или верхняя) часть с описанием -->
    <div class="cocktail-card__info">
      <h2 class="cocktail-card__title">{{ drink.strDrink }}</h2>

      <dl class="cocktail-card__details">
        <dt class="cocktail-card__details-label">Category</dt>
        <dd class="cocktail-card__details-value">{{ drink.strCategory }}</dd>

        <dt class="cocktail-card__details-label">Glass</dt>
        <dd class="cocktail-card__details-value">{{ drink.strGlass }}</dd>

        <dt class="cocktail-card__details-label">Type</dt>
        <dd class="cocktail-card__details-value">{{ drink.strAlcoholic }}</dd>

        <dt class="cocktail-card__details-label">Instructions</dt>
        <dd class="cocktail-card__details-value">
          {{ drink.strInstructions }}
        </dd>
      </dl>

      <div class="cocktail-card__ingredients">
        <h3 class="cocktail-card__ingredients-heading">Ingredients:</h3>
        <ul class="cocktail-card__ingredients-list">
          <li
            v-for="({ ingredient, measure }, idx) in drink.ingredients"
            :key="idx"
          >
            {{ ingredient }}
            <template v-if="measure"> - {{ measure }} </template>
          </li>
        </ul>
      </div>
    </div>

    <img
      v-if="drink.strDrinkThumb"
      class="cocktail-card__thumb"
      :src="drink.strDrinkThumb"
      :alt="drink.strDrink"
      loading="lazy"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Drink } from '@/types/cocktails.ts'

defineProps<{
  drink: Drink
}>()
</script>

<style scoped lang="scss">
.cocktail-card {
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

.cocktail-card__info {
  width: 100%;

  @media (min-width: 768px) {
    flex: 1;
  }
}

.cocktail-card__title {
  margin-top: 0;
}

.cocktail-card__details {
  margin-top: 8px;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 8px;
  row-gap: 4px;
}

.cocktail-card__details-label {
  font-weight: bold;
}

.cocktail-card__ingredients {
  margin-top: 16px;
}

.cocktail-card__ingredients-heading {
  margin-bottom: 8px;
}

.cocktail-card__ingredients-list {
  padding-left: 20px;
}

.cocktail-card__thumb {
  width: 100%;
  max-width: 300px;
  height: auto;
  object-fit: cover;
  align-self: center;

  @media (min-width: 768px) {
    width: 200px;
    max-width: none;
    align-self: flex-start;
  }
}
</style>
