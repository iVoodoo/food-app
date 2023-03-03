import React from "react";

import cn from "clsx";

import styles from "./Option.module.scss";
import { TypeOption } from "../MultiDropdown";

export type OptionProps = {
  option: TypeOption;
  isSelected: boolean;
  onClick: (option: TypeOption) => void;
};

const Option: React.FC<OptionProps> = ({ option, isSelected, onClick }) => {
  return (
    <button
      className={cn(styles.item, { [styles.item_selected]: isSelected })}
      onClick={() => {
        onClick(option);
      }}
    >
      {option.value}
    </button>
  );
};

export default Option;
