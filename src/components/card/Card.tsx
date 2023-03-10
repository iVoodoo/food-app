import React from "react";

import plusButton from "@assets/images/plusButton.svg";

import styles from "./Card.module.scss";

export type CardProps = {
  /** URL изображения */
  image: string;
  /** Заголовок карточки */
  title: string;
  /** Подзаголовок карточки */
  ingredients: string;
  kcal: number;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
};

const Card: React.FC<CardProps> = ({
  image,
  title,
  ingredients,
  kcal,
  onClick
}) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img className={styles.cardImage} src={image} alt="food preciew"></img>
      <h1 className={styles.cardTitle}>{title}</h1>
      <p className={styles.cardIngredients}>{ingredients}</p>
      <div className={styles.cardContent}>
        <div className={styles.kcal}>{kcal} kcal</div>
        <img className={styles.button} src={plusButton} alt="plus"></img>
      </div>
    </div>
  );
};

export default Card;
