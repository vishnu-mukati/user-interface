import { createSlice } from "@reduxjs/toolkit";

const initialCategoriesState = {
    categoriesList : [],
    dataLoaded : false,
}

const RecipeCategoriesSlice = createSlice({
    name : "categories",
    initialState : initialCategoriesState,
    reducers : {
        addcategories(state, action) {
            const exists = state.categoriesList.find(item => item.id === action.payload.id);
            if (!exists) {
              state.categoriesList.push(action.payload); 
            }
        },
        clearCategories(state) {
            state.categoriesList = []; 
        },
        setDataLoaded(state, action) {  
            state.dataLoaded = action.payload;
        }
    } 
});


export const categoriesListAction = RecipeCategoriesSlice.actions;
export default RecipeCategoriesSlice.reducer;