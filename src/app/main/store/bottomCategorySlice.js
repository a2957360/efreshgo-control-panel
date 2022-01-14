import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import axios from '../../../global/axios';

export const getBottomCategory = createAsyncThunk(`bottomCategories/:_id`, async ({ _id }) => {
	const response = await axios.get(`/bottomCategories/${_id}`);
	const data = await response.data.result;
	return data;
});

export const saveBottomCategory = createAsyncThunk(`bottomCategories/:_id`, async bottomCategory => {
	const { _id } = bottomCategory;
	if (_id) {
		const response = await axios.put(`/bottomCategories/${_id}`, bottomCategory);
		const data = await response.data.result;
		return data;
	}
	const response = await axios.post('/bottomCategories', bottomCategory);
	const data = await response.data.result;
	return data;
});

const bottomCategorySlice = createSlice({
	name: 'main/bottomCategory',
	initialState: null,
	reducers: {
		newBottomCategory: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					name: '',
					products: [],
					isActive: true
				}
			})
		}
	},
	extraReducers: {
		[getBottomCategory.fulfilled]: (state, action) => action.payload,
		[saveBottomCategory.fulfilled]: (state, action) => action.payload
	}
});

export const { newBottomCategory } = bottomCategorySlice.actions;

export default bottomCategorySlice.reducer;
