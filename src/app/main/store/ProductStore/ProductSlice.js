// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import FuseUtils from '@fuse/utils';
// import axios from '../../../../global/axios';

// export const getProduct = createAsyncThunk(`products/admin/:itemnumber`, async ({ itemNumber }) => {
// 	// const response = await axios.get(`/products/admin/${_id}`);
// 	// const data = await response.data.result.product;
// 	// return data;
// });

// export const saveProduct = createAsyncThunk(`products/:itemnumber`, async form => {
// 	console.log('save product', form) // itemModule.php
// 	const result = await axios.post('/itemModule.php', form)
// 	console.log(result.data)
// 	return result.data

// 	// const { _id } = product;
// 	// if (_id) {
// 	// 	const response = await axios.put(`/products/${_id}`, product);
// 	// 	const data = await response.data.result;
// 	// 	return data;
// 	// }
// 	// const response = await axios.post('/products', product);
// 	// const data = await response.data.result;
// 	// return data;
// });

// const productSlice = createSlice({
// 	name: 'main/product',
// 	initialState: null,
// 	reducers: {
// 		newProduct: {
// 			reducer: (state, action) => action.payload,
// 			prepare: event => ({
// 				payload: {
// 					itemTitle:'',
//                     itemSubTitle:'',
//                     itemDescription: null,
//                     itemUnit:'',
//                     itemPrice:'',
//                     itemSalesPrice:'',
//                     itemCategory:[],
// 					itemParentCategory:[],
// 					isTaxable:'',
//                     itemTag:[],
// 					itemImages: [],
// 					language:''
// 				}
// 			})
// 		}
// 	},
// 	extraReducers: {
// 		[getProduct.fulfilled]: (state, action) => action.payload,
// 		[saveProduct.fulfilled]: (state, action) => action.payload
// 	}
// });

// export const { newProduct } = productSlice.actions;

// export default productSlice.reducer;
