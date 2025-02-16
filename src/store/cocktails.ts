import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, type Ref } from 'vue'
import { availableCodes } from '@/consts'
import type {
  Drink,
  ICocktailsResponse,
  IngredientPair,
  IRawCocktailDrink,
} from '@/types/cocktails.ts'

const BASE_URL =
  import.meta.env.VITE_COCKTAILS_API_BASE_URL ||
  'https://www.thecocktaildb.com/api/json/v1/1'

export type CocktailCode = (typeof availableCodes)[number]

export const useCocktailsStore = defineStore('cocktails', () => {
  const cocktailsMapRef: Ref<Map<CocktailCode, Drink[]>> = ref(new Map())

  const isLoading = ref(false)

  const errorMessage = ref<string | null>(null)

  async function fetchCocktailsByCode(code: string): Promise<void> {
    if (!isValidCocktailCode(code)) {
      errorMessage.value = 'Несуществующий код коктейля'
      return
    }

    if (cocktailsMapRef.value.has(code)) {
      return
    }

    try {
      isLoading.value = true
      errorMessage.value = null

      const url = `${BASE_URL}/search.php?s=${code}`
      const response = await axios.get<ICocktailsResponse>(url)
      const drinks = response.data.drinks?.map(formatDrink) ?? []

      cocktailsMapRef.value.set(code, drinks)
    } catch (e: unknown) {
      console.error(e)
      errorMessage.value = 'Ошибка при загрузке данных'
    } finally {
      isLoading.value = false
    }
  }

  function getCocktails(code: string): Drink[] {
    if (!isValidCocktailCode(code)) {
      return []
    }
    return cocktailsMapRef.value.get(code as CocktailCode) ?? []
  }

  function isValidCocktailCode(code: string): code is CocktailCode {
    return (availableCodes as readonly string[]).includes(code)
  }

  function formatDrink(drink: IRawCocktailDrink): Drink {
    return {
      idDrink: drink.idDrink,
      strDrink: drink.strDrink,
      strDrinkAlternate: drink.strDrinkAlternate ?? null,
      strTags: drink.strTags ?? null,
      strVideo: drink.strVideo ?? null,
      strCategory: drink.strCategory ?? null,
      strIBA: drink.strIBA ?? null,
      strAlcoholic: drink.strAlcoholic ?? null,
      strGlass: drink.strGlass ?? null,
      strInstructions: drink.strInstructions ?? null,
      strInstructionsES: drink.strInstructionsES ?? null,
      strInstructionsDE: drink.strInstructionsDE ?? null,
      strInstructionsFR: drink.strInstructionsFR ?? null,
      strInstructionsIT: drink.strInstructionsIT ?? null,
      strInstructionsZH_HANS: drink.strInstructionsZH_HANS ?? null,
      strInstructionsZH_HANT: drink.strInstructionsZH_HANT ?? null,
      strDrinkThumb: drink.strDrinkThumb ?? null,
      strImageSource: drink.strImageSource ?? null,
      strImageAttribution: drink.strImageAttribution ?? null,
      strCreativeCommonsConfirmed: drink.strCreativeCommonsConfirmed ?? null,
      dateModified: drink.dateModified ?? null,
      ingredients: parseIngredients(drink),
    }
  }

  function parseIngredients(rawDrink: IRawCocktailDrink): IngredientPair[] {
    const keys = Object.keys(rawDrink) as (keyof IRawCocktailDrink)[]

    const ingredientKeys = keys.filter((key) => key.startsWith('strIngredient'))
    const measureKeys = keys.filter((key) => key.startsWith('strMeasure'))

    const hasMismatch = ingredientKeys.length !== measureKeys.length

    if (hasMismatch) {
      console.warn('Количество ингредиентов и пропорций не совпадает.')
    }

    return ingredientKeys
      .map((ingredientKey, index) => {
        const measureKey = measureKeys[index]
        const ingredient = rawDrink[ingredientKey]
        const measure = rawDrink[measureKey]

        const hasIngredient = Boolean(ingredient)
        const hasMeasure = Boolean(measure)

        const missingIngredient = !hasIngredient && hasMeasure
        const missingMeasure = hasIngredient && !hasMeasure

        if (missingIngredient) {
          console.error(`Пропущен ингредиент для пропорции #${index + 1}`)
          return null
        }

        if (missingMeasure) {
          console.warn(`Пропущена пропорция для ингредиента #${index + 1}`)
        }

        return hasIngredient ? { ingredient, measure: measure ?? null } : null
      })
      .filter((item) => {
        return item !== null
      }) as IngredientPair[]
  }

  return {
    // Состояния
    cocktailsMapRef,
    isLoading,
    errorMessage,

    // Запросы
    fetchCocktailsByCode,
    getCocktails,
  }
})
