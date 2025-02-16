export interface IngredientMeasure {
  ingredient?: string | null
  measure?: string | null
}

export interface IRawCocktailDrink {
  idDrink: string
  strDrink: string
  strDrinkAlternate?: string | null
  strTags?: string | null
  strVideo?: string | null
  strCategory: string
  strIBA?: string | null
  strAlcoholic: 'Alcoholic' | 'Non alcoholic' | 'Optional alcohol'
  strGlass: string
  strInstructions: string
  strInstructionsES?: string | null
  strInstructionsDE?: string | null
  strInstructionsFR?: string | null
  strInstructionsIT?: string | null
  strInstructionsZH_HANS?: string | null
  strInstructionsZH_HANT?: string | null
  strDrinkThumb: string
  strImageSource?: string | null
  strImageAttribution?: string | null
  strCreativeCommonsConfirmed?: 'Yes' | 'No' | null
  dateModified?: string | null

  [key: string]: string | null | undefined
  [key: `strIngredient${number}`]: string | null | undefined
  [key: `strMeasure${number}`]: string | null | undefined
}

export interface ICocktailsResponse {
  drinks: IRawCocktailDrink[]
}

export interface IngredientPair {
  ingredient: string
  measure: string | null
}

export interface Drink {
  idDrink: string
  strDrink: string
  strDrinkAlternate: string | null
  strTags: string | null
  strVideo: string | null
  strCategory: string | null
  strIBA: string | null
  strAlcoholic: string | null
  strGlass: string | null
  strInstructions: string | null
  strInstructionsES: string | null
  strInstructionsDE: string | null
  strInstructionsFR: string | null
  strInstructionsIT: string | null
  strInstructionsZH_HANS: string | null
  strInstructionsZH_HANT: string | null
  strDrinkThumb: string | null
  strImageSource: string | null
  strImageAttribution: string | null
  strCreativeCommonsConfirmed: string | null
  dateModified: string | null

  ingredients: IngredientPair[]
}
