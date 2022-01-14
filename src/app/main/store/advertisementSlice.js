import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../global/axios';

export const getAdvertisement = createAsyncThunk(`advertisements/:_id`, async ({ _id }) => {
	const response = await axios.get(`/advertisements/${_id}`);
	const data = await response.data.result;
	return data;
});

export const saveAdvertisement = createAsyncThunk(`advertisements/:_id`, async advertisement => {
	const { _id } = advertisement;
	if (_id) {
		const response = await axios.put(`/advertisements/${_id}`, advertisement);
		const data = await response.data.result;
		return data;
	}
	const response = await axios.post('/advertisements', advertisement);
	const data = await response.data.result;
	return data;
});

const advertisementSlice = createSlice({
	name: 'main/advertisement',
	initialState: null,
	reducers: {
		newAdvertisement: {
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
		[getAdvertisement.fulfilled]: (state, action) => action.payload,
		[saveAdvertisement.fulfilled]: (state, action) => action.payload
	}
});

export const { newAdvertisement } = advertisementSlice.actions;

export default advertisementSlice.reducer;
