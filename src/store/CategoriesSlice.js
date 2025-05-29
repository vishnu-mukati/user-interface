import { createSlice } from "@reduxjs/toolkit";

const initialCategoriesState = {
    CategoriesList: [],
    allRecipe : [],
    dataLoaded: false,
}

const CategoriesSlice = createSlice({
    name: "categories",
    initialState: initialCategoriesState,
    reducers: {
        addCategories(state, action) {
            state.CategoriesList = action.payload;
            state.dataLoaded = true;
        },
        clearRecipes(state) {
            state.CategoriesList = [];
        },
        setDataLoaded(state, action) {
            state.dataLoaded = action.payload;
        },
    },

})

export const CategoriesListAction = CategoriesSlice.actions;
export default CategoriesSlice.reducer;