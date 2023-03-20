import { FormEvent } from "react";

import searchIcon from "assets/images/search-icon.svg";
import Input from "components/input";
import Multidropdown from "components/multidropdown";
import { TypeOption } from "components/multidropdown/MultiDropdown";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";
import allRecipesStore from "store/AllRecipesStore";
import rootStore from "store/RootStore/instance";
import { useLocalStore } from "utils/useLocalStore";

import styles from "./Search.module.scss";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams("");
  useLocalStore(() => allRecipesStore);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchParams({
      search: rootStore.query.getSearch,
      type: searchParams.get("type") || ""
    });
    allRecipesStore.getAllRecipesList();
  };

  const handleChange = (value: string) => {
    rootStore.query.setSearch(value);
  };

  const onChangeType = (type: TypeOption) => {
    setSearchParams({
      search: searchParams.get("search") || "",
      type: rootStore.query.getTypeForRequest
    });
  };

  return (
    <>
      <form className={styles.search} onSubmit={handleSubmit}>
        <Input
          value={rootStore.query.getSearch}
          onChange={value => handleChange(value)}
        />
        <button className={styles.search__icon}>
          <img src={searchIcon} alt="search-icon" />
        </button>
      </form>
      <div className={styles["multi-dropdown-wrapper"]}>
        <Multidropdown
          value={rootStore.query.getType}
          onChange={onChangeType}
        />
      </div>
      {searchParams.get("search") && (
        <p className={styles.result}>
          Result For: {searchParams.get("search")}
        </p>
      )}
    </>
  );
};

export default observer(Search);
