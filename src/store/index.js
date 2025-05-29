import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import recipeListReducer from './RecipeCategorySlice';
import cartReducer from './CartSlice';
import orderReducer from './OrderSlice';
import categoriesReducer from './CategoriesSlice';

const store = configureStore({
    reducer: { auth: authReducer , list : recipeListReducer ,categories : categoriesReducer,cart : cartReducer,order : orderReducer}
})

export default store;