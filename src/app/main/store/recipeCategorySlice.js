import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import axios from '../../../global/axios';

export const getRecipeCategory = createAsyncThunk(`recipeCategories/:_id`, async ({ _id }) => {
	const response = await axios.get(`/recipeCategories/${_id}`);
	const data = await response.data.result;
	return data;
});

export const saveRecipeCategory = createAsyncThunk(`recipeCategories/:_id`, async recipeCategory => {
	const { _id } = recipeCategory;
	if (_id) {
		const response = await axios.put(`/recipeCategories/${_id}`, recipeCategory);
		const data = await response.data.result;
		return data;
	}
	const response = await axios.post('/recipeCategories', recipeCategory);
	const data = await response.data.result;
	return data;
});

const recipeCategorySlice = createSlice({
	name: 'main/recipeCategory',
	initialState: null,
	reducers: {
		newRecipeCategory: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					name: '',
					type: '',
					requirementText: '',
					requirementPrice: 0,
					discountMethod: 0,
					discountValue: 0,
					code: '',
					startedDate: Date.now(),
					expiredDate: Date.now(),
					isDelete: false
				}
			})
		}
	},
	extraReducers: {
		[getRecipeCategory.fulfilled]: (state, action) => action.payload,
		[saveRecipeCategory.fulfilled]: (state, action) => action.payload
	}
});

export const { newRecipeCategory } = recipeCategorySlice.actions;

export default recipeCategorySlice.reducer;
