import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from '../../../global/axios';

export const getBottomCategories = createAsyncThunk('bottomCategories', async () => {
	const response = await axios.get('/bottomCategories/admin');
	const data = await response.data.list;
	return data;
});

export const deleteProductsCategories = createAsyncThunk('/bottomCategories/delete', async ids => {
	const response = await axios.put('/bottomCategories/delete', { ids });
	const data = await response.data.list;
	return data;
});

const bottomCategoriesAdapter = createEntityAdapter({ selectId: item => item._id });

export const {
	selectAll: selectBottomCategories,
	selectById: selectPromoteCodeById
} = bottomCategoriesAdapter.getSelectors(state => state.main.bottomCategories);

const bottomCategoriesSlice = createSlice({
	name: 'main/bottomCategories',
	initialState: bottomCategoriesAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setBottomCategoriesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getBottomCategories.fulfilled]: bottomCategoriesAdapter.setAll,
		[deleteProductsCategories.fulfilled]: bottomCategoriesAdapter.setAll
	}
});

export const { setBottomCategoriesSearchText } = bottomCategoriesSlice.actions;

export default bottomCategoriesSlice.reducer;
