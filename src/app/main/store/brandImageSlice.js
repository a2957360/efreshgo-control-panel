import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../global/axios';

export const getBrandImage = createAsyncThunk(`brandImages/:_id`, async ({ _id }) => {
	const response = await axios.get(`/brandImages/${_id}`);
	const data = await response.data.result;
	return data;
});

export const saveBrandImage = createAsyncThunk(`brandImages/:_id`, async advertisement => {
	const { _id } = advertisement;
	if (_id) {
		const response = await axios.put(`/brandImages/${_id}`, advertisement);
		const data = await response.data.result;
		return data;
	}
	const response = await axios.post('/brandImages', advertisement);
	const data = await response.data.result;
	return data;
});

const advertisementSlice = createSlice({
	name: 'main/advertisement',
	initialState: null,
	reducers: {
		newBrandImage: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					name: '',
					link: '',
					images: []
				}
			})
		}
	},
	extraReducers: {
		[getBrandImage.fulfilled]: (state, action) => action.payload,
		[saveBrandImage.fulfilled]: (state, action) => action.payload
	}
});

export const { newBrandImage } = advertisementSlice.actions;

export default advertisementSlice.reducer;
