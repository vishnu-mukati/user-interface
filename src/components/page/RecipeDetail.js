import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './RecipeDetail.module.css';
import { cartAction } from '../../store/CartSlice';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect, useMemo } from 'react';

const RecipeDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();
    const userEmail = useSelector(state => state.auth.email);
    const cartData = useSelector(state=>state.cart.cartData);
    const recipe = useSelector(state =>
        state.list.categoriesList.find(item => item.id === id)
    );

    useEffect(()=>{
       localStorage.setItem(userEmail, JSON.stringify(cartData));
    },[cartData,userEmail])

    const addToCartHandler = (recipe) => {
        dispatch(cartAction.addToCart(recipe));
    };

    const cancelAddHandler = () => {
        history.push('/dashboard');
    };

    if (!recipe) {
        return <h2>Loading Recipe Details...</h2>;
    }

    return (
        <div className={styles.detailContainer}>
            <h1>{recipe.name}</h1>
            <img src={recipe.image} alt={recipe.name} className={styles.image} />
            <p><strong>Price:</strong> ₹{recipe.price}</p>
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
            
            <div className={styles.buttonGroup}>
                <button onClick={() => addToCartHandler(recipe)}>Add To Cart</button>
                <button className={styles.cancel} onClick={cancelAddHandler}>Cancel</button>
            </div>
        </div>
    );
};

export default RecipeDetail;
