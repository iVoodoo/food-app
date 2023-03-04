import { URL, KEY } from "@config/apiUrls";
import { AllRecipes } from "@store/models/allRecipes";
import axios from "axios";
import { makeAutoObservable } from "mobx";

class AllRecipesStore {
  private _allRecipesList: AllRecipes[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get allRecipesList(): AllRecipes[] {
    return this._allRecipesList;
  }

  clearAllRecipesList() {
    this._allRecipesList = [];
  }

  async getAllRecipesList(): Promise<void> {
    const response = await axios.get(
      `${URL.getAllRecipes}?apiKey=${KEY}&addRecipeNutrition=true`
    );
    this.clearAllRecipesList();
    response.data.results.map((item: any) => {
      let ingredientsData = item.nutrition.ingredients
        .map((ingredient: any) => ingredient.name)
        .join(" + ");
      this._allRecipesList.push({
        id: item.id,
        title: item.title,
        image: item.image,
        ingredients: ingredientsData,
        kcal: item.nutrition.nutrients[0].amount
      });
    });
  }
}

export default new AllRecipesStore();
