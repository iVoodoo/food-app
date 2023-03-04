import { useEffect } from "react";

import background from "@assets/images/background.svg";
import Card from "@components/card";
import AllRecipesStore from "@store/AllRecipesStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import styles from "./RecipesPage.module.scss";
import Search from "./search";

const RecipesPage = () => {
  useEffect(() => {
    AllRecipesStore.getAllRecipesList();
  }, []);

  return (
    <div className={styles.wrapper}>
      <img src={background} alt="background-food" />
      <div className={styles.header}>
        <Search />
      </div>
      <section className={styles.cardWrapper}>
        {AllRecipesStore.allRecipesList.map(item => (
          <Link
            style={{ textDecoration: "none", display: "flex", flexGrow: "1" }}
            key={item.id}
            to={`/recipe/${item.id}`}
          >
            <Card
              key={item.id}
              image={item.image}
              title={item.title}
              kcal={item.kcal}
              ingredients={item.ingredients}
            />
          </Link>
        ))}
      </section>
    </div>
  );
};

export default observer(RecipesPage);
