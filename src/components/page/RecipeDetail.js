import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classes from './RecipeDetail.module.css';
import { cartAction } from '../../store/CartSlice';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import { Fragment } from 'react';

const RecipeDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();
    const userEmail = useSelector(state => state.auth.email);
    const cartData = useSelector(state => state.cart.cartData);
    const recipe = useSelector(state =>
        state.list.RecipesList.find(item => item.id === id)
    );

    useEffect(() => {
        localStorage.setItem(userEmail, JSON.stringify(cartData));
    }, [cartData, userEmail])

    const addToCartHandler = (recipe) => {
        dispatch(cartAction.addToCart(recipe));
    };

    const cancelAddHandler = () => {
        history.push('/dashboard');
    };


    return (
        <Fragment>
            <p className={classes.Heading}>Welcome To The Recipe</p>
            {!recipe ? (
                <div>
                    <h2>No Recipe Found</h2>
                     <button className={classes.cancel} onClick={cancelAddHandler}>Go Back To Categories</button>
                </div>
            ) : (
                <div className={classes.detailContainer}>
                    <h1>{recipe.name}</h1>
                    <img src={recipe.image} alt={recipe.name} className={classes.image} />
                    <h2><strong>Price:</strong> ₹{recipe.price}</h2>
                    <p><h4>Ingredients:</h4> {recipe.ingredients}</p>

                    <div className={classes.buttonGroup}>
                        <button onClick={() => addToCartHandler(recipe)}>Add To Cart</button>
                        <button className={classes.cancel} onClick={cancelAddHandler}>Cancel</button>
                    </div>
                </div>
            )}


        </Fragment>
    );
};

export default RecipeDetail;
