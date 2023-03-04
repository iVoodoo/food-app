export const URL = {
  getAllRecipes: "https://api.spoonacular.com/recipes/complexSearch",
  getRecipeById: (id: string | undefined): string =>
    `https://api.spoonacular.com/recipes/${id}/information`
};

const KEYS = {
  KEY_1: "5c1b643c5d3844d282883824819a05f2",
  KEY_2: "b0db404a9ba54510b2bfd9b06d47487b",
  KEY_3: "c3135492ba834525ada0e05334b04089"
};

export const KEY = KEYS.KEY_3;
