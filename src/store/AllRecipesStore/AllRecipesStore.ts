import { URL, KEY } from "@config/apiUrls";
import { AllRecipes } from "@store/models/allRecipes";
import axios from "axios";
import { makeAutoObservable } from "mobx";

class AllRecipesStore {
  private _allRecipesList: AllRecipes[] = [];
  private _allRecipesListLength: number = 10;

  constructor() {
    makeAutoObservable(this);
  }

  get allRecipesList(): AllRecipes[] {
    return this._allRecipesList;
  }

  clearAllRecipesList() {
    this._allRecipesList = [];
  }

  moreRecipes() {
    this._allRecipesListLength += 10;
    this.getAllRecipesList();
  }

  async getAllRecipesList(): Promise<void> {
    const response = await axios.get(
      `${URL.getAllRecipes}?apiKey=${KEY}&addRecipeNutrition=true&number=${this._allRecipesListLength}`
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
