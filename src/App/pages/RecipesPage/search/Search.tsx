import { FormEvent, useState } from "react";

import searchIcon from "@assets/images/search-icon.svg";
import Input from "@components/input";
import Multidropdown from "@components/multidropdown";
import { TypeOption } from "@components/multidropdown/MultiDropdown";
import AllRecipesStore from "@store/AllRecipesStore";
import rootStore from "@store/RootStore/instance";
import { useSearchParams } from "react-router-dom";

import styles from "./Search.module.scss";

const Search = () => {
  const [value, setValue] = useState<TypeOption[]>([]);
  const [searchParams, setSearchParams] = useSearchParams("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchParams({ query: rootStore.query.getSearch });
    AllRecipesStore.getAllRecipesList();
  };

  const handleChange = (value: string) => {
    setSearchParams({ query: "" });
    rootStore.query.setSearch(value);
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
          value={value}
          onChange={(item: TypeOption[]) => setValue(item)}
        />
      </div>
      {searchParams.get("query") !== "" && (
        <p className={styles.result}>Result For: {searchParams.get("query")}</p>
      )}
    </>
  );
};

export default Search;
