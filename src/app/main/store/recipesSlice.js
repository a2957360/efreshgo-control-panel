import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from '../../../global/axios';

export const getRecipes = createAsyncThunk('recipes', async () => {
	const response = await axios.get('/recipes/all');
	const data = await response.data.list;
	return data;
});
export const deleteRecipes = createAsyncThunk('/recipes/delete', async ids => {
	const response = await axios.put('/recipes/delete', { ids });
	const data = await response.data.list;
	return data;
});

const recipesAdapter = createEntityAdapter({ selectId: item => item._id });

export const { selectAll: selectRecipes, selectById: selectPromoteCodeById } = recipesAdapter.getSelectors(
	state => state.main.recipes
);

const recipesSlice = createSlice({
	name: 'main/recipes',
	initialState: recipesAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setRecipesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getRecipes.fulfilled]: recipesAdapter.setAll,
		[deleteRecipes.fulfilled]: recipesAdapter.setAll
	}
});

export const { setRecipesSearchText } = recipesSlice.actions;

export default recipesSlice.reducer;
