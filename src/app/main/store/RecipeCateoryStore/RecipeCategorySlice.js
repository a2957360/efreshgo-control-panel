// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from '../../../../global/axios';
// const fs = require('fs')

// export const getRecipeCategory = createAsyncThunk(`recipe/category`, async ({ _id }) => {
// 	// const response = await axios.get(`/advertisements/${_id}`);
// 	// const data = await response.data.result;
// 	// return data;
// });

// export const saveRecipeCategory = createAsyncThunk(`recipe/category`, async form => {
// 	const formData = new FormData()
// 	formData.append('categoryImages', form.categoryImages);
// 	formData.append('categoryTitle', form.categoryTitle);
// 	formData.append('categoryType', '1');
// 	formData.append('language', form.language);
// 	const result = await axios.post('/categoryModule.php', formData)
// 	return result.data
// });

// const recipeCategorySlice = createSlice({
// 	name: 'recipe/category',
// 	initialState: null,
// 	reducers: {
// 		newRecipeCategory: {
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
// 		[getRecipeCategory.fulfilled]: (state, action) => action.payload,
// 		[saveRecipeCategory.fulfilled]: (state, action) => action.payload
// 	}
// });

// export const { newRecipeCategory } = recipeCategorySlice.actions;

// export default recipeCategorySlice.reducer;
