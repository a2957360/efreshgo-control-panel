import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from '../../../global/axios';

export const getProductCategories = createAsyncThunk('productCategories', async () => {
	const response = await axios.get('/productCategories');
	const data = await response.data.list;
	return data;
});

export const deleteProductsCategories = createAsyncThunk('/productCategories/delete', async ids => {
	const response = await axios.put('/productCategories/delete', { ids });
	const data = await response.data.list;
	return data;
});

const productCategoriesAdapter = createEntityAdapter({ selectId: item => item._id });

export const {
	selectAll: selectProductCategories,
	selectById: selectPromoteCodeById
} = productCategoriesAdapter.getSelectors(state => state.main.productCategories);

const productCategoriesSlice = createSlice({
	name: 'main/productCategories',
	initialState: productCategoriesAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setProductCategoriesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getProductCategories.fulfilled]: productCategoriesAdapter.setAll,
		[deleteProductsCategories.fulfilled]: productCategoriesAdapter.setAll
	}
});

export const { setProductCategoriesSearchText } = productCategoriesSlice.actions;

export default productCategoriesSlice.reducer;
