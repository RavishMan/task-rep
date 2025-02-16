export interface IngredientMeasure {
  ingredient?: string | null;
  measure?: string | null;
}

export interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate?: string | null;
  strTags?: string | null;
  strVideo?: string | null;
  strCategory: string;
  strIBA?: string | null;
  strAlcoholic: "Alcoholic" | "Non alcoholic" | "Optional alcohol";
  strGlass: string;
  strInstructions: string;
  strInstructionsES?: string | null;
  strInstructionsDE?: string | null;
  strInstructionsFR?: string | null;
  strInstructionsIT?: string | null;
  strInstructionsZH_HANS?: string | null;
  strInstructionsZH_HANT?: string | null;
  strDrinkThumb: string;
  strImageSource?: string | null;
  strImageAttribution?: string | null;
  strCreativeCommonsConfirmed?: "Yes" | "No" | null;
  dateModified?: string | null;
  ingredients?: IngredientMeasure[];
}

export interface CocktailData {
  drinks: Drink[];
}
