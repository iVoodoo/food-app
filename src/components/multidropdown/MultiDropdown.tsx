import React, { useState } from "react";

import cn from "clsx";

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
  onChange?: (value: TypeOption[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions?: (value: TypeOption[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options = [
    { key: "msk", value: "Москва" },
    { key: "spb", value: "Санкт-Петербург" },
    { key: "ekb", value: "Екатеринбург" }
  ],
  value = [],
  onChange = () => {},
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

  function selectOption(option: TypeOption) {
    if (value.find(o => o.key === option.key)) {
      onChange(value.filter(el => el.key !== option.key));
    } else {
      onChange([...value, option]);
    }
  }

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
                  selectOption(item);
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default MultiDropdown;
