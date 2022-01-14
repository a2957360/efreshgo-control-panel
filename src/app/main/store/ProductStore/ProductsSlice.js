// import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
// import axios from '../../../../global/axios';

// export const getProducts = createAsyncThunk('/products/get', async () => {
// 	const query = { isGetAdmin: 1, language: 'Zh' };
// 	const result = await axios.post('/itemModule.php', query);
// 	console.log(result.data.data);
// 	return result.data.data;
// });

// export const deleteProducts = createAsyncThunk('/products/delete', async items => {
// 	const query = {
// 		isDelete: 1,
// 		itemNumber: items,
// 		language: 'Zh'
// 	};
// 	const result = await axios.post('/itemModule.php', query);
// 	return result.data;
// });

// const productsAdapter = createEntityAdapter();

// export const { selectAll: selectProducts, selectById: selectProductById } = productsAdapter.getSelectors(
// 	state => state.main.products
// );

// const productsSlice = createSlice({
// 	name: 'main/products',
// 	initialState: productsAdapter.getInitialState({
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
// 		[getProducts.fulfilled]: productsAdapter.setAll,
// 		[deleteProducts.fulfilled]: productsAdapter.setAll
// 	}
// });

// export const { setSearchText } = productsSlice.actions;

// export default productsSlice.reducer;
