import { useState } from "react";

import searchIcon from "@assets/images/search-icon.svg";
import Input from "@components/input";
import Multidropdown from "@components/multidropdown";
import { TypeOption } from "@components/multidropdown/MultiDropdown";

import styles from "./Search.module.scss";

const Search = () => {
  const [value, setValue] = useState<TypeOption[]>([]);

  return (
    <>
      <div className={styles.search}>
        <Input onChange={() => {}} />
        <div className={styles.search__icon}>
          <img src={searchIcon} alt="search-icon" />
        </div>
      </div>
      <div className={styles["multi-dropdown-wrapper"]}>
        <Multidropdown
          value={value}
          onChange={(item: TypeOption[]) => setValue(item)}
        />
      </div>
    </>
  );
};

export default Search;
