import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classes from "./CategoriesDetails.module.css";
import { cartAction } from '../../store/CartSlice';
import { useState, useEffect } from 'react';

const CategoriesDetail = () => {
    const { categoryName } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const allRecipes = useSelector(state => state.list.RecipesList);
    const cartData = useSelector(state => state.cart.cartData);
    const userEmail = useSelector(state => state.auth.email);



    const categoryRecipes = allRecipes.filter(recipe => {
        const a = recipe.RecipesSelection?.toLowerCase().trim();
        const b = categoryName.toLowerCase().trim();
        return a == b;
    });

    console.log(categoryName);
    console.log(categoryRecipes);

    useEffect(() => {
        localStorage.setItem(userEmail, JSON.stringify(cartData));
    }, [cartData, userEmail]);

    const addToCartHandler = (recipe) => {
        dispatch(cartAction.addToCart(recipe));
    };

    const handleBack = () => {
        history.push('/dashboard');
    };



    return (
        <div className={classes.detailPage}>
            <h2>Category: {categoryName}</h2>
            <button onClick={handleBack}>Back to Categories</button>
          {categoryRecipes.length ===0 ? (
              <p>No Recipe Available</p>
          ) : (
               <div className={classes.recipeList}>
                {categoryRecipes.map(recipe => (
                    <ul  key={recipe.id}>
                        <li>
                            <img src={recipe.image} alt={recipe.recipeName} />
                            <h3>{recipe.recipeName}</h3>
                            <p><strong>Price:</strong> ₹{recipe.price}</p>
                            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                            <button onClick={() => {
                                addToCartHandler(recipe);
                            }}>Add To Cart</button>
                        </li>
                    </ul>

                ))}
            </div>
          )}
           

        </div>
    );
};

export default CategoriesDetail;
