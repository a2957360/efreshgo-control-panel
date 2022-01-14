import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../global/axios';

export const getOrder = createAsyncThunk(`orders/:_id`, async ({ _id }) => {
	const response = await axios.get(`/orders/${_id}`);
	const data = await response.data.result;
	return data;
});

export const saveOrder = createAsyncThunk(`orders/:_id`, async advertisement => {
	const { _id } = advertisement;
	if (_id) {
		const response = await axios.put(`/orders/${_id}`, advertisement);
		const data = await response.data.result;
		return data;
	}
	const response = await axios.post('/orders', advertisement);
	const data = await response.data.result;
	return data;
});

const advertisementSlice = createSlice({
	name: 'main/advertisement',
	initialState: null,
	reducers: {
		newOrder: {
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
		[getOrder.fulfilled]: (state, action) => action.payload,
		[saveOrder.fulfilled]: (state, action) => action.payload
	}
});

export const { newOrder } = advertisementSlice.actions;

export default advertisementSlice.reducer;
