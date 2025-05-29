import { createSlice } from "@reduxjs/toolkit";

const initialRecipesState = {
    RecipesList : [],
    dataLoaded : false,
}

const RecipeRecipesSlice = createSlice({
    name : "Recipes",
    initialState : initialRecipesState,
    reducers : {
        addRecipes(state, action) {
            const exists = state.RecipesList.find(item => item.id === action.payload.id);
            if (!exists) {
              state.RecipesList.push(action.payload); 
            }
        },
        clearRecipes(state) {
            state.RecipesList = []; 
        },
        setDataLoaded(state, action) {  
            state.dataLoaded = action.payload;
        }
    } 
});


export const RecipesListAction = RecipeRecipesSlice.actions;
export default RecipeRecipesSlice.reducer;