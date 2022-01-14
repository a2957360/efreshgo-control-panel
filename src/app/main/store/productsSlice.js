import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from '../../../global/axios';

export const getProducts = createAsyncThunk('products', async () => {
	const response = await axios.get('/products/all');
	const data = await response.data.list;
	return data;
});

export const deleteProducts = createAsyncThunk('/products/delete', async ids => {
	const response = await axios.put('/products/delete', { ids });
	const data = await response.data.list;
	return data;
});

const productsAdapter = createEntityAdapter({ selectId: item => item._id });

export const { selectAll: selectProducts, selectById: selectPromoteCodeById } = productsAdapter.getSelectors(
	state => state.main.products
);

const productsSlice = createSlice({
	name: 'main/products',
	initialState: productsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setProductsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getProducts.fulfilled]: productsAdapter.setAll,
		[deleteProducts.fulfilled]: productsAdapter.setAll
	}
});

export const { setProductsSearchText } = productsSlice.actions;

export default productsSlice.reducer;
