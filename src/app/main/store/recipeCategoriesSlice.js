import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from '../../../global/axios';

export const getRecipeCategories = createAsyncThunk('recipeCategories', async () => {
	const response = await axios.get('/recipeCategories');
	const data = await response.data.list;
	return data;
});

export const deleteRecipeCategories = createAsyncThunk('/recipeCategories/delete', async ids => {
	const response = await axios.put('/recipeCategories/delete', { ids });
	const data = await response.data.list;
	return data;
});

const recipeCategoriesAdapter = createEntityAdapter({ selectId: item => item._id });

export const {
	selectAll: selectRecipeCategories,
	selectById: selectPromoteCodeById
} = recipeCategoriesAdapter.getSelectors(state => state.main.recipeCategories);

const recipeCategoriesSlice = createSlice({
	name: 'main/recipeCategories',
	initialState: recipeCategoriesAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setRecipeCategoriesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getRecipeCategories.fulfilled]: recipeCategoriesAdapter.setAll,
		[deleteRecipeCategories.fulfilled]: recipeCategoriesAdapter.setAll
	}
});

export const { setRecipeCategoriesSearchText } = recipeCategoriesSlice.actions;

export default recipeCategoriesSlice.reducer;
