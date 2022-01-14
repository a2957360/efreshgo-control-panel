// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from '../../../../global/axios';
// const fs = require('fs')

// export const getProductMainCategory = createAsyncThunk(`product/maincategory`, async ({ _id }) => {
// 	// const response = await axios.get(`/advertisements/${_id}`);
// 	// const data = await response.data.result;
// 	// return data;
// });

// export const saveProductMainCategory = createAsyncThunk(`product/maincategory`, async form => {
// 	const formData = new FormData()
// 	formData.append('categoryImages', form.categoryImages);
// 	formData.append('categoryTitle', form.categoryTitle);
// 	formData.append('categoryType', '0');
// 	formData.append('language', form.language);
// 	const result = await axios.post('/categoryModule.php', formData)
// 	console.log(result.data)
// 	return result.data

// 	// const { _id } = advertisement;
// 	// if (_id) {
// 	// 	const response = await axios.put(`/advertisements/${_id}`, advertisement);
// 	// 	const data = await response.data.result;
// 	// 	return data;
// 	// }
// });

// const productMainCategorySlice = createSlice({
// 	name: 'product/maincategory',
// 	initialState: null,
// 	reducers: {
// 		newMainCategory: {
// 			reducer: (state, action) => action.payload,
// 			prepare: event => ({
// 				payload: {
// 					categoryTitle: '',
// 					categoryImages: null,
// 					language:'',
// 				}
// 			})
// 		}
// 	},
// 	extraReducers: {
// 		[getProductMainCategory.fulfilled]: (state, action) => action.payload,
// 		[saveProductMainCategory.fulfilled]: (state, action) => action.payload
// 	}
// });

// export const { newMainCategory } = productMainCategorySlice.actions;

// export default productMainCategorySlice.reducer;
