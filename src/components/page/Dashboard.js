import { useState, useEffect } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { RecipesListAction } from "../../store/RecipeCategorySlice";
import classes from "./Dashboard.module.css";
import RecipeDetail from "./RecipeDetail";
import { useHistory } from 'react-router-dom';
import { CategoriesListAction } from "../../store/CategoriesSlice";

const Dashboard = () => {
     const dispatch = useDispatch();
     const dataLoaded = useSelector(state => state.categories.dataLoaded);
     const RecipesList = useSelector(state => state.list.RecipesList);
     const history = useHistory();
     const Categories = useSelector(state => state.categories.CategoriesList);



     async function getData() {
          try {
               const recipesRes = await axios.get('https://restaurant-admin-panel-7f6af-default-rtdb.firebaseio.com/Recipeslist.json');

               if (recipesRes.data) {
                    for (const key of Object.keys(recipesRes.data)) {
                         const recipe = {
                              id: key,
                              ...recipesRes.data[key],
                         };
                         console.log(recipe);
                         dispatch(RecipesListAction.addRecipes(recipe));
                    }
               }
               const res = await axios.get('https://restaurant-admin-panel-7f6af-default-rtdb.firebaseio.com/Categorieslist.json')

               console.log(res.data);
               if (res.data) {
                    const categoriesArray = Object.keys(res.data).map(key => ({
                         id: key,
                         ...res.data[key]
                    }));
                    dispatch(CategoriesListAction.addCategories(categoriesArray));
                     dispatch(CategoriesListAction.setDataLoaded(true));
               }

          
          } catch (err) {
               alert(err.message);
          }
     }

     // useEffect(() => {
     //      let intervalId;
     //      if (!dataLoaded) {
     //           getData();
     //           intervalId = setInterval(getData, 5000);
     //      }
     //      return () => clearInterval(intervalId);
     // }, []);

     useEffect(() => {
    getData(); // Immediate fetch
    const intervalId = setInterval(getData, 5000); // Then poll every 5s
    return () => clearInterval(intervalId);
}, []);


     const handleCategoryClick = (category) => {
         history.push(`/category/${category}`);
     };


     return (
          <>
               <div className={classes.dashboardContainer}>
                    <h1>Welcome To The Category</h1>
               </div>
               {Categories && Categories.length > 0 ? (
                    <ul className={classes.cardContainer}>
                         {Categories.map(category => (
                              <li
                                   key={category.id || category.categorieName}
                                   className={classes.card}
                                   onClick={() => handleCategoryClick(category.categorieName)}
                              >
                                   <img className={classes.image} src={category.image} alt={category.categorieName} />
                                   <h3>{category.categorieName}</h3>
                              </li>
                         ))}
                    </ul>
               ) : (
                    <p>No categories available</p>
               )}
          </>
     );
};

export default Dashboard;
