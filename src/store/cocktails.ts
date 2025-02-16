import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, type Ref } from 'vue'
import type { Drink } from '@/store/cocktails.types'
import { availableCodes } from '@/consts'

export type CocktailCode = typeof availableCodes[number]

interface CocktailsResponse {
  drinks: Drink[] | null
}

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

      const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${ code }`
      const response = await axios.get<CocktailsResponse>(url)
      const drinks = response.data.drinks ?? []

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
    return cocktailsMapRef.value.get(code) ?? []
  }

  function isValidCocktailCode(code: string): code is CocktailCode {
    return (availableCodes as readonly string[]).includes(code)
  }

  return {
    cocktailsMapRef,
    isLoading,
    errorMessage,

    fetchCocktailsByCode,
    getCocktails
  }
})
