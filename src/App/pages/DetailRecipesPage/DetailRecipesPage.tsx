import { useEffect, useState } from "react";

import backArrow from "@assets/images/backArrow.svg";
import likeImg from "@assets/images/like.svg";
import timerImg from "@assets/images/timer.svg";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./DetailRecipesPage.module.scss";

type TypeRecipe = {
  id: number;
  title: string;
  image: string;
  instructions: string;
  times: number;
  likes: number;
};

const DetailRecipesPage = () => {
  const { id } = useParams();

  const URL = `https://api.spoonacular.com/recipes/${id}/information?apiKey=5c1b643c5d3844d282883824819a05f2`;

  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState<TypeRecipe>();

  useEffect(() => {
    const getRecipe = async () => {
      const response = (await axios.get(URL)).data;
      setLoading(false);

      setRecipe({
        id: response.id,
        title: response.title,
        image: response.image,
        instructions: response.instructions,
        times: response.readyInMinutes,
        likes: response.aggregateLikes
      });
    };

    getRecipe();
  }, []);

  return (
    <div className={styles.wrapper}>
      {!isLoading && (
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
      )}
    </div>
  );
};

export default DetailRecipesPage;
