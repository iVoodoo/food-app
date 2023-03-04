import { URL, KEY } from "@config/apiUrls";
import { SingleRecipe } from "@store/models/singleRecipe";
import axios from "axios";
import { makeAutoObservable } from "mobx";

class SingleRecipeStore {
  private _singleRecipe: SingleRecipe = null;

  constructor() {
    makeAutoObservable(this);
  }

  get singleRecipe(): SingleRecipe {
    return this._singleRecipe;
  }

  clearSingleRecipe() {
    this._singleRecipe = null;
  }

  async getSingleRecipe(id: string | undefined): Promise<void> {
    this.clearSingleRecipe();
    const response = (await axios.get(`${URL.getRecipeById(id)}?apiKey=${KEY}`))
      .data;
    this._singleRecipe = {
      id: response.id,
      title: response.title,
      image: response.image,
      instructions: response.instructions,
      times: response.readyInMinutes,
      likes: response.aggregateLikes
    };
  }
}

export default new SingleRecipeStore();
