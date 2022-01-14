// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from '../../../../global/axios';

// export const getProductSubCategory = createAsyncThunk(`product/subcategory/:id`, async ({ id }) => {
// 	// const response = await axios.get(`/advertisements/${_id}`);
// 	// const data = await response.data.result;
// 	// return data;
// });

// export const saveProductSubCategory = createAsyncThunk(`product/subcategory/:id`, async form => {
// 	const formData = new FormData()
// 	formData.append('categoryImages', form.categoryImages);
// 	formData.append('categoryTitle', form.categoryTitle);
// 	formData.append('categoryType', '0');
// 	formData.append('categoryParentId', form.categoryParentId)
// 	formData.append('language', form.language);
// 	const result = await axios.post('/categoryModule.php', formData)
// 	return result.data
// });

// const productSubCategorySlice = createSlice({
// 	name: 'product/subcategory',
// 	initialState: null,
// 	reducers: {
// 		newSubCategory: {
// 			reducer: (state, action) => action.payload,
// 			prepare: event => ({
// 				payload: {
// 					categoryTitle: '',
//                     categoryImages: null,
//                     categoryParentId:'', //parent category number
// 					language:'',
// 				}
// 			})
// 		}
// 	},
// 	extraReducers: {
// 		[getProductSubCategory.fulfilled]: (state, action) => action.payload,
// 		[saveProductSubCategory.fulfilled]: (state, action) => action.payload
// 	}
// });

// export const { newSubCategory } = productSubCategorySlice.actions;

// export default productSubCategorySlice.reducer;
