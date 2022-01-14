import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../global/axios';

export const getFeaturedCategory = createAsyncThunk(`Featured-Category/:_id`, async ({ _id }) => {
	const response = await axios.get(`/featuredCategories/${_id}`);
	const data = await response.data.result;
	return data;
});

export const saveFeaturedCategory = createAsyncThunk(`Featured-Category/:_id`, async featuredCategory => {
	const { _id } = featuredCategory;
	if (_id) {
		const response = await axios.put(`/featuredCategories/${_id}`, featuredCategory);
		const data = await response.data.result;
		return data;
	}
	const response = await axios.post('/featuredCategories', featuredCategory);
	const data = await response.data.result;
	return data;
});

const featuredCategorySlice = createSlice({
	name: 'main/featuredCategory',
	initialState: null,
	reducers: {
		newFeaturedCategory: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					category: '',
					order: 0
				}
			})
		}
	},
	extraReducers: {
		[getFeaturedCategory.fulfilled]: (state, action) => action.payload,
		[saveFeaturedCategory.fulfilled]: (state, action) => action.payload
	}
});

export const { newFeaturedCategory } = featuredCategorySlice.actions;

export default featuredCategorySlice.reducer;
