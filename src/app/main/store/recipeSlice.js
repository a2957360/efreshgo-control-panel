import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import axios from '../../../global/axios';

export const getRecipe = createAsyncThunk(`recipes/ get details`, async ({ _id }) => {
	const response = await axios.get(`/recipes/admin/${_id}`);
	const data = await response.data.result;
	return data;
});

export const saveRecipe = createAsyncThunk(`recipes/ create or update`, async recipe => {
	const { _id } = recipe;
	if (_id) {
		const response = await axios.put(`/recipes/${_id}`, recipe);
		const data = await response.data.result;
		return data;
	}
	const response = await axios.post('/recipes', recipe);
	const data = await response.data.result;
	return data;
});

const recipeSlice = createSlice({
	name: 'main/recipe',
	initialState: null,
	reducers: {
		newRecipe: {
			reducer: (state, action) => action.payload,
			prepare: recipe => ({
				payload: {
					name: '',
					images: [],
					featuredImage: [],
					description: '',
					steps: [],
					summery: [{ context: '' }],
					ingredients: [{ name: '', quality: '' }],
					products: [],
					recipeCategory: '',
					isDeleted: false,
					difficulty: 3
				}
			})
		}
	},
	extraReducers: {
		[getRecipe.fulfilled]: (state, action) => action.payload,
		[saveRecipe.fulfilled]: (state, action) => action.payload
	}
});

export const { newRecipe } = recipeSlice.actions;

export default recipeSlice.reducer;
