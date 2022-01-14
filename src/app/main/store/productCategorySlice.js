import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import axios from '../../../global/axios';

export const getProductCategory = createAsyncThunk(`category/getCategory`, async categoryNumber => {
	const result = await axios.post(`/categoryModule.php`, {
		"isGet":"1",
		"categoryType":"0",
		"language":"Zh"
	});
	return result.data;
});

export const saveProductCategory = createAsyncThunk(`category/saveCategory`, async productCategory => {
	// const { categoryNumber } = productCategory
	// if( categoryNumber ){
	// 	const result = await axios.post('/categoryModule.php', productCategory)
	// 	return result.data
	// }
	// const result = await axios.post('/categoryModule.php', productCategory)
	// return result.data
});

const productCategorySlice = createSlice({
	name: 'main/productCategory',
	initialState: null,
	reducers: {
		newProductCategory: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					categoryTitle: '',
					categoryType:'',
					categoryIcon: [],
					language:''
				}
			})
		}
	},
	extraReducers: {
		[getProductCategory.fulfilled]: (state, action) => action.payload,
		[saveProductCategory.fulfilled]: (state, action) => action.payload
	}
});

export const { newProductCategory } = productCategorySlice.actions;

export default productCategorySlice.reducer;
