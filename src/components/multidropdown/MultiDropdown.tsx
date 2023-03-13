import React, { useState } from "react";

import cn from "clsx";
import { MultiDropDownOptions } from "data/MultiDropDownOptions";
import { observer } from "mobx-react-lite";
import allRecipesStore from "store/AllRecipesStore/AllRecipesStore";
import rootStore from "store/RootStore/instance";

import styles from "./MultiDropdown.module.scss";
import Option from "./option";

export type TypeOption = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  /** Массив возможных вариантов для выбора */
  options?: TypeOption[];
  /** Текущие выбранные значения поля, может быть пустым */
  value?: TypeOption[];
  /** Callback, вызываемый при выборе варианта */
  onChange?: (value: TypeOption) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions?: (value: TypeOption[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options = MultiDropDownOptions,
  value = [],
  onChange = (value: TypeOption) => {},
  disabled,
  pluralizeOptions = value => {
    if (value.length !== 0) {
      return String(value.map(item => item.value).join(", "));
    } else {
      return "Pick categories";
    }
  }
}) => {
  const [isShow, setIsShow] = useState(false);
  const handleShow = () => setIsShow(!isShow);

  return (
    <div className={styles["multi-dropdown"]}>
      <button
        onClick={handleShow}
        className={cn(styles["multi-dropdown__button"], {
          [styles["multi-dropdown__button_disabled"]]: disabled
        })}
        disabled={disabled}
      >
        {pluralizeOptions(value)}
      </button>
      <div className={styles["multi-dropdown__items"]}>
        {isShow &&
          options?.map(item => {
            return (
              <Option
                key={item.key}
                option={item}
                isSelected={
                  value.findIndex(element => element.key === item.key) !== -1
                }
                onClick={() => {
                  onChange(item);
                  rootStore.query.setType(item);
                  allRecipesStore.getAllRecipesList();
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default observer(MultiDropdown);
