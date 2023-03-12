import { URL, KEY } from "@config/apiUrls";
import { SingleRecipe } from "@store/models/singleRecipe";
import { ILocalStore } from "@utils/useLocalStore";
import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";

class SingleRecipeStore implements ILocalStore {
  private _singleRecipe: SingleRecipe | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get singleRecipe(): SingleRecipe {
    return this._singleRecipe!;
  }

  clearSingleRecipe() {
    this._singleRecipe = null;
  }

  async getSingleRecipe(id: string | undefined): Promise<void> {
    this.clearSingleRecipe();
    const response = (
      await axios.get(URL.getRecipeById(id), {
        params: {
          apiKey: KEY
        }
      })
    ).data;
    runInAction(() => {
      this._singleRecipe = {
        id: response.id,
        title: response.title,
        image: response.image,
        instructions: response.instructions,
        times: response.readyInMinutes,
        likes: response.aggregateLikes
      };
    });
  }

  destroy(): void {
    this._singleRecipe = null;
  }
}
const singleRecipeStore = new SingleRecipeStore();

export default singleRecipeStore;
