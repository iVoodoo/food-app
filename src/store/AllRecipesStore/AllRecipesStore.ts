import axios from "axios";
import { URL, KEY } from "config/apiUrls";
import { makeAutoObservable } from "mobx";
import { AllRecipes } from "store/models/allRecipes";
import rootStore from "store/RootStore/instance";
import { ILocalStore } from "utils/useLocalStore";

class AllRecipesStore implements ILocalStore {
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
    const response = await axios.get(URL.getAllRecipes, {
      params: {
        apiKey: KEY,
        addRecipeNutrition: true,
        number: this._allRecipesListLength,
        query: rootStore.query.getSearch,
        type: rootStore.query.getTypeForRequest
      }
    });
    this.clearAllRecipesList();
    response.data.results.forEach((item: any) => {
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

  destroy(): void {
    this._allRecipesList = [];
  }
}

const allRecipesStore = new AllRecipesStore();

export default allRecipesStore;
