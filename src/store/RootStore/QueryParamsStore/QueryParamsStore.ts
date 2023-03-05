import { action, makeObservable, observable, runInAction } from "mobx";

type PrivateFields = "_params";

export default class QueryParamsStore {
  private _params: { search: string } = { search: "" };

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable,
      setSearch: action
    });
  }

  get getSearch(): string {
    return this._params.search;
  }

  setSearch(search: string) {
    runInAction(() => {
      this._params.search = search;
    });
  }
}
