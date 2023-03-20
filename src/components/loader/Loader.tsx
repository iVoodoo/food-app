import React from "react";

import cn from "clsx";

import styles from "./Loader.module.scss";

export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l"
}

export type LoaderProps = {
  size?: LoaderSize;
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ size = "m", className }) => (
  <span className={cn(styles.loader, styles[`loader_size_${size}`])}></span>
);

export default Loader;
