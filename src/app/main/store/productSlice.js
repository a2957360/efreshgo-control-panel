import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import axios from '../../../global/axios';

export const getProduct = createAsyncThunk(`products/admin/:id`, async ({ id }) => {
	// const response = await axios.get(`/products/admin/${_id}`);
	// const data = await response.data.result.product;
	// return data;
});

export const saveProduct = createAsyncThunk(`products/:_id`, async product => {
	// const { _id } = product;
	// if (_id) {
	// 	const response = await axios.put(`/products/${_id}`, product);
	// 	const data = await response.data.result;
	// 	return data;
	// }
	// const response = await axios.post('/products', product);
	// const data = await response.data.result;
	// return data;
});

const productSlice = createSlice({
	name: 'main/product',
	initialState: null,
	reducers: {
		newProduct: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					itemTitle: '',
					itemSubTitle:'',
					itemDescription:'',
					itemUnit:'',
					itemPrice:0,
					itemSalesPrice:0,
					taxable: true,
					itemCategory:'', //二级分类categoryNumber
					itemParentCategory:'', //一级分类categoryNumber
					itemTag: [],
					itemImages:[],

					// description: '',
					// details:'',
					// fullPrice: 0,
					// salePrice: 0,
					// limitedPrice: 0,
					// selectedPrice: 0,
					// stock: 0,
					// unit: '',
					// images: [],
					// mainCategory:'',
					// subCategory:'',
					// tags:[]
					// featuredImage: [],
					// isDeleted: false,
					// details: '',
					// tags: []
				}
			})
		}
	},
	extraReducers: {
		[getProduct.fulfilled]: (state, action) => action.payload,
		[saveProduct.fulfilled]: (state, action) => action.payload
	}
});

export const { newProduct } = productSlice.actions;

export default productSlice.reducer;
