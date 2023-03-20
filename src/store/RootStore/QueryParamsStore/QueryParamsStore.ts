import { TypeOption } from "components/multidropdown/MultiDropdown";
import { action, makeObservable, observable, runInAction } from "mobx";

type PrivateFields = "_params";

export default class QueryParamsStore {
  private _params: { search: string; type: TypeOption[] } = {
    search: "",
    type: []
  };

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable,
      setSearch: action,
      setType: action
    });
  }

  get getSearch(): string {
    return this._params.search;
  }

  get getType(): TypeOption[] {
    return this._params.type;
  }

  get getTypeForRequest(): string {
    debugger;
    let requestTypes: string[];
    requestTypes = this._params.type.map(element => element.value);
    return requestTypes.join(" + ");
  }

  setSearch(search: string) {
    runInAction(() => {
      this._params.search = search;
    });
  }

  setType(type: TypeOption) {
    runInAction(() => {
      if (this._params.type.find(o => o.key === type.key)) {
        this._params.type = this._params.type.filter(el => el.key !== type.key);
      } else {
        this._params.type = [...this._params.type, type];
      }
    });
  }
}
