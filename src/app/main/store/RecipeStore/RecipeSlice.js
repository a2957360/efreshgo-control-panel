// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import FuseUtils from '@fuse/utils';
// import axios from '../../../../global/axios';

// export const getRecipe = createAsyncThunk(`recipe/get`, async ({ itemNumber }) => {
// 	// const response = await axios.get(`/products/admin/${_id}`);
// 	// const data = await response.data.result.product;
// 	// return data;
// });

// export const saveRecipe = createAsyncThunk(`recipe/save/:itemnumber`, async form => {
// 	const result = await axios.post('/cookbookModule.php', form)
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

// const recipeSlice = createSlice({
// 	name: 'main/recipe',
// 	initialState: null,
// 	reducers: {
// 		newRecipe: {
// 			reducer: (state, action) => action.payload,
// 			prepare: event => ({
// 				payload: {
//                     cookbookTitle:'',
//                     itemList:[],
//                     cookbookSubTitle:'',
//                     cookbookDescription: null,
//                     cookbookCategory:[],
//                     cookbookTag:[],
//                     cookbookImages:[],
//                     language:'Zh'
// 				}
// 			})
// 		}
// 	},
// 	extraReducers: {
// 		[getRecipe.fulfilled]: (state, action) => action.payload,
// 		[saveRecipe.fulfilled]: (state, action) => action.payload
// 	}
// });

// export const { newRecipe } = recipeSlice.actions;

// export default recipeSlice.reducer;
