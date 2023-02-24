import React from "react";

import cn from "clsx";

import styles from "./Input.module.scss";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  /** Значение поля */
  value?: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
};

const Input: React.FC<InputProps> = ({ value, onChange, ...props }) => {
  return (
    <input
      {...props}
      disabled={props.disabled}
      placeholder="Search"
      type="text"
      className={cn(props.className, styles.input, {
        [styles.input_disabled]: props.disabled,
      })}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    ></input>
  );
};

export default Input;
