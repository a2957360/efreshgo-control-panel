// import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
// import axios from '../../../../global/axios';

// export const getRecipes = createAsyncThunk('/recipes/get', async () => {
// 	// {
// 	// 	"isGetAdmin":"1",
// 	// 	"itemNumber":"1",
// 	// 	"itemCategory":"1",
// 	// 	"itemParentCategory":"1",
// 	// 	"searchText":"m",
// 	// 	"language":"Zh"
// 	// }	
// 	const query = { isGetAdmin: 1 };
// 	const result = await axios.post('/coookbookModule.php', query);
// 	return result.data.data;
// });

// export const deleteRecipes = createAsyncThunk('/recipes/delete', async ids => {
// 	// const response = await axios.put('/products/delete', { ids });
// 	// const data = await response.data.list;
// 	// return data;
// });

// const recipesAdapter = createEntityAdapter({ selectId: item => item.itemId });

// export const { selectAll: selectRecipes, selectById: selectRecipeById } = recipesAdapter.getSelectors(
// 	state => state.main.recipes
// );

// const recipesSlice = createSlice({
// 	name: 'main/recipes',
// 	initialState: recipesAdapter.getInitialState({
// 		searchText: ''
// 	}),
// 	reducers: {
// 		setSearchText: {
// 			reducer: (state, action) => {
// 				state.searchText = action.payload;
// 			},
// 			prepare: event => ({ payload: event.target.value || '' })
// 		}
// 	},
// 	extraReducers: {
// 		[getRecipes.fulfilled]: recipesAdapter.setAll,
// 		[deleteRecipes.fulfilled]: recipesAdapter.setAll
// 	}
// });

// export const { setSearchText } = recipesSlice.actions;

// export default recipesSlice.reducer;
