import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, type Ref } from 'vue'
import type {
  Drink,
  ICocktailsResponse,
  IngredientPair,
  IRawCocktailDrink,
} from '@/store/cocktails.types'
import { availableCodes } from '@/consts'

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

      const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${code}`
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

  // Превращаем сырой ответ в удобный формат
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
    const typedDrink = rawDrink as Record<string, string | null | undefined>

    const ingredientMap: Record<
      string,
      { ingredient?: string | null; measure?: string | null }
    > = {}

    for (const fieldName in typedDrink) {
      const fieldValue = typedDrink[fieldName]
      const isEmptyValue = !fieldValue
      if (isEmptyValue) {
        continue
      }

      const isIngredientKey = fieldName.startsWith('strIngredient')
      const isMeasureKey = fieldName.startsWith('strMeasure')

      if (isIngredientKey) {
        const suffix = fieldName.slice('strIngredient'.length)
        ingredientMap[suffix] ??= {}
        ingredientMap[suffix].ingredient = fieldValue
      } else if (isMeasureKey) {
        const suffix = fieldName.slice('strMeasure'.length)
        ingredientMap[suffix] ??= {}
        ingredientMap[suffix].measure = fieldValue
      }
    }

    const ingredientPairs: IngredientPair[] = []

    // Я возможно слишком увлекся в отрицательные кейсы
    for (const suffix of Object.keys(ingredientMap)) {
      const { ingredient, measure } = ingredientMap[suffix]

      const hasIngredient = Boolean(ingredient)
      const hasMeasure = Boolean(measure)

      if (!hasIngredient && hasMeasure) {
        console.error(`Пропущен ингредиент для пропорции #${suffix}`)
        continue
      }

      if (hasIngredient && !hasMeasure) {
        console.warn(`Пропущена пропорция для ингредиента #${suffix}`)
      }

      if (!hasIngredient) {
        continue
      }

      ingredientPairs.push({
        ingredient: ingredient as string, // точно не null, раз hasIngredient true
        measure: measure ?? null,
      })
    }

    return ingredientPairs
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
