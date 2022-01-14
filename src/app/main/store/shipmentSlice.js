import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../global/axios';

export const getShipment = createAsyncThunk(`shipments/:_id`, async ({ _id }) => {
	const response = await axios.get(`/shipments/${_id}`);
	const data = await response.data.result;
	return data;
});

export const saveShipment = createAsyncThunk(`shipments/:_id`, async shipment => {
	const { _id } = shipment;
	if (_id) {
		const response = await axios.put(`/shipments/${_id}`, shipment);
		const data = await response.data.result;
		return data;
	}
	const response = await axios.post('/shipments', shipment);
	const data = await response.data.result;
	return data;
});

const shipmentSlice = createSlice({
	name: 'main/shipment',
	initialState: null,
	reducers: {
		newShipment: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					name: '',
					requirement: 30,
					date: [],
					time: [],
					isDeleted: false,
					isInZone: false
				}
			})
		}
	},
	extraReducers: {
		[getShipment.fulfilled]: (state, action) => action.payload,
		[saveShipment.fulfilled]: (state, action) => action.payload
	}
});

export const { newShipment } = shipmentSlice.actions;

export default shipmentSlice.reducer;
