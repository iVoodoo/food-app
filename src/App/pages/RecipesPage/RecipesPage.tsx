import { useEffect } from "react";

import background from "assets/images/background.svg";
import Card from "components/card";
import Loader from "components/loader";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import allRecipesStore from "store/AllRecipesStore";
import { useLocalStore } from "utils/useLocalStore";

import styles from "./RecipesPage.module.scss";
import Search from "./search";

const RecipesPage = () => {
  useLocalStore(() => allRecipesStore);

  useEffect(() => {
    allRecipesStore.getAllRecipesList();
  }, []);

  return (
    <div className={styles.wrapper}>
      <img src={background} alt="background-food" />
      <div className={styles.header}>
        <Search />
      </div>
      <InfiniteScroll
        dataLength={allRecipesStore.allRecipesList.length}
        next={() => {
          allRecipesStore.moreRecipes();
        }}
        hasMore={true}
        loader={<Loader />}
      >
        <section className={styles.cardWrapper}>
          {allRecipesStore.allRecipesList.map(item => (
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
      </InfiniteScroll>
    </div>
  );
};

export default observer(RecipesPage);
