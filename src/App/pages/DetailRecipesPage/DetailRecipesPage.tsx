import { useEffect } from "react";

import backArrow from "assets/images/backArrow.svg";
import Loader from "components/loader";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import singleRecipeStore from "store/SingleRecipeStore";
import { useLocalStore } from "utils/useLocalStore";

import CardContent from "./cardContent";
import styles from "./DetailRecipesPage.module.scss";

const DetailRecipesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useLocalStore(() => singleRecipeStore);
  useEffect(() => {
    singleRecipeStore.getSingleRecipe(id);
  }, [id]);

  const recipe = singleRecipeStore.singleRecipe;

  return (
    <div className={styles.wrapper}>
      {recipe ? (
        <div className={styles.card}>
          <div className={styles.card__background}>
            <img src={recipe?.image} alt="food" />
            <span
              className={styles["card__background__background-backArrow"]}
              onClick={() => {
                navigate(-1);
              }}
            >
              <img src={backArrow} alt="backArrow-icon" />
            </span>
          </div>
          <CardContent
            title={recipe?.title}
            instructions={recipe?.instructions}
            likes={recipe?.likes}
            times={recipe?.times}
          />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default observer(DetailRecipesPage);
