import React, { useEffect } from "react";

import backArrow from "@assets/images/backArrow.svg";
import likeImg from "@assets/images/like.svg";
import timerImg from "@assets/images/timer.svg";
import Loader from "@components/loader";
import SingleRecipeStore from "@store/SingleRecipeStore";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./DetailRecipesPage.module.scss";

const DetailRecipesPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    SingleRecipeStore.getSingleRecipe(id);
  }, []);

  const recipe = SingleRecipeStore.singleRecipe;
  return (
    <div className={styles.wrapper}>
      {recipe ? (
        <>
          <div className={styles.image}>
            <img src={recipe?.image} alt="food" />
            <span
              className={styles.backArrow}
              onClick={() => {
                navigate("/");
              }}
            >
              <img src={backArrow} alt="backArrow-icon" />
            </span>
          </div>
          <div className={styles.description}>
            <div className={styles.content}>
              <h1 className={styles.title}>{recipe?.title}</h1>
              <div className={styles.stats}>
                <div className={styles.timer}>
                  <span className={styles.logo}>
                    <img src={timerImg} alt="timer logo" />
                  </span>
                  <p className={styles.text}>{recipe?.times} minutes</p>
                </div>
                <div className={styles.likes}>
                  <span className={styles.logo}>
                    <img src={likeImg} alt="like logo" />
                  </span>
                  <p className={styles.text}>{recipe?.likes} Rating</p>
                </div>
              </div>
              <article
                className={styles.recipeInfo}
                dangerouslySetInnerHTML={{ __html: `${recipe?.instructions}` }}
              ></article>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default observer(DetailRecipesPage);
