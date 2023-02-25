import { useEffect, useState } from "react";

import background from "@assets/images/background.svg";
import searchIcon from "@assets/images/search-icon.svg";
import Card from "@components/card";
import Input from "@components/input";
import Multidropdown from "@components/multidropdown";
import axios from "axios";
import { Link } from "react-router-dom";

import styles from "./RecipesPage.module.scss";

const URL =
  "https://api.spoonacular.com/recipes/complexSearch?apiKey=5c1b643c5d3844d282883824819a05f2&addRecipeNutrition=true";

type TypeRecipes = {
  id: number;
  title: string;
  image: string;
  ingredients: string;
  kcal: number;
};

const RecipesPage = () => {
  const [recipes, setRecipes] = useState<TypeRecipes[]>([]);

  useEffect(() => {
    const getRecipes = async () => {
      const response = await axios.get(URL);

      setRecipes(
        response.data.results.map((item: any) => {
          let ingredientsData = item.nutrition.ingredients
            .map((ingredient: any) => ingredient.name)
            .join(" + ");

          return {
            id: item.id,
            title: item.title,
            image: item.image,
            ingredients: ingredientsData,
            kcal: item.nutrition.nutrients[0].amount,
          };
        })
      );
    };

    getRecipes();
  }, []);

  return (
    <div className={styles.wrapper}>
      <img src={background} alt="background-image" />
      <div className={styles.header}>
        <div className={styles.search}>
          <Input onChange={() => {}} />
          <div className={styles.searchIcon}>
            <img src={searchIcon} alt="search-icon" />
          </div>
        </div>
        <div className={styles.multiDropdown}>
          <Multidropdown />
        </div>
      </div>
      <section className={styles.cardWrapper}>
        {recipes.map((item) => (
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

export default RecipesPage;
