export const URL = {
  getAllRecipes: "https://api.spoonacular.com/recipes/complexSearch",
  getRecipeById: (id: string | undefined): string =>
    `https://api.spoonacular.com/recipes/${id}/information`
};

const KEYS = {
  KEY_1: "5c1b643c5d3844d282883824819a05f2",
  KEY_2: "b0db404a9ba54510b2bfd9b06d47487b",
  KEY_3: "c3135492ba834525ada0e05334b04089",
  KEY_4: "b028ee5fad9a4ee58ec5d9e65180fcde",
  KEY_5: "d55d4e46112a4aac9ce100aab9b1be29"
};

export const KEY = KEYS.KEY_2;
