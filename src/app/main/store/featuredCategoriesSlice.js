import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from '../../../global/axios';

export const getFeaturedCategories = createAsyncThunk('Featured-Category', async () => {
	const response = await axios.get(`/featuredCategories/`);
	const data = await response.data.list;
	return data;
});

export const deleteFeaturedCategories = createAsyncThunk('/Featured-Category/delete', async ids => {
	const response = await axios.put('/featuredCategories/delete', { ids });
	const data = await response.data.list;
	return data;
});

const featuredCategoriesAdapter = createEntityAdapter({ selectId: item => item._id });

export const {
	selectAll: selectFeaturedCategories,
	selectById: selectPromoteCodeById
} = featuredCategoriesAdapter.getSelectors(state => state.main.featuredCategories);

const featuredCategoriesSlice = createSlice({
	name: 'main/featuredCategories',
	initialState: featuredCategoriesAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setFeaturedCategoriesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getFeaturedCategories.fulfilled]: featuredCategoriesAdapter.setAll,
		[deleteFeaturedCategories.fulfilled]: featuredCategoriesAdapter.setAll
	}
});

export const { setFeaturedCategoriesSearchText } = featuredCategoriesSlice.actions;

export default featuredCategoriesSlice.reducer;
