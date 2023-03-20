import likeImg from "assets/images/like.svg";
import timerImg from "assets/images/timer.svg";
import { SingleRecipe } from "store/models/singleRecipe";

import styles from "./CardContent.module.scss";
const CardContent: React.FC<Omit<SingleRecipe, "id" | "image">> = ({
  instructions,
  likes,
  times,
  title
}) => {
  return (
    <div className={styles.card}>
      <h1 className={styles.card__title}>{title}</h1>
      <div className={styles.card__stats}>
        <div className={styles.card__stats__timer}>
          <span className={styles["card__stats__timer__timer-logo"]}>
            <img src={timerImg} alt="timer logo" />
          </span>
          <p className={styles["card__stats__timer__timer-text"]}>
            {times} minutes
          </p>
        </div>
        <div className={styles.card__stats__likes}>
          <span className={styles["card__stats__likes__likes-logo"]}>
            <img src={likeImg} alt="like logo" />
          </span>
          <p className={styles["card__stats__likes__likes-text"]}>
            {likes} Rating
          </p>
        </div>
      </div>
      <article
        className={styles["card__recipe-instruction"]}
        dangerouslySetInnerHTML={{ __html: `${instructions}` }}
      />
    </div>
  );
};

export default CardContent;
