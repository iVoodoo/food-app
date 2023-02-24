import React, { useState } from "react";

import cn from "clsx";

import styles from "./MultiDropdown.module.scss";

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  /** Массив возможных вариантов для выбора */
  options?: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value?: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange?: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions?: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options = [
    { key: "msk", value: "Москва" },
    { key: "spb", value: "Санкт-Петербург" },
    { key: "ekb", value: "Екатеринбург" },
  ],
  value = [{ key: "msk", value: "Москва" }],
  onChange = (item: Option[]) => {},
  disabled,
  pluralizeOptions = () => {
    return "Pick categories";
  },
}) => {
  const [isShow, setIsShow] = useState(false);
  const handleShow = () => setIsShow(!isShow);

  return (
    <div className={styles.multiDropdown}>
      <button
        onClick={handleShow}
        className={cn(styles.dropdown, {
          [styles.dropdown__disabled]: disabled,
        })}
        disabled={disabled}
      >
        {pluralizeOptions(value)}
      </button>
      <div className={styles.dropdownItems}>
        {isShow &&
          !disabled &&
          options?.map((item) => {
            return (
              <div
                key={item.key}
                className={cn(styles.item, {
                  [styles.item__selected]: !!value.find(
                    (element) => element.key === item.key
                  ),
                })}
                onClick={() => {
                  if (value?.includes(item)) {
                    onChange(value.filter((el) => el.key != item.key));
                  } else {
                    onChange([...value, item]);
                  }
                }}
              >
                {item.value}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MultiDropdown;
