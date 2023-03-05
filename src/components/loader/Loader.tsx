import React from "react";

import cn from "clsx";

import styles from "./Loader.module.scss";

export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l"
}

export type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({
  loading = true,
  size = "m",
  className
}) => {
  return loading ? (
    <div className={cn(styles.loader, styles[`${size}-size`])}></div>
  ) : (
    <></>
  );
};

export default Loader;
